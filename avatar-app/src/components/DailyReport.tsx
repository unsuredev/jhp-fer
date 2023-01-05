import React, { useState, useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { BASE_URL } from "../config/constant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  TableHead,
  TableRow,
  Grid,
  TableBody,
  TableCell,
  IconButton,
  Button,
  Link,
  Table,
  Typography,
} from "@mui/material";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { useTheme } from "@material-ui/core/styles";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DataGrid from "components/table/DataGrid";
import { getToken } from "app/services/UtilServices";

const DailyReport = () => {
  const [users, setUsers] = useState<any[]>([]);
  let [userlist, setUserlist] = useState<any>([]);
  let [mydevices, setMydevices] = useState<any[]>([]);
  const [firstDate, setFirstDate] = React.useState(
    new Date(moment().startOf("month").format("YYYY-MM-DD"))
  );
  const [lastDate, setLastDate] = React.useState(
    new Date(moment().endOf("day").format("YYYY-MM-DD"))
  );

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(1);
  const [newReg, setNewReg] = React.useState(false);
  const [old, setOld] = React.useState(false);

  const [agentName, setAgentName] = React.useState({
    name: "",
  });

  const handleChange = (event: any) => {
    setAgentName({ ...agentName, [event.target.name]: event.target.value });
    //@ts-ignore
  };

  const theme = useTheme();

  const handleClickOpen = (index: any) => {
    setOpen(true);
    for (let i = 0; i < userlist.length; i++) {
      if (i == index) {
        mydevices = userlist[i].devices;
        break;
      }
    }
    setMydevices(mydevices);
    return mydevices;
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const startDateChange = (date: any) => {
    const format = "YYYY-MM-DD";
    let startday: any = moment(date).format(format);
    setFirstDate(startday);
  };
  const endDateChange = (date2: any) => {
    const format = "YYYY-MM-DD";
    let endday: any = moment(date2).format(format);
    setLastDate(endday);
  };

  const fetchUsers = async () => {
    try {
      setNewReg(true);
      setLoading(true);
      const result = await axios.post(
        BASE_URL + "customer/getCustomerStats",
        {
          start_date: firstDate,
          end_date: lastDate,
        },
        {
          headers: {
            encryption: false,
            access_token: getToken(),
          },
        }
      );
      if (result && result.data) {
        console.log("users", result.data.data);
        setUsers(result.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLastUpdateConsumer = async () => {
    try {
      setNewReg(false);
      setLoading(true);
      const result = await axios.post(
        BASE_URL + "customer/lastupdatedRecords",
        {
          start_date: firstDate,
          end_date: lastDate,
        },
        {
          headers: {
            encryption: false,
            access_token: getToken(),
          },
        }
      );
      if (result && result.data != null) {
        setUsers(result.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const usersByDate = (index: any) => {
    setLoading(true);
    for (let i = 0; i < users.length; i++) {
      if (i == index) {
        userlist = users[i].customers;
        break;
      }
    }
    setUserlist(userlist);
    console.log("users data", userlist);
    setLoading(false);
    return userlist;
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { headerName: "Name", field: "name", flex: 1 },
      { headerName: "Main Aadhaar", field: "mainAadhaar", flex: 1 },
      { headerName: "Family Aadhaar", field: "familyAadhaar", flex: 1 },
      { headerName: "Mobile", field: "mobile", flex: 1 },
      // { headerName: "File No", field: "regNo", flex: 1 },
      { headerName: "Consumer No", field: "consumerNo", flex: 1 },
      { headerName: "Main Agent", field: "mainAgent", flex: 1 },
      {
        headerName: "Registerd Agency Name",
        field: "registeredAgencyName",
        flex: 1,
      },
      { headerName: "Remarks", field: "remarks", flex: 1 },
      { headerName: "Added By", field: "addedBy", flex: 1 },
      // { headerName: "Updated By", field: "updatedBy", flex: 1 },
      { headerName: "Installation Status", field: "installtatus", flex: 1 },
    ],
    []
  );

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent="center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item>
              <KeyboardDatePicker
                disableToolbar
                minDate={new Date("2021-03-12")}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Start date"
                value={firstDate}
                onChange={startDateChange}
                maxDate={new Date()}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                minDate={firstDate}
                margin="normal"
                id="date-picker-dialog"
                label="End date"
                format="dd/MM/yyyy"
                value={lastDate}
                onChange={endDateChange}
                maxDate={new Date()}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              {/* <Button variant="contained" color="primary" onClick={fetchLastUpdateConsumer} >
                                FIND by DATE
                            </Button> */}
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Box>
      <Grid container spacing={3} justifyContent="center" mt={2}>
        <Button variant="contained" color="primary" onClick={fetchUsers}>
          NEW REGISTRATION RECORD
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={fetchLastUpdateConsumer}
        >
          LAST UPDATED RECORD
        </Button>
      </Grid>
      <Box maxWidth="md" style={{ marginTop: "50px" }}>
        {newReg ? (
          <Typography color="primary">New Registration Consumer : </Typography>
        ) : (
          <Typography color="textSecondary">Last Updated Consumer :</Typography>
        )}

        <Grid container>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Sl No.</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>No of Consumer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 
// @ts-ignore */}
              {users.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{row.join_date}</TableCell>
                  <TableCell>{row.customers.length}</TableCell>
                  <TableCell>
                    <Link color="primary" onClick={() => usersByDate(i)}>
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Box>
      {loading ? (
        <div
          style={{
            paddingTop: "30px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <p>This may take few secs...</p> <TripOriginIcon />{" "}
        </div>
      ) : (
        <Box
          style={{
            margin: "auto",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginTop: "5rem",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            {userlist.length > 0 && (
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <DataGrid columns={columns} rows={userlist} />
                </Grid>
              </Grid>
            )}
          </div>
        </Box>
      )}
    </React.Fragment>
  );
};
export default DailyReport;

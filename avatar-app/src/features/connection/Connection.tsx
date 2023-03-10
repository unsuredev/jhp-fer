import React from "react";
import { BASE_URL } from "../../config/constant";
import axios from "axios";

import {
  List,
  ListItem,
  CardMedia,
  Grid,
  Container,
  Card,
  CardActions,
  CardContent,
  MenuItem,
  InputLabel,
  Select,
  Divider,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  Dialog,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import DataGrid from "components/table/DataGrid";
import { getToken } from "app/services/UtilServices";

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from "@mui/icons-material/Create";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getUserName, getRole } from "utils/UtilService";
import { toast } from "react-hot-toast";



interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Connection = () => {
  const [show, setShow] = React.useState(false);
  const [agentList, setAgetList] = React.useState([]);
  const [sms, setSms] = React.useState({
    agent: "",
    load: 0,
    regulator: 0,
    pipe: 0,
    light: 0,
    bplOven: 0,
    nonHpOven: 0,
    hpOven: 0,
    installationPending: 0,
    paidAmount: 0,
    dueAmount: 0,
  });

  const [customer, setCustomer] = React.useState({
    agent: "",
  });
  const [open, setOpen] = React.useState(false);
  const [agent, setAgent] = React.useState({
    agent: "",
    totalConnection: 0,
    load: 0,
    regulator: 0,
    pipe: 0,
    totalLight: 0,
    paidLight: 0,
    bplOven: 0,
    nonHpOven: 0,
    hpOven: 0,
    paidAmount: 0,
    remarks: " ",
    installationComplete: 0,
    agent_mobile: "",
    agent_photo: ""
  });

  const [connection, setConnection] = React.useState({
    agent: "",
    totalConnection: 0,
    load: 0,
    regulator: 0,
    pipe: 0,
    totalLight: 0,
    paidLight: 0,
    bplOven: 0,
    nonHpOven: 0,
    hpOven: 0,
    paidAmount: 0,
    remarks: " ",
  });

  const [pricing, setPricing] = React.useState({});
  const [openPrice, setOpenPrice] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingTable, setLoadingTable] = React.useState(false);

  const handleClickOpen = () => {
    setOpenPrice(true);
  };

  const handleClose = () => {
    setOpenPrice(false);
  };

  const handleChangePricing = (event: any) => {
    setPricing({ ...pricing, [event.target.name]: event.target.value });
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const updatePricing = async (event: any) => {
    try {
      const result = await axios.post(
        BASE_URL + "pricing/update",
        { data: pricing },
        {
          headers: {
            encryption: false,
            access_token: getToken(),
          },
        }
      );
      if (result.data.data && result.data != undefined) {
        //@ts-ignore
        toast.success(result.data.message);
        setOpenPrice(false);
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        toast.error(error.response.data.message);
      }
    }
  };

  const handleChange = (event: any) => {
    setConnection({ ...connection, [event.target.name]: event.target.value });
  };

  const handleChangeSMS = (event: any) => {
    setSms({ ...sms, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    setOpen(false);
    try {
      const result = await axios.post(
        BASE_URL + "agent/connection/update",
        {
          agent: customer.agent,
          totalConnection: connection.totalConnection,
          load: connection.load,
          regulator: connection.regulator,
          pipe: connection.pipe,
          totalLight: connection.totalLight,
          paidLight: connection.paidLight,
          bplOven: connection.bplOven,
          nonHpOven: connection.nonHpOven,
          hpOven: connection.hpOven,
          paidAmount: connection.paidAmount,
          remarks: connection.remarks,
          updatedBy: getUserName(),
        },
        {
          headers: {
            encryption: false,
            access_token: getToken(),
          },
        }
      );
      if (result.data.data && result.data != undefined) {
        //@ts-ignore
        toast.success(result.data.message, "success");
        setOpen(false);
        setConnection({
          agent: "",
          totalConnection: 0,
          load: 0,
          regulator: 0,
          pipe: 0,
          totalLight: 0,
          paidLight: 0,
          bplOven: 0,
          nonHpOven: 0,
          hpOven: 0,
          paidAmount: 0,
          remarks: " ",
        });
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        toast.error(error.response.data.message);
      }
    }
  };



  React.useEffect(() => {
    getCharacters();
    getPricing();
  }, []);



  const getPricing = async () => {
    try {
      const result = await axios.get(BASE_URL + "pricing/get", {
        headers: {
          encryption: false,
          access_token: getToken(),
        },
      });
      if (result && result.data) {
        setPricing(result.data.data[0]);
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        toast.error(error.response.data.message);
      }
    }
  };

  const FindOwnConnection = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "agent/connection/get",
        {
          agent: getUserName(),
        },
        {
          headers: {
            encryption: false,
            access_token: getToken(),
          },
        }
      );
      if (result && result.data) {
        setAgent(result.data.data);
        setShow(true);
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        toast.error(error.response.data.message);
      }
    }
  };

  const handleFind = async () => {
    try {
      if (getRole() === "user") {
        FindOwnConnection();
      } else {
        const result = await axios.post(
          BASE_URL + "agent/connection/get",
          {
            agent: customer.agent,
          },
          {
            headers: {
              encryption: false,
              access_token: getToken(),
            },
          }
        );
        if (result && result.data) {
          setAgent(result.data.data);
          setShow(true);
        }
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        // showToast(error.response.data.message, "error");
      }
    }
  };

  const handleChangeAgent = (event: any) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    setConnection({ ...connection, [event.target.name]: event.target.value });
    setSms({ ...sms, [event.target.name]: event.target.value });
  };

  async function getCharacters() {
    const result = await axios.get(BASE_URL + "agent/getall/active", {
      headers: {
        encryption: false,
        access_token: getToken(),
      },
    });
    //@ts-ignore
    setAgetList(result.data.data.agents);
    //@ts-ignore
    setAgetList(
      //@ts-ignore
      result.data.data.agents.map(({ name }) => ({ label: name, value: name }))
    );
  }

  //sales hitory data
  const fetchSalesData = async () => {
    try {
      setLoadingTable(true);
      setLoading(true);
      if (getRole() === "user") {
        fetchOwnSalesData();
      } else {
        const result = await axios.post(
          BASE_URL + "agent/slaes/getall",
          { agent: customer.agent },
          {
            headers: {
              encryption: false,
              access_token: getToken(),
            },
          }
        );
        if (result.data) {
          setData(result.data.data);
          setLoading(false);
          setLoadingTable(true);
        }
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        toast.error(error.response.data.message);
      }
    }
  };

  //find own nc delivery data
  const fetchOwnSalesData = async () => {
    try {
      setLoadingTable(true);
      setLoading(true);
      const result = await axios.post(
        BASE_URL + "agent/slaes/getall",
        { agent: getUserName() },
        {
          headers: {
            encryption: false,
            access_token: getToken(),
          },
        }
      );
      if (result.data) {
        setData(result.data.data);
        setLoading(false);
        setLoadingTable(true);
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        toast.error(error.response.data.message);
      }
    }
  };

  //send SMS to agent
  const sendSms = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "agent/sendsms",
        {
          sms,
        },
        {
          headers: {
            encryption: false,
            access_token: getToken(),
          },
        }
      );
      if (result.data) {
        toast.success(result.data.message);
      }
    } catch (error) {
      if (error) {
        //@ts-ignore
        toast.error(error.response.data.message);
      }
    }
  };

  const columns = [
    { headerName: 'AGENT', field: 'agent' },
    { headerName: "TOTAL CONNECTION ", field: "totalConnection", type: 'numeric' },
    { headerName: "LOAD PAID", field: "load", type: 'numeric' },
    { headerName: "REGULATOR PAID", field: "regulator" },
    { headerName: "PIPE PAID", field: "pipe" },
    { headerName: "LIGHT PAID", field: "paidLight" },
    { headerName: "BPL OVEN", field: "bplOven" },
    { headerName: "NON HP OVEN", field: "nonHpOven" },
    { headerName: "HP OVEN", field: "hpOven" },
    { headerName: "OVEN DUE", field: "bplOven" },
    { headerName: "PAID AMOUNT ", field: "paidAmount" },
    { headerName: "REMARKS ", field: "remarks" },
    {
      headerName: "DATE ", field: "updatedAt", type: "date",
      dateSetting: { locale: "ko-KR" }
    }
  ]

  return (
    <React.Fragment>
      <Container
        style={{
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <FormControl variant="outlined" >
            <InputLabel id="demo-simple-select-required-label">
              Agent Name *
            </InputLabel>
            {getRole() != "user" ? (
              <Select
                sx={{ m: 1, width: 270 }}
                displayEmpty
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                inputProps={{ "aria-label": "Without label" }}
                name="agent"
                onChange={handleChangeAgent}
                input={<OutlinedInput label="Name" />}
              >
                {agentList.map((item: any) => (
                  <MenuItem
                    style={{ width: "50px" }}
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </MenuItem>

                ))}
              </Select>
            ) : (
              <Typography variant="button" display="block" gutterBottom>
                {" "}
                <span style={{ color: "blue", fontSize: "20px" }}>
                  {getUserName()}
                </span>
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item style={{ marginTop: "1rem" }}>
          <Button
            variant="contained"
            component="label"
            color="primary"
            onClick={handleFind}
          >
            FETCH & UPDATE
          </Button>
          <Button
            variant="contained"
            component="label"
            color="warning"
            onClick={fetchSalesData}
          >
            VIEW HISTORY
          </Button>
        </Grid>
        {show ? (
          <Grid container spacing={3} style={{ marginTop: "2rem", justifyContent: "center", alignItems: "center" }}>
            <Grid item xs={12} md={4} sm={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  // avatar={
                  //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  //     R
                  //   </Avatar>
                  // }
                  action={
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  }

                  title={agent.agent}
                  subheader={agent.agent_mobile}
                />
                <CardMedia
                  component="img"
                  height="194"
                  // image={agent.agent_photo}
                  alt="Paella dish"
                  image={agent.agent_photo || "https://source.unsplash.com/random"}

                />
                <CardContent style={{ textAlign: "left" }}>
                  <Typography variant="button" display="block" gutterBottom>
                    TOTAL CONNECTION:{" "}
                    <span style={{ color: "blue", fontSize: "20px" }}>
                      {agent.totalConnection}
                    </span>
                  </Typography>
                  <Divider />

                  <Typography variant="button" display="block" gutterBottom>
                    LOAD PAID:{" "}
                    <span style={{ color: "blue", fontSize: "20px" }}>
                      {agent.load}
                    </span>
                  </Typography>
                  <Divider />

                  <Typography variant="button" display="block" gutterBottom>
                    INSTALLATION  COMPLETE:{" "}
                    <span style={{ color: "#e91e63", fontSize: "20px" }}>
                      {agent.installationComplete}
                    </span>
                  </Typography>
                  <Divider />

                  <Typography variant="button" display="block" gutterBottom>
                    PENDING INSTALLATION:{" "}
                    <span style={{ color: "blue", fontSize: "20px" }}>
                      {agent.load - agent.installationComplete}
                    </span>
                  </Typography>
                  <Divider />

                  <Typography variant="button" display="block" gutterBottom>
                    CONNECTION DUE:{" "}
                    <span style={{ color: "blue", fontSize: "20px" }}>
                      {agent.totalConnection - agent.load}
                    </span>
                  </Typography>
                  <Divider />

                  <Typography variant="button" display="block" gutterBottom>
                    REGULATOR PAID:{" "}
                    <span style={{ color: "blue", fontSize: "20px" }}>
                      {" "}
                      {agent.regulator}
                    </span>
                  </Typography>
                  <Divider />

                  <Typography variant="button" display="block" gutterBottom>
                    REGULATOR DUE:
                    <span style={{ color: "blue", fontSize: "20px" }}>
                      {agent.load - agent.regulator}
                    </span>
                  </Typography>
                  <Divider />

                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography variant="button" display="block" gutterBottom>
                      <span
                        style={{
                          color: "#e91e63",
                          fontSize: "20px",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {agent.agent}
                      </span>
                    </Typography>
                    <Divider />

                    <div style={{ textAlign: "left" }}>
                      <Typography variant="button" display="block" gutterBottom>
                        TOTAL CONNECTION:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.totalConnection}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        LOAD PAID:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.load}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        INSTALLATION  COMPLETE:{" "}
                        <span style={{ color: "#e91e63", fontSize: "20px" }}>
                          {agent.installationComplete}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        PENDING INSTALLATION:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.load - agent.installationComplete}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        CONNECTION DUE:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.totalConnection - agent.load}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        REGULATOR PAID:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {" "}
                          {agent.regulator}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        REGULATOR DUE:
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.load - agent.regulator}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        PIPE PAID:
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {" "}
                          {agent.pipe}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        PIPE DUE:
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {" "}
                          {agent.load - agent.pipe}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        LIGHT PAID:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.paidLight}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        LIGHT DUE:
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {" "}
                          {agent.hpOven + agent.nonHpOven - agent.paidLight}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        BPL OVEN:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.bplOven}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        NON HP OVEN:
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.nonHpOven}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        HP OVEN:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.hpOven}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        OVEN DUE:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {agent.load -
                            agent.hpOven -
                            agent.nonHpOven -
                            agent.bplOven}
                        </span>
                      </Typography>
                      <Divider />

                      {/* @ts-ignore */}
                      <Typography variant="button" display="block" gutterBottom>
                        TOTAL AMOUNT :{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {/* @ts-ignore */}

                          {agent.nonHpOven * pricing.nonHpOvenPricing + agent.hpOven * pricing.hpOvenPricing}
                        </span>
                      </Typography>
                      <Divider />

                      {/* @ts-ignore */}
                      <Typography variant="button" display="block" gutterBottom>
                        AMOUNT PAID :{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {" "}
                          {agent.paidAmount}
                        </span>
                      </Typography>
                      <Divider />

                      {/* @ts-ignore */}
                      <Typography variant="button" display="block" gutterBottom>
                        AMOUNT DUE:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {/* @ts-ignore */}

                          {agent.nonHpOven * pricing.nonHpOvenPricing + agent.hpOven * pricing.hpOvenPricing - agent.paidAmount}
                        </span>
                      </Typography>
                      <Divider />

                      <Typography variant="button" display="block" gutterBottom>
                        REMARKS:{" "}
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {" "}
                          {agent.remarks}{" "}
                        </span>
                      </Typography>
                    </div>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>

            {getRole() === "admin" || getRole() === "superadmin" ? (
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom>
                      Send SMS Update to{" "}
                      <span style={{ color: "#e91e63" }}>
                        {agent.agent}
                      </span>
                    </Typography>
                    <Grid container spacing={1} >
                      <Grid item xs={6}>
                        <div style={{ margin: "2px" }}>
                          <TextField
                            label="Load"
                            id="standard-size-small"
                            size="small"
                            value={sms.load}
                            onChange={handleChangeSMS}
                            name="load"
                            type="Number"
                          />
                          <TextField
                            label="Regulator"
                            id="standard-size-normal"
                            size="small"
                            value={sms.regulator}
                            onChange={handleChangeSMS}
                            name="regulator"
                            type="Number"
                          />
                          <TextField
                            label="HP Oven"
                            id="standard-size-small"
                            size="small"
                            value={sms.hpOven}
                            onChange={handleChangeSMS}
                            name="hpOven"
                            type="Number"
                          />
                          <TextField
                            label="BPL Oven"
                            id="standard-size-normal"
                            size="small"
                            value={sms.bplOven}
                            onChange={handleChangeSMS}
                            name="bplOven"
                            type="Number"
                          />

                          <TextField
                            label="Amount Paid"
                            id="standard-size-normal"
                            size="small"
                            value={sms.paidAmount}
                            onChange={handleChangeSMS}
                            name="paidAmount"
                            type="Number"
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Pipe"
                          id="standard-size-normal"
                          size="small"
                          value={sms.pipe}
                          onChange={handleChangeSMS}
                          name="pipe"
                          type="Number"
                        />
                        <TextField
                          label="Non HP Oven"
                          id="standard-size-small"
                          size="small"
                          value={sms.nonHpOven}
                          onChange={handleChangeSMS}
                          name="nonHpOven"
                          type="Number"
                        />
                        <TextField
                          label="Light"
                          id="standard-size-normal"
                          size="small"
                          value={sms.light}
                          onChange={handleChangeSMS}
                          name="light"
                          type="Number"
                        />
                        <TextField
                          label="Installation Pending"
                          id="standard-size-normal"
                          size="small"
                          value={sms.installationPending}
                          onChange={handleChangeSMS}
                          name="installationPending"
                          type="Number"
                        />
                        <TextField
                          label="Total Amount Due"
                          id="standard-size-normal"
                          size="small"
                          value={sms.dueAmount}
                          onChange={handleChangeSMS}
                          name="dueAmount"
                          type="Number"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    size="large"
                    onClick={sendSms}
                  >
                    SEND SMS
                  </Button>
                </Card>
              </Grid>
            ) : null}
            {getRole() === "superadmin" && (
              <Grid item xs={12} md={4}>
                <Card
                  style={{
                    backgroundColor: "#009688",
                    color: "white",
                    height: "11rem",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom>Today's Pricing Table</Typography>
                    <Typography variant="h6" component="h2">
                      {/* @ts-ignore */}
                      HP Oven Price : <b>{pricing.hpOvenPricing} &#x20B9;</b>
                    </Typography>
                    <Typography variant="h6" component="h2">
                      {/* @ts-ignore */}
                      Non HP Oven Price :<b>{pricing.nonHpOvenPricing} &#x20B9;</b>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => setOpenPrice(true)}>
                      <CreateIcon fontSize="small" style={{ color: "white" }} />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </Grid>
        ) : null}
        <div>
          <Dialog
            open={openPrice}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              Update Oven Pricing :
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="hpOvenPricing"
                label="HP Oven"
                type="number"
                //@ts-ignore
                value={pricing.hpOvenPricing}
                name="hpOvenPricing"
                variant="outlined"
                onChange={handleChangePricing}
              />
              <TextField
                autoFocus
                margin="dense"
                id="nonHpOvenPricing"
                label="Non HP Oven"
                type="number"
                //@ts-ignore
                value={pricing.nonHpOvenPricing}
                name="nonHpOvenPricing"
                variant="outlined"
                onChange={handleChangePricing}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={updatePricing} color="primary">
                update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>

      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle
            id="form-dialog-title"
            style={{ backgroundColor: "#009688", color: "#FFF" }}
          >
            {" "}
            Update Connection :{" "}
            <span style={{ color: "yellow" }}> {agent.agent}</span>{" "}
          </DialogTitle>

          <DialogContent>
            <DialogContentText
              style={{ backgroundColor: "#009688", color: "white" }}
            >
              <div>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={6}
                    style={{ backgroundColor: "#009688", color: "white" }}
                  >
                    <List>
                      <ListItem>
                        Total Connection: {agent.totalConnection}
                      </ListItem>
                      <Divider />
                      <ListItem>Load :{agent.load}</ListItem>
                      <Divider />
                      <ListItem>Regulator :{agent.regulator}</ListItem>
                      <Divider />
                      <ListItem>Pipe :{agent.pipe}</ListItem>
                      <Divider />
                      <ListItem>Light Paid :{agent.paidLight}</ListItem>
                      <Divider />
                    </List>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ backgroundColor: "#009688", color: "white" }}
                  >
                    <List>
                      <Divider />
                      <ListItem>Light Paid :{agent.paidLight}</ListItem>
                      <Divider />
                      <ListItem>Non HP Oven :{agent.nonHpOven}</ListItem>
                      <Divider />
                      <ListItem>HP Oven :{agent.hpOven}</ListItem>
                      <Divider />
                      <ListItem>Total Amount Paid :{agent.paidAmount}</ListItem>
                      <Divider />
                      <ListItem>Remarks :{agent.remarks}</ListItem>
                      <Divider />
                    </List>
                  </Grid>
                </Grid>
              </div>
            </DialogContentText>
            <Typography style={{ textAlign: "left", margin: "5px" }}>
              Todays Delivery Update:
            </Typography>

            <div style={{ marginLeft: "3rem" }}>
              {/* <TextField
                                autoFocus
                                margin="dense"
                                label="Total Connection"
                                type="Number"
                                value={connection.totalConnection}
                                name="totalConnection"
                                variant="outlined"
                                onChange={handleChange}
                                style={{ color: "white" }}
                            
                            /> */}
              <TextField
                autoFocus
                margin="dense"
                id="Load"
                label="Load "
                type="Number"
                value={connection.load}
                name="load"
                variant="outlined"
                onChange={handleChange}
                size="medium"
              />
              <TextField
                autoFocus
                margin="dense"
                id="regulator"
                value={connection.regulator}
                label="Regulator"
                type="Number"
                variant="outlined"
                onChange={handleChange}
                name="regulator"
              />
              <TextField
                autoFocus
                margin="dense"
                id="pipe"
                label="Pipe "
                type="Number"
                variant="outlined"
                value={connection.pipe}
                onChange={handleChange}
                name="pipe"
              />
              <TextField
                autoFocus
                margin="dense"
                id="paidLight"
                label="Light Paid"
                type="Number"
                value={connection.paidLight}
                variant="outlined"
                onChange={handleChange}
                name="paidLight"
              />
              <TextField
                autoFocus
                margin="dense"
                id="bplOven"
                label="BPL Oven"
                type="Number"
                variant="outlined"
                value={connection.bplOven}
                onChange={handleChange}
                name="bplOven"
              />
              <TextField
                autoFocus
                margin="dense"
                id="nonHpOven"
                label="Non HP Oven"
                type="Number"
                variant="outlined"
                value={connection.nonHpOven}
                onChange={handleChange}
                name="nonHpOven"
              />
              <TextField
                autoFocus
                margin="dense"
                id="hpOven"
                label="HP Oven"
                type="Number"
                variant="outlined"
                value={connection.hpOven}
                onChange={handleChange}
                name="hpOven"
              />
              <TextField
                autoFocus
                margin="dense"
                id="paidAmount"
                label="Total Amount Paid"
                type="Number"
                variant="outlined"
                value={connection.paidAmount}
                onChange={handleChange}
                name="paidAmount"
              />
              <Grid container>
                <Grid item xs={4} sm={6} md={5}>
                  <FormControl >
                    <InputLabel id="demo-simple-select-label">
                      Berner Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleChange}
                      style={{ width: "180px" }}
                    >
                      <MenuItem value="GT 2B">GT 2B</MenuItem>
                      <MenuItem value="GT 3B">GT 3B</MenuItem>
                      <MenuItem value="GT 4B">GT 4B</MenuItem>
                      <MenuItem value="SINGLE B">SINGLE B</MenuItem>
                      <MenuItem value="EXTRA B">EXTRA ARB</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} sm={12} md={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="Quantity"
                    label="Quantity"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                    name="quantity"
                  />
                </Grid>
              </Grid>

              <TextField
                autoFocus
                margin="dense"
                id="rate"
                label="Rate"
                type="text"
                variant="outlined"
                onChange={handleChange}
                size="small"
                name="rate"
              />
              <TextField
                autoFocus
                margin="dense"
                id="remarks"
                label="Remarks"
                type="text"
                variant="outlined"
                value={connection.remarks}
                onChange={handleChange}
                name="remarks"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} variant="contained" color="primary">
              update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        {loadingTable ? (
          <Container component="main">
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
                <p>Please...</p> <CircularProgress />{" "}
              </div>
            ) : (
              <DataGrid columns={columns} rows={data} />
            )}
          </Container>
        ) : null}
      </div>

    </React.Fragment>
  );
};

export default Connection;

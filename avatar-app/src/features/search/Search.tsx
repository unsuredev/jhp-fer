import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField, Container, Typography
} from '@mui/material';
import { BASE_URL } from "config/constant";
import axios from "axios";
import { findUserId, getRole, getToken, getUser, getUserName } from 'utils/UtilService';
import toast from "react-hot-toast";
import moment from "moment";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@mui/material/Tooltip';
import { httpClient } from "../../utils/UtilService";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Search = () => {
    const [users, setUsers] = React.useState<any[]>([]);
    const [today, setDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);
    const [nameuser, setNameuser] = React.useState("")
    const [agentList, setAgetList] = React.useState([]);

    const [userObj, setUserObj] = React.useState({})
    const [openAlert, setOpenAlert] = React.useState(false);
    const CHARACTER_LIMIT = 12;
    const [value, setValue] = React.useState('Not Complete');

    const [state, setState] = React.useState({
        regNo: "",
        mobile: "",
        aadhaar: "",
        consumerNo: "",
        fileNumber: "",
        familyAadhaar: ""

    });

    const handleChangeValue = (event: any) => {
        setValue(event.target.value);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenByAgent = () => {
        setOpen(true);
    };

    const handleCloseByAgent = () => {
        setOpen(false);
    };

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClickOpenAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };
    const handleChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const [checked, setChecked] = React.useState(false);

    const [free, setFree] = React.useState(false)

    const handleChangeFree = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFree(!free);
    };


    const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(!checked);
    };


    const [customer, setCustomer] = React.useState({
        name: "",
        mainAadhaar: "",
        consumerNo: "",
        familyAadhaar: "",
        regNo: "",
        mainAgent: "",
        subAgent: "",
        registeredAgencyName: "",
        remarks: "",
        mobile: "",
        addedBy: "",
        installtatus: "",
        fileNo: 0,
        isSingleWomen: false,
        isFreeDelivery: false,
        registrationStatus: "",
        contactNumber: ""
    });

    const handleChangeAgent = (event: any) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
        //@ts-ignore
    }

    const handleChangeUser = (event: any) => {
        console.log("value", event.target.value)
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };


    const handleFind = async (event: any) => {
        try {
            event.preventDefault();
            if (state.mobile) {
                const result = await httpClient("customer/find", "POST", {
                    findkey: "mobile",
                    mobile: state.mobile,
                });

                if (!result.data && result.data === undefined)
                    return toast.error("No result found");
                setUsers([result.data]);
                setCustomer(result.data);

            }
            if (state.aadhaar) {
                const result = await httpClient("customer/find", "POST", {
                    findkey: "mainAadhaar",
                    mainAadhaar: state.aadhaar,
                });
                if (!result.data && result.data === undefined)
                    return toast.error("No result found");
                setUsers([result.data]);
                //@ts-ignore
                setCustomer(result.data);

            }
            if (state.consumerNo) {
                const result = await httpClient("customer/find", "POST", {
                    findkey: "consumerNo",
                    consumerNo: state.consumerNo,
                });

                if (!result.data && result.data === undefined)
                    return toast.error("No result found");

                setUsers([result.data]);
                {/* @ts-ignore */ }
                setCustomer(result.data);
            }
            if (state.familyAadhaar) {
                const result = await httpClient("customer/find", "POST", {
                    findkey: "familyAadhaar",
                    familyAadhaar: state.familyAadhaar,
                });
                if (!result.data && result.data === undefined)
                    return toast.error("No result found");

                setUsers([result.data]);
                setCustomer(result.data);
                //@ts-ignore

            }
            if (state.fileNumber) {
                const result = await httpClient("customer/find", "POST", {
                    findkey: "regNo",
                    regNo: state.fileNumber,
                });
                if (!result.data && result.data === undefined)
                    return toast.error("No result found");
                setUsers([result.data]);
                setCustomer(result.data);
                //@ts-ignore

            }
        } catch (error) {
            return toast.error("Something went wrong!");

        }
    };


    const handleupdate = async () => {
        setOpen(false);
        try {
            const result = await axios.post(BASE_URL + "customer/update", {
                name: customer.name,
                mainAadhaar: customer.mainAadhaar,
                consumerNo: customer.consumerNo,
                familyAadhaar: customer.familyAadhaar,
                mainAgent: customer.mainAgent,
                subAgent: customer.subAgent,
                registeredAgencyName: customer.registeredAgencyName,
                remarks: customer.remarks,
                mobile: customer.mobile,
                addedBy: customer.addedBy,
                installtatus: customer.installtatus,
                regNo: customer.regNo,
                isSingleWomen: checked,
                registrationStatus: customer.registrationStatus,
                contactNumber: customer.contactNumber,
                isFreeDelivery: free,
                updatedBy: getUserName()
            },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    },
                })


            if (result.data.data && result.data != undefined) {
                toast.success("Consumer updated successfullly");

            }
        } catch (error) {
            if (error) {
                //@ts-ignore
                toast.error(error.response.data.errorMessage)
            }
        }
    };

    const handleDelete = async (customer: any) => {
        try {

            const result = await axios.post(BASE_URL + "customer/delete", { customerId: customer._id }, {
                headers: {
                    encryption: false,
                    access_token: getToken()
                }
            })
            if (result.data && result.data != undefined) {
                toast.success("Consumer deleted successfullly");
                window.location.reload();
                setOpenAlert(false);

            }
        } catch (error) {
            if (error) {
                //@ts-ignore
                showToast(error.response.data.message, "error")
            }
        }
    };





    React.useEffect(() => {
        getCharacters()
    }, []);




    async function getCharacters() {
        const result = await axios.get(BASE_URL + "agent/getall/active", {
            headers: {
                encryption: false,
                access_token: getToken()
            },
        });
        //@ts-ignore
        setAgetList(result.data.data.agents)
        //@ts-ignore
        setAgetList(result.data.data.agents.map(({ name }) => ({ label: name, value: name })));
    }



    return (
        <React.Fragment>
            <div >
                <Container maxWidth="md" component="main" style={{ marginTop: "20px", paddingTop: "10px" }}>
                    <Grid
                        container
                        className="maincontainer"
                        style={{ justifyContent: "center", textAlign: "center", marginTop: "-10px" }}
                    >
                        <Grid item xs={12} sm={12} md={2}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Main Aadhaar"
                                    variant="outlined"
                                    fullWidth
                                    name="aadhaar"
                                    autoComplete="aadhaar"
                                    autoFocus
                                    value={state.aadhaar}
                                    onChange={handleChange}
                                    type="tel"
                                    inputProps={{
                                        maxlength: CHARACTER_LIMIT
                                    }}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Family Aadhaar"
                                    name="familyAadhaar"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    value={state.familyAadhaar}
                                    onChange={handleChange}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Mobile No"
                                    name="mobile"
                                    fullWidth
                                    variant="outlined"
                                    type="tel"
                                    value={state.mobile}
                                    onChange={handleChange}
                                    inputProps={{
                                        maxLength: 10
                                    }}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={12} sm={12} md={2}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="Consumer No"
                                    name="consumerNo"
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    value={state.consumerNo}
                                    onChange={handleChange}
                                />
                            </form>
                        </Grid>

                        <Grid item xs={12} sm={12} md={2} >
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic"
                                    label="File No "
                                    name="fileNumber"
                                    variant="outlined"
                                    fullWidth
                                    type="text"
                                    value={state.fileNumber}
                                    onChange={handleChange}
                                />
                            </form>
                        </Grid>
                        <div
                            style={{
                                textAlign: "center",
                                justifyContent: "center",
                                margin: "20px",
                            }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleFind}

                            >
                                FIND CONSUMER
                            </Button>

                        </div>

                        <Grid />
                    </Grid>
                </Container>
            </div>

            <Container maxWidth="md">

                <Grid container spacing={4} className="maincontainer">
                    {users.map((user, i) => (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            style={{
                                justifyContent: "center",
                                alignContent: "center",
                                textAlign: "left",
                            }}
                        >

                            {(() => {
                                if (getRole() === "user" && user.mainAgent === getUserName()) {
                                    return (
                                        <Grid item xs={12} sm={12} md={12} style={{ marginTop: "-40PX" }}>
                                            <Card key={i}  >
                                                {user.isSingleWomen
                                                    ? <Typography color="primary"><ErrorOutlineIcon /> This registration is single women.Please submit family aadhaar to distributor otherwise this connection will be block shortly! </Typography>
                                                    : ""}
                                                <CardHeader
                                                    action={
                                                        <div style={{ margin: "0px", padding: "0px" }}>
                                                            {user.installtatus === "Complete" ?
                                                                <IconButton aria-label="settings">
                                                                    <CheckCircleIcon />
                                                                </IconButton> : null}
                                                            <IconButton aria-label="settings" onClick={handleClickOpenByAgent}>
                                                                <EditIcon onClick={handleCloseByAgent} />
                                                            </IconButton>
                                                        </div>
                                                    }
                                                    //@ts-ignore agent card
                                                    title={user.name.toUpperCase()}

                                                />

                                                <CardContent >
                                                    <Typography color="primary" gutterBottom>
                                                        Consumer's Details
                                                    </Typography>

                                                    {/* @ts-ignore */}
                                                    <Typography>Name : {user.name.toUpperCase()}  </Typography>
                                                    {/* @ts-ignore */}
                                                    <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
                                                    {/* @ts-ignore */}
                                                    <Typography>
                                                        Family Aadhaar : {user.familyAadhaar}
                                                    </Typography>
                                                    {/* @ts-ignore */}
                                                    <Typography>Mobile No : {user.mobile}</Typography>
                                                    {/* @ts-ignore */}
                                                    <Typography>Contact No : {user.contactNumber}</Typography>
                                                    {/* @ts-ignore */}
                                                    <Typography>
                                                        Registration No : {user.regNo || "NA"}
                                                    </Typography>
                                                    <Typography>
                                                        Consumer No : <span >{user.consumerNo || "NA"}</span>

                                                    </Typography>
                                                    {/* @ts-ignore */}
                                                    <Typography>Main Agent : {user.mainAgent.toUpperCase()}</Typography>
                                                    {/* @ts-ignore */}
                                                    <Typography>Sub Agent : {user.subAgent || "NA"}</Typography>
                                                    <Typography>Registered Agency Name : <span style={{ color: "red" }}> {user.registeredAgencyName || "NA"}</span> </Typography>
                                                    <Typography>Remarks : {user.remarks || "NA"}</Typography>
                                                    {/* @ts-ignore */}
                                                    <Typography>Status : {user.registrationStatus || "NA"}</Typography>
                                                    {/* @ts-ignore */}
                                                    <Typography >Single Women : {user.isSingleWomen ? "YES" : "NO"}</Typography>
                                                    {/* @ts-ignore */}
                                                    {user.InstalationLetter && user.InstalationLetter != undefined &&
                                                        <Typography color="primary" >Installation : {user.installtatus}</Typography>}
                                                </CardContent>
                                            </Card>


                                            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                                <DialogTitle id="customized-dialog-title" >
                                                    Update Consumer Data Agent:
                                                </DialogTitle>
                                                <DialogContent dividers>
                                                    {users.map((user, i) => (
                                                        <Grid container>
                                                            <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Contact Number"
                                                                    name="contactNumber"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    type="number"
                                                                    value={customer.contactNumber}
                                                                    onChange={handleChangeUser}
                                                                    onInput={(e) => {
                                                                        //@ts-ignore
                                                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    ))
                                                    }
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button autoFocus onClick={handleupdate} color="primary"   >
                                                        Save & Update
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>

                                            <Container maxWidth="md">
                                                {/* End hero unit */}
                                                <Grid container spacing={4} >
                                                    {users.map((user, i) => (
                                                        <Grid item key={i} xs={12} sm={6} md={4}>
                                                            <div>
                                                                <Typography component="h2" variant="h5">
                                                                    Photo:    Installation Letter
                                                                </Typography>
                                                                <br></br>
                                                                {user.InstalationLetter ?
                                                                    <div>
                                                                        <img
                                                                            src={user.InstalationLetter}
                                                                            alt="new"
                                                                        />
                                                                        <a href={user.InstalationLetter} target="_blank">Download</a>
                                                                    </div> : "No Image found"}
                                                            </div>
                                                            <br></br>
                                                            <div>
                                                                <Typography component="h2" variant="h5">
                                                                    Photo:   Satisfaction Letter
                                                                </Typography>
                                                                <br></br>
                                                                {user.satisfactionLetter ?
                                                                    <div>
                                                                        <img
                                                                            src={user.satisfactionLetter}
                                                                            alt="new"
                                                                        />
                                                                        <a href={user.satisfactionLetter} target="_blank">Download</a>
                                                                    </div> : "No Image found"}
                                                            </div>
                                                            <br></br>
                                                            <div>
                                                                <Typography component="h2" variant="h5">
                                                                    Photo:  Other Document
                                                                </Typography>
                                                                <br></br>
                                                                {user.otherLetter ?
                                                                    <div>
                                                                        <img
                                                                            src={user.otherLetter}
                                                                            alt="new"
                                                                        />
                                                                        <a href={user.otherLetter} target="_blank">Download</a>
                                                                    </div> : "No Image found"}

                                                            </div>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Container>
                                        </Grid>
                                    )
                                }
                                if ((getRole() === "user" && user.mainAgent != getUserName())) {
                                    return (
                                        <div><h1>CONSUMER REGISTERED WITH OTHER AGENT</h1></div>
                                    )
                                }
                            })()}
                            {(() => {
                                if (getRole() != "user") {
                                    return (
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} >

                                                <Card key={i}  >
                                                    {user.isSingleWomen
                                                        ? <Typography color="primary"><ErrorOutlineIcon /> This registration is single women.Please submit family aadhaar to distributor otherwise this connection will be block shortly! </Typography>
                                                        : ""}
                                                    <CardHeader
                                                        action={
                                                            <div style={{ margin: "0px", padding: "0px" }}>
                                                                {user.installtatus === "Complete" ?
                                                                    <IconButton aria-label="settings" color='primary'>
                                                                        <CheckCircleIcon />
                                                                    </IconButton> : null}
                                                                <IconButton aria-label="settings" onClick={handleClickOpen} color='primary'>
                                                                    <EditIcon onClick={handleClickOpen} />
                                                                </IconButton>
                                                                {getUser() ?
                                                                    <IconButton
                                                                        aria-label="settings" color='primary'
                                                                    >
                                                                        <DeleteIcon onClick={() => (handleClickOpenAlert())} />
                                                                    </IconButton> : null
                                                                }
                                                            </div>
                                                        }
                                                        //@ts-ignore
                                                        title={user.name.toUpperCase()}
                                                    />

                                                    <CardContent >
                                                        {/* @ts-ignore */}
                                                        <Typography >Main Aadhaar : <span >{user.mainAadhaar}</span> </Typography>
                                                        {/* @ts-ignore */}
                                                        <Typography >
                                                            Family Aadhaar : {user.familyAadhaar}
                                                        </Typography>
                                                        {/* @ts-ignore */}
                                                        <Typography >Mobile No : {user.mobile}</Typography>
                                                        {/* @ts-ignore */}
                                                        <Typography >Contact No : {user.contactNumber}</Typography>
                                                        {/* @ts-ignore */}

                                                        <Typography >
                                                            File No : {user.regNo || "NA"}
                                                        </Typography>                              {/* @ts-ignore */}

                                                        <Typography  >
                                                            Consumer No : <span >{user.consumerNo || "NA"}</span>
                                                        </Typography>
                                                        {/* @ts-ignore */}
                                                        <Typography>Main Agent : <span >{user.mainAgent.toUpperCase()}</span></Typography>
                                                        {/* @ts-ignore */}

                                                        <Typography >Sub Agent : {user.subAgent || "NA"}</Typography>

                                                        {/* @ts-ignore */}
                                                        <Typography >Registered Agency Name : <span > {user.registeredAgencyName || "NA"}</span> </Typography>
                                                        <Typography> Status : {user.registrationStatus || "NA"}</Typography>
                                                        {/* @ts-ignore */}
                                                        <Typography >Single Women : {user.isSingleWomen ? "YES" : "NO"}</Typography>
                                                        {/* @ts-ignore */}
                                                        <Typography>Free Delivery : {user.isFreeDelivery ? "YES" : "NO"}
                                                        </Typography>
                                                        {user.InstalationLetter && user.InstalationLetter != undefined &&
                                                            <Typography >Installation : <span > {user.installtatus}</span> </Typography>}

                                                        <Typography >Remarks : {user.remarks || "NA"}</Typography>

                                                    </CardContent>
                                                    <CardActions disableSpacing>
                                                        &nbsp; &nbsp;<Typography >View more </Typography>

                                                        <IconButton
                                                            onClick={handleExpandClick}
                                                            aria-expanded={expanded}
                                                            aria-label="show more"
                                                        >
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                                    </CardActions>
                                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                        <CardContent>

                                                            {/* @ts-ignore */}
                                                            <Typography>Created On : {moment(user.createdAt).format('LLL') || "NA"}</Typography>
                                                            {user.updatedAt != undefined &&
                                                                <Typography >Updated On: {moment(user.updatedAt).format('LLL') || "NA"}</Typography>
                                                            }
                                                            <Typography >Added By : {user.addedBy || "NA"}</Typography>
                                                            {/* @ts-ignore */}
                                                            <Typography>Updated By : {user.updatedBy || "NA"}</Typography>


                                                            <img src={user.InstalationLetter} alt={user.name} height="270px" width="410px" />

                                                        </CardContent>
                                                    </Collapse>
                                                </Card>
                                                <div>
                                                    <Dialog
                                                        open={openAlert}
                                                        onClose={handleCloseAlert}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-description">
                                                                Make sure you want to remove this consumer?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleCloseAlert} color="primary">
                                                                No
                                                            </Button>
                                                            <Button onClick={() => handleDelete(user)} color="primary" autoFocus>
                                                                Yes
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                                        <DialogTitle id="customized-dialog-title">
                                                            Update Consumer Data :
                                                        </DialogTitle>
                                                        <DialogContent dividers>
                                                            {users.map((user, i) => (
                                                                <Grid container>
                                                                    <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                                                        <TextField
                                                                            id="outlined-basic"
                                                                            label="Name"
                                                                            name="name"
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            type="text"
                                                                            value={customer.name}
                                                                            onChange={handleChangeUser}
                                                                        />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                                                        <Tooltip title="Main Aadhar not allowed to update !">
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                label="Main Aadhaar"
                                                                                name="mainAadhaar"
                                                                                fullWidth
                                                                                type="text"
                                                                                value={customer.mainAadhaar}
                                                                                InputProps={{
                                                                                    readOnly: true,
                                                                                }}
                                                                                variant="filled"
                                                                            />
                                                                        </Tooltip>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                                                        <TextField
                                                                            id="outlined-basic"
                                                                            label="Family Aadhaar"
                                                                            name="familyAadhaar"
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            type="text"
                                                                            value={customer.familyAadhaar}
                                                                            onChange={handleChangeUser}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                                                        <TextField
                                                                            id="outlined-basic"
                                                                            label="Mobile Number"
                                                                            name="mobile"
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            type="number"
                                                                            value={customer.mobile}
                                                                            onChange={handleChangeUser}
                                                                            onInput={(e) => {
                                                                                //@ts-ignore
                                                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                                                        <TextField
                                                                            id="outlined-basic"
                                                                            label="Contact Number"
                                                                            name="contactNumber"
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            type="number"
                                                                            value={customer.contactNumber}
                                                                            onChange={handleChangeUser}
                                                                            onInput={(e) => {
                                                                                //@ts-ignore
                                                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                                                        <TextField
                                                                            id="outlined-basic"
                                                                            label="File No"
                                                                            name="regNo"
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            type="text"
                                                                            value={customer.regNo}
                                                                            onChange={handleChangeUser}
                                                                        />
                                                                    </Grid>

                                                                    {getUser() ?
                                                                        <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                label="Consumer No"
                                                                                name="consumerNo"
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                type="text"
                                                                                value={customer.consumerNo}
                                                                                onChange={handleChangeUser}
                                                                            />
                                                                        </Grid> : null}
                                                                    <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>

                                                                        <Tooltip title="Main Agent not allowed to update !">
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                label="Main Agent"
                                                                                name="mainAgent"
                                                                                fullWidth
                                                                                type="text"
                                                                                value={customer.mainAgent}
                                                                                InputProps={{
                                                                                    readOnly: true,
                                                                                }}
                                                                                variant="filled"
                                                                            />
                                                                        </Tooltip>
                                                                        <br />
                                                                    </Grid>
                                                                    {getUser() ? (
                                                                        <Grid item xs={12} sm={12} md={12} >
                                                                            <FormControl variant="outlined" style={{ width: "34rem" }}>

                                                                                <InputLabel id="demo-simple-select-required-label" >Update new Agent *</InputLabel>


                                                                                <Select
                                                                                    onChange={handleChangeAgent}
                                                                                    displayEmpty
                                                                                    labelId="demo-simple-select-outlined-label"
                                                                                    id="demo-simple-select-outlined"
                                                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                                                    name="mainAgent"
                                                                                >
                                                                                    {agentList.map(item => (
                                                                                        <MenuItem
                                                                                            //@ts-ignore
                                                                                            key={item.label} value={item.value} >{item.label}</MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>) : null}

                                                                    <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>

                                                                        <TextField
                                                                            id="outlined-basic"
                                                                            label="Sub Agent"
                                                                            name="subAgent"
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            type="text"
                                                                            value={customer.subAgent}
                                                                            onChange={handleChangeUser}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} >
                                                                        <FormControl variant="outlined" >
                                                                            <InputLabel id="demo-simple-select-filled-label">Registered Agency Name</InputLabel>
                                                                            <Select
                                                                                style={{ width: "34rem" }}
                                                                                labelId="demo-simple-select-filled-label"
                                                                                id="demo-simple-select-filled"
                                                                                value={customer.registeredAgencyName}
                                                                                onChange={handleChangeUser}
                                                                                fullWidth
                                                                                name="registeredAgencyName"
                                                                            >

                                                                                <MenuItem value="JAMAN HP GAS 2021">JAMAN HP GAS 2021</MenuItem>
                                                                                <MenuItem value="GOURIPUR HP GAS PSV 2021">GOURIPUR HP GAS PSV 2021</MenuItem>
                                                                                <MenuItem value="JAMAN HP GAS CLEAR KYC 2019">JAMAN HP GAS CLEAR KYC 2019</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={12} md={12} >
                                                                        <TextField style={{ color: "primary" }}
                                                                            id="outlined-basic"
                                                                            label="Remarks"
                                                                            name="remarks"
                                                                            variant="outlined"
                                                                            fullWidth
                                                                            type="text"
                                                                            value={customer.remarks}
                                                                            onChange={handleChangeUser}
                                                                        />
                                                                    </Grid>
                                                                    {getUser() ?
                                                                        <Grid item xs={12} sm={12} md={12} style={{ margin: "5px" }}>
                                                                            <FormControl component="fieldset">
                                                                                <FormLabel component="legend">Installation Status</FormLabel>
                                                                                <RadioGroup aria-label="gender" name="installtatus" value={customer.installtatus} onChange={handleChangeUser} style={{ flexDirection: "row" }}>
                                                                                    <FormControlLabel value="Not Complete" control={<Radio />} label="Not Complete" />
                                                                                    <FormControlLabel value="Complete" control={<Radio />} label="Complete" />
                                                                                </RadioGroup>
                                                                            </FormControl>
                                                                        </Grid> : null}
                                                                    <Grid item xs={12} sm={12} md={12} >
                                                                        <FormControl variant="outlined" >
                                                                            <InputLabel id="demo-simple-select-label">Registration Status</InputLabel>
                                                                            <Select
                                                                                style={{ width: "34rem" }}
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                name="registrationStatus"
                                                                                value={customer.registrationStatus} onChange={handleChangeUser}

                                                                            >
                                                                                <MenuItem value="">None</MenuItem>
                                                                                <MenuItem value="Fingerprint Pending">Fingerprint Pending </MenuItem>
                                                                                <MenuItem value="Fingerprint Completed">Fingerprint Completed</MenuItem>
                                                                                <MenuItem value="Pending Documents">Pending Documents</MenuItem>
                                                                                <MenuItem value="Reject/Cancel">Reject/Cancel</MenuItem>
                                                                                <MenuItem value="Reject Doc Physical Return">Reject Doc Physical Return</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Typography >Single Women : &nbsp;
                                                                        <FormControlLabel
                                                                            control={<Checkbox checked={checked} onChange={handleChangeCheck} name="isSingleWomen" />}
                                                                            label=""
                                                                        />
                                                                    </Typography>
                                                                    <Typography>Free Delivery : &nbsp;
                                                                        <FormControlLabel
                                                                            control={<Checkbox checked={free} onChange={handleChangeFree} name="isFreeDelivery" />}
                                                                            label=""
                                                                        />
                                                                    </Typography>
                                                                </Grid>

                                                            ))
                                                            }
                                                        </DialogContent>
                                                        <DialogActions >
                                                            <Button autoFocus onClick={handleupdate} color="secondary" variant='outlined'  >
                                                                Save & Update
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            })()}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default Search;

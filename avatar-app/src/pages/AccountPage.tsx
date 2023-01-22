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
import { findUserId, getToken } from 'utils/UtilService';
import { AccountProfile } from 'features/account/AccountProfile';
import toast from "react-hot-toast";



export const AccountPage = (props: any) => {

    const [user, setUser] = useState({
        "user_id": findUserId(),
        name: "",
        city: "",
        dob: "",
        old_password: "",
        new_password: "",
        email: "",
        mobile: "",
        status: "",
        profile_url: "",
        last_login_timestamp: ""
    });


    const handleChange = (event: any) => {
        // setValues({
        //     ...values,
        //     [event.target.name]: event.target.value
        // });
    };

    React.useEffect(() => {
        document.title = "Jaman HP GAS | Profile  "
        fetchUser()

    }, []);


    const fetchUser = async () => {
        try {
            const result = await axios.post(BASE_URL + "user/find",
                {
                    "user_id": findUserId()
                },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    }
                })
            if (result.data && result.data != null) {
                setUser(result.data.data)

            }
            else {
                // showToast(result.data.message, "error");
            }
        } catch (error) {
            console.log(error)
            //@ts-ignore
            toast.success(error.data.message)

        }
    };

    const HandleUpdate = async () => {
        try {
            const result = await axios.post(BASE_URL + "user/update",
                {
                    "email": user.email,
                    "dob": user.dob,
                    "city": user.city,
                    "mobile": user.mobile
                },
                {
                    headers: {
                        encryption: false,
                        access_token: getToken()
                    }
                })
            if (result.data && result.data != null) {
                //showToast("Profile updated successfully!", "success");
            }
            else {
                //showToast(result.data.message, "error");
            }
        } catch (error) {
            console.log(error)
            // showToast("Profile couldn't update", "error");

        }
    };

    return (
        <Container maxWidth="lg">
            <Typography
                sx={{ mb: 3 }}
                variant="h4"
            >
                Account
            </Typography>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    lg={4}
                    md={6}
                    xs={12}
                >
                    <AccountProfile user={
                        user
                    } />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xs={12}
                >
                    <form
                        autoComplete="off"
                        noValidate
                        {...props}
                    >
                        <Card>
                            <CardHeader
                                subheader="The information can be edited"
                                title="Profile"
                            />
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            helperText="Please specify the Name"
                                            label="Full name"
                                            name="name"
                                            onChange={handleChange}
                                            required
                                            value={user.name}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Current satus"
                                            name="status"
                                            onChange={handleChange}
                                            required
                                            value={user.status}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            onChange={handleChange}
                                            required
                                            value={user.email}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            name="phone"
                                            onChange={handleChange}
                                            type="number"
                                            value={user.mobile}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Area Name"
                                            name="city"
                                            onChange={handleChange}
                                            required
                                            value={user.city}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Date of Birth"
                                            name="dob"
                                            onChange={handleChange}
                                            required
                                            value={user.dob}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    p: 2
                                }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                >
                                    Save details
                                </Button>
                            </Box>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </Container>

    );
};
import React from "react";
import {
  Button,
  Typography,
  CardHeader,
  Tabs,
  Tab,
  CardContent,
  Card,
  Grid,
  Container,
  TextField,
} from "@mui/material";
import { BASE_URL } from "../../config/constant";
import jwt_decode from "jwt-decode";
import moment from "moment";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { httpClient } from "../../utils/UtilService";

export default function ImageUpload() {
  const [imageSrc, setImageSrc] = React.useState();
  const [upload, setUpload] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [users, setUsers] = React.useState<any[]>([]);
  const [state, setState] = React.useState({
    aadhaar: "",
  });
  const [customer, setCustomer] = React.useState({
    mainAadhaar: "",
  });
  const [install, setInstall] = React.useState({ preview: "", raw: "" });
  const [satis, setSatis] = React.useState({ preview: "", raw: "" });
  const [other, setOther] = React.useState({ preview: "", raw: "" });
  const [errorI, setErrorI] = React.useState("");
  const [errorS, setErrorS] = React.useState("");
  const [errorO, setErrorO] = React.useState("");

  const [installb, setInstallb] = React.useState(false);
  const [satisb, setSatisb] = React.useState(false);
  const [otherb, setOtherb] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleChangevalue = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  const handleFind = async (event: any) => {
    try {
      event.preventDefault();
      if (value === 0) {
        if (state.aadhaar) {
          const result = await httpClient("customer/find", "POST", {
            mainAadhaar: state.aadhaar,
          });
          if (!result.data && result.data === undefined)
            return alert("Something went wrong!");
          setUsers([result.data]);
          //@ts-ignore
          setCustomer(result.data);
        }
      }
      if (value === 1) {
        if (state.aadhaar) {
          const result = await httpClient("old/customer/findone", "POST", {
            mainAadhaar: state.aadhaar,
          });
          if (!result.data && result.data === undefined) {
            return alert("Something went wrong!");
          }
          setUsers([result.data]);
          //@ts-ignore
          setCustomer(result.data);
        }
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeInstall = (e: any) => {
    if (e.target.files.length) {
      setInstall({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setErrorI("");
      setInstallb(true);
    }
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      window.alert("File does not support. You must use .png or .jpg ");
      setErrorI("Select a valid image type");
    }
    if (file.size > 1000089) {
      window.alert("Please upload a file smaller than 1 MB ");
      setInstall({
        preview: "",
        raw: "",
      });
      setErrorI("Select a valid image size");
    }
  };

  const installRemoveImage = (e: any) => {
    e.preventDefault();
    e.target.value = null;
    setInstall({
      preview: "",
      raw: "",
    });
  };

  const satisRemoveImage = (e: any) => {
    e.preventDefault();
    e.target.value = null;
    setSatis({
      preview: "",
      raw: "",
    });
  };

  const otherRemoveImage = (e: any) => {
    e.preventDefault();
    e.target.value = null;
    setOther({
      preview: "",
      raw: "",
    });
  };

  const handleChangeSatis = (e: any) => {
    if (e.target.files.length) {
      setSatis({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setSatisb(true);
    }
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      window.alert("File does not support. You must use .png or .jpg ");
      setErrorS("Select a valid image type");
    }
    if (file.size > 1000089) {
      window.alert("Please upload a file smaller than 1 MB ");
      setSatis({
        preview: "",
        raw: "",
      });
      setErrorS("Select a valid image size");
    }
  };
  const handleChangeOther = (e: any) => {
    if (e.target.files.length) {
      setOther({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setOtherb(true);
    }
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
      window.alert("File does not support. You must use .png or .jpg ");
      setErrorO("Select a valid image type");
    }
    if (file.size > 1000089) {
      window.alert("Please upload a file smaller than 1 MB ");
      setOther({
        preview: "",
        raw: "",
      });
      setErrorO("Select a valid image size");
    }
  };

  const installUpload = async (e: any, mainAadhaar: string) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", install.raw);
    formData.append("mainAadhaar", mainAadhaar);
    formData.append("photo_key", "InstalationLetter");
    if (value === 0) {
      fetch(BASE_URL + "customer/uploadimages", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(
          (data) => console.log("message", data.message),
          //@ts-ignore
          setInstall({ preview: "", raw: "" })
        )
        .catch((error) => {
          console.log("message", error.message);
        });
    }

    if (value === 1) {
      fetch(BASE_URL + "old/customer/uploadimages", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(
          (data) => console.log("message", data.message),
          //@ts-ignore
          setInstall({ preview: "", raw: "" })
        )
        .catch((error) => {
          console.log("message", error.message);
        });
    }
  };

  const othereUpload = async (e: any, mainAadhaar: string) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", other.raw);
    formData.append("mainAadhaar", mainAadhaar);
    formData.append("photo_key", "otherLetter");
    if (value === 0) {
      await fetch(BASE_URL + "customer/uploadimages", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(
          (data) => console.log("message", data.message),
          //@ts-ignore
          setOther({ preview: "", raw: "" })
        )
        .catch((error) => {
          console.log("message", error.message);
        });
    }
    if (value === 1) {
      await fetch(BASE_URL + "old/customer/uploadimages", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(
          (data) => console.log("message", data.message),
          //@ts-ignore
          setOther({ preview: "", raw: "" })
        )
        .catch((error) => {
          console.log("message", error.message);
        });
    }
  };

  const satisUpload = async (e: any, mainAadhaar: string) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", satis.raw);
    formData.append("mainAadhaar", mainAadhaar);
    formData.append("photo_key", "satisfactionLetter");
    if (value === 0) {
      await fetch(BASE_URL + "customer/uploadimages", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(
          (data) => console.log("message", data.message),
          //@ts-ignore
          setSatis({ preview: "", raw: "" })
        )
        .catch((error) => {
          console.log("message", error.message);
        });
    }
    if (value === 1) {
      await fetch(BASE_URL + "old/customer/uploadimages", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(
          (data) => console.log("message", data.message),
          //@ts-ignore
          setSatis({ preview: "", raw: "" })
        )
        .catch((error) => {
          console.log("message", error.message);
        });
    }
  };

  const findRole = () => {
    let token: any = localStorage.getItem("jhp_token");
    var decoded = jwt_decode(token);
    //@ts-ignore
    let { role } = decoded;
    if (role) {
      return role;
    } else {
      return "NOT_ADMIN";
    }
  };

  return (
    <React.Fragment>
      <Grid
        container
        maxWidth="md"
        justifyContent="center"
        style={{ marginTop: "-4rem" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <Tabs
            value={value}
            onChange={handleChangevalue}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="New Customer" icon={<FiberNewIcon color="primary" />} />
            <Tab
              label="Old Customer"
              icon={<NewReleasesIcon color="secondary" />}
            />
          </Tabs>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Main Aadhaar No"
              variant="outlined"
              fullWidth
              name="aadhaar"
              autoComplete="aadhaar"
              autoFocus
              value={state.aadhaar}
              onChange={handleChange}
              type="number"
            />
          </form>
          <Button
            variant="contained"
            component="label"
            color="primary"
            onClick={handleFind}
          >
            FIND AND UPLOAD PHOTO
          </Button>
        </Grid>
      </Grid>

      <div>
        <Container maxWidth="md">
          <Grid container>
            {users.map((user, i) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "left",
                }}
              >
                <Grid item>
                  <Card key={i} sx={{ minWidth: 275 }}>
                    <CardContent sx={{ height: 440 }}>
                      <Typography color="textSecondary" gutterBottom>
                        Customer's Details
                      </Typography>
                      <CardHeader
                        action={
                          <div style={{ margin: "0px", padding: "0px" }}>
                            {user.installtatus === "Complete" ? (
                              <IconButton aria-label="settings">
                                <CheckCircleIcon style={{ color: "blue" }} />
                              </IconButton>
                            ) : null}
                          </div>
                        }
                        //@ts-ignore agent card
                        title={user.name.toUpperCase()}
                      />

                      <CardHeader style={{ textAlign: "center" }} />
                      {/* @ts-ignore */}
                      <Typography>Name : {user.name.toUpperCase()}</Typography>
                      {/* @ts-ignore */}
                      <Typography>Main Aadhaar : {user.mainAadhaar}</Typography>
                      {/* @ts-ignore */}
                      <Typography>
                        Family Aadhaar : {user.familyAadhaar}
                      </Typography>
                      {/* @ts-ignore */}
                      <Typography>Mobile No : {user.mobile}</Typography>
                      {/* @ts-ignore */}
                      <Typography>
                        Registration No : {user.regNo || "NA"}
                      </Typography>
                      <Typography>
                        Consumer No :{user.consumerNo || "NA"}
                      </Typography>
                      {/* @ts-ignore */}
                      <Typography>
                        Main Agent : {user.mainAgent.toUpperCase()}
                      </Typography>
                      {/* @ts-ignore */}
                      <Typography>
                        Sub Agent : {user.subAgent || "NA"}
                      </Typography>
                      <Typography>
                        Registered Agency Name :
                        <span style={{ color: "red" }}>
                          {" "}
                          {user.registeredAgencyName || "NA"}
                        </span>{" "}
                      </Typography>
                      <Typography>Remarks : {user.remarks || "NA"}</Typography>
                      {/* @ts-ignore */}
                      <Typography>
                        Created On :{" "}
                        {moment(user.createdAt).format("LLL") || "NA"}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        color="primary"
                      >
                        Added By : {user.addedBy || "NA"}
                      </Typography>

                      {/* @ts-ignore */}
                    </CardContent>
                  </Card>
                  <br></br>
                  {user.consumerNo ? null : (
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      color="primary"
                    >
                      This Customer don't have any consumer Number
                    </Typography>
                  )}
                </Grid>
                {user.installtatus && (
                  <Container maxWidth="md">
                    <Grid container spacing={4} style={{ marginRight: "1rem" }}>
                      {(() => {
                        if (findRole() === "superadmin") {
                          return (
                            <div>
                              {" "}
                              <Grid item xs={12} md={12}>
                                <label htmlFor="upload-button1">
                                  {install.preview ? (
                                    <img
                                      src={install.preview}
                                      alt="install"
                                      width="300"
                                      height="300"
                                    />
                                  ) : null}
                                </label>
                                <Typography>
                                  Installation Letter Photo :
                                </Typography>
                                <input
                                  type="file"
                                  id="upload-button1"
                                  // style={{ display: "none" }}
                                  onChange={handleChangeInstall}
                                  accept="image/*"
                                />
                                <br />
                                <span style={{ color: "red" }}>{errorI}</span>
                                <br />
                                <br />
                                {installb ? (
                                  <div>
                                    <Button
                                      size="medium"
                                      variant="contained"
                                      color="primary"
                                      style={{ backgroundColor: "#834bff" }}
                                      onClick={(e) => {
                                        installUpload(e, user.mainAadhaar);
                                      }}
                                    >
                                      Submit Installation Photo
                                    </Button>
                                    <Button
                                      size="medium"
                                      variant="contained"
                                      color="inherit"
                                      onClick={installRemoveImage}
                                    >
                                      Reset Photo
                                    </Button>
                                  </div>
                                ) : null}
                              </Grid>
                            </div>
                          );
                        }

                        if (
                          user.installtatus != "Complete" &&
                          findRole() === "admin"
                        ) {
                          return (
                            <div>
                              <Grid item xs={12} md={12}>
                                <label htmlFor="upload-button1">
                                  {install.preview ? (
                                    <img
                                      src={install.preview}
                                      alt="install"
                                      width="300"
                                      height="300"
                                    />
                                  ) : null}
                                </label>
                                <Typography>
                                  Installation Letter Photo:
                                </Typography>
                                <input
                                  type="file"
                                  id="upload-button1"
                                  // style={{ display: "none" }}
                                  onChange={handleChangeInstall}
                                  accept="image/*"
                                />
                                <br />
                                <span style={{ color: "red" }}>{errorI}</span>
                                <br />
                                <br />
                                {installb ? (
                                  <div>
                                    <Button
                                      size="medium"
                                      variant="contained"
                                      color="primary"
                                      style={{ backgroundColor: "#834bff" }}
                                      onClick={(e) => {
                                        installUpload(e, user.mainAadhaar);
                                      }}
                                    >
                                      Submit Installation Photo
                                    </Button>
                                    <Button
                                      size="medium"
                                      variant="contained"
                                      color="inherit"
                                      onClick={installRemoveImage}
                                    >
                                      Reset Photo
                                    </Button>
                                  </div>
                                ) : null}
                              </Grid>
                            </div>
                          );
                        }

                        if (user.installtatus === "Complete") {
                          return (
                            <div>
                              <Typography color="primary">
                                Installation photo already submitted !
                              </Typography>
                            </div>
                          );
                        }
                      })()}
                      <br />
                      <Grid item xs={12} sm={12} md={12}>
                        <br />
                        <label htmlFor="upload-button2">
                          {satis.preview ? (
                            <img
                              src={satis.preview}
                              alt="dummy"
                              width="300"
                              height="300"
                            />
                          ) : null}
                        </label>
                        <Typography>Satisfaction Letter Photo :</Typography>
                        <input
                          type="file"
                          id="upload-button2"
                          // style={{ display: "none" }}
                          onChange={handleChangeSatis}
                          accept="image/*"
                        />
                        <br />
                        <span style={{ color: "red" }}>{errorS}</span>
                        <br />
                        <br />
                        {satisb ? (
                          <div>
                            <Button
                              size="medium"
                              variant="contained"
                              color="primary"
                              style={{ backgroundColor: "#f44336" }}
                              onClick={(e) => {
                                satisUpload(e, user.mainAadhaar);
                              }}
                            >
                              Submit Satisfaction Photo
                            </Button>
                            <Button
                              size="medium"
                              variant="contained"
                              color="inherit"
                              onClick={satisRemoveImage}
                            >
                              Reset Photo
                            </Button>
                          </div>
                        ) : null}
                      </Grid>

                      <Grid item xs={12} sm={12} md={12}>
                        <br />
                        <label htmlFor="upload-button3">
                          {other.preview ? (
                            <img
                              src={other.preview}
                              alt="dummy"
                              width="300"
                              height="300"
                            />
                          ) : null}
                        </label>
                        <Typography>Other Letter Photo :</Typography>
                        <input
                          type="file"
                          id="upload-button3"
                          // style={{ display: "none" }}
                          onChange={handleChangeOther}
                          accept="image/*"
                        />
                        <br />
                        <span style={{ color: "red" }}>{errorO}</span>
                        <br />
                        <br />
                        {otherb ? (
                          <div>
                            <Button
                              variant="contained"
                              style={{ backgroundColor: "#8bc34a" }}
                              color="primary"
                              onClick={(e) => {
                                othereUpload(e, user.mainAadhaar);
                              }}
                            >
                              Submit Other Photo
                            </Button>
                            <Button
                              size="medium"
                              variant="contained"
                              color="inherit"
                              onClick={otherRemoveImage}
                            >
                              Reset Photo
                            </Button>
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Container>
                )}
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <div>
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {users.map((user, i) => (
              <Grid item key={i} xs={12} sm={12} md={12} display="flex">
                <div style={{ width: "400px" }}>
                  <Typography component="h2" variant="h5">
                    Installation Letter
                  </Typography>
                  <br></br>
                  {user.InstalationLetter ? (
                    <div>
                      <img src={user.InstalationLetter} alt="new" />
                      <a href={user.InstalationLetter} target="_blank">
                        Download
                      </a>
                    </div>
                  ) : (
                    "No Image found"
                  )}
                </div>
                <div>
                  <Typography component="h2" variant="h5">
                    Satisfaction Letter
                  </Typography>
                  <br></br>
                  {user.satisfactionLetter ? (
                    <div>
                      <img src={user.satisfactionLetter} alt="new" />
                      <a href={user.satisfactionLetter} target="_blank">
                        Download
                      </a>
                    </div>
                  ) : (
                    "No Image found"
                  )}
                </div>
                <div>
                  <Typography component="h2" variant="h5">
                    Other Doc
                  </Typography>
                  <br></br>
                  {user.otherLetter ? (
                    <div>
                      <img src={user.otherLetter} alt="new" />
                      <a href={user.otherLetter} target="_blank">
                        Download
                      </a>
                    </div>
                  ) : (
                    "No Image found"
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      {/* End footer */}
    </React.Fragment>
  );
}

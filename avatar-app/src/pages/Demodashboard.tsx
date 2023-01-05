import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/Iconify";

// sections
import AppWidgetSummary from "../sections/app/AppWidgetSummary";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Jaman HP Gas </title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            {/* 
// @ts-ignore */}
            <AppWidgetSummary
              title="New Custoners"
              total={37442}
              color="success"
              icon={"mdi:clipboard-user"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* 
// @ts-ignore */}
            <AppWidgetSummary
              title="Old Customers"
              total={30037}
              color="warning"
              icon={"mdi:user-check"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* 
// @ts-ignore */}
            <AppWidgetSummary
              title="Pending fingerprint"
              total={4159}
              color="error"
              icon={"mdi:fingerprint-off"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* 
// @ts-ignore */}
            <AppWidgetSummary
              title="All Agents"
              total={234}
              color="info"
              icon={"mdi:face-agent"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} sm={6} md={3}>
            {/* 
// @ts-ignore */}
            <AppWidgetSummary
              title="Total Member"
              total={117}
              style={{ color: "#e91e63", backgroundColor: "#f8bbd0" }}
              icon={"mdi:user-tie"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* 
// @ts-ignore */}
            <AppWidgetSummary
              style={{ color: "#009688", backgroundColor: "#b2dfdb" }}
              title="Installation Complete"
              total={19080}
              icon={"mdi:user-check"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* 
// @ts-ignore */}
            <AppWidgetSummary
              style={{ color: "#ff5722", backgroundColor: "#ffccbc" }}
              title="Total Agents"
              total={4159}
              color="warning"
              icon={"mdi:fingerprint-off"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* 
// @ts-ignore */}
            <AppWidgetSummary
              title="All Agents"
              total={234}
              color="error"
              icon={"mdi:face-agent"}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

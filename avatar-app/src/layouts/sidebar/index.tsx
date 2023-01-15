import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

// hooks
import { useResponsive } from "../../hooks/useResponsive";
// components
import { Logo } from "../../components/Logo";
import { Scrollbar } from "../../components/Scrollbar";
import { NavSection } from "../../components/NavSection";
//
import { systemUserNavConfig, userNavConfig } from "../NavConfig";
import { useAppSelector } from "app/hooks";
import { selectAuth } from "app/services/auth/authSlice";
import { accountPhotoURL } from "definitions/constant/misc";

// ----------------------------------------------------------------------

// mock

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }: { theme: any }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

interface ISidebar {
  isOpenSidebar: boolean;
  onCloseSidebar: any;
}

export function Sidebar({ isOpenSidebar, onCloseSidebar }: ISidebar) {
  const { pathname } = useLocation();
  // redux
  const auth = useAppSelector(selectAuth);

  const isDesktop = useResponsive("up", "lg");

  const [today, setDate] = useState(new Date());

  const hour = today.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  }, `;
  const userGreetings = () => {
    return (
      <div>
        <p>{wish}</p>
      </div>
    );
  };

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={accountPhotoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {userGreetings()}
                {"Jamal"}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {auth.user?.type}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection
        navConfig={auth.isSystemUser ? systemUserNavConfig : userNavConfig}
      />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems='center'
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component='img'
            src='/static/illustrations/illustration_avatar.png'
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant='h6'>
              Get more?
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              From only $69
            </Typography>
          </Box>

          <Button
            href='https://material-ui.com/store/items/minimal-dashboard/'
            target='_blank'
            variant='contained'>
            Upgrade to Pro
          </Button>
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}

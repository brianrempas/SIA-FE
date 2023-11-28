import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FaceIcon from '@mui/icons-material/Face';
import SubjectIcon from '@mui/icons-material/Subject';
import PortraitIcon from '@mui/icons-material/Portrait';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import GradingIcon from '@mui/icons-material/Grading';
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Button, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { logout, selectRole } from "../reducers/authSlice";
import GradeIcon from '@mui/icons-material/Grade';
const drawerWidth = 310;
import LogoutIcon from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

let ListMenu = [
  {
    id: 1,
    icon: <DashboardIcon />,
    label: "Dashboard",
    path: "/",
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {

  const dispatch = useAppDispatch()
  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);

  const handleOpenLogoutModal = () => {
    setOpenLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setOpenLogoutModal(false);
  };

  const handleLogout = () => {
    setOpenLogoutModal(false);
    dispatch(logout())
  };


  const roleData = useAppSelector(selectRole)

  if (roleData === 'admin') {
    ListMenu = [
      {
        id: 1,
        icon: <DashboardIcon />,
        label: "Dashboard",
        path: "/",
      },
      {
        id: 2,
        icon: <FaceIcon />,
        label: "Student",
        path: "/student",
      },
      {
        id: 3,
        icon: <PersonIcon />,
        label: "Lecturer",
        path: "/lecture",
      },
      {
        id: 4,
        icon: <SubjectIcon />,
        label: "Users",
        path: "/user",
      },
      {
        id: 5,
        icon: <MenuBookIcon />,
        label: "Program Study",
        path: "/prodi",
      },
      {
        id: 6,
        icon: <AccountCircleIcon />,
        label: "Subject",
        path: "/subject",
      },
      {
        id: 7,
        icon: <ScheduleIcon />,
        label: "Schedule",
        path: "/schedule",
      }
    ];
  } else if (roleData === 'student') {
    ListMenu = [
      {
        id: 1,
        icon: <DashboardIcon />,
        label: "Dashboard",
        path: "/",
      },
      {
        id: 2,
        icon: <PortraitIcon />,
        label: 'Profile',
        path: "/profile",
      },
      {
        id: 2,
        icon: <ScheduleIcon />,
        label: "Schedule",
        path: "/schedule",
      },
      {
        id: 3,
        icon: <GradingIcon />,
        label: "Score Results",
        path: "/score",
      },
    ];
  } else if (roleData === 'lecture') {
    ListMenu = [
      {
        id: 1,
        icon: <DashboardIcon />,
        label: "Dashboard",
        path: "/",
      },
      {
        id: 2,
        icon: <PortraitIcon />,
        label: 'Profile',
        path: "/profile",
      },
      {
        id: 3,
        icon: <ScheduleIcon />,
        label: "Your Schedule",
        path: "/schedule",
      },
      {
        id: 4,
        icon: <GradeIcon />,
        label: "Score Students",
        path: "/score",
      },
    ];
  }

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [bar, setBar] = React.useState<any>(false)

  const location = useLocation();
  const isItemActive = (path: string) => {
    return location.pathname === path;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setBar(false)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setBar(true)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar color="default" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}> */}
          <Navbar />
          {/* </Box> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div">
            Sistem Informasi Akademik
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {ListMenu.map((item) => (
            <Tooltip disableHoverListener={!bar}
              key={item.label} title={item.label} placement="right" disableInteractive>
              <Link
                key={item.label}
                to={item.path}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem
                  key={item.label}
                  disablePadding
                  sx={{
                    display: "block",
                    backgroundColor: isItemActive(item.path) ? "#4a1e81" : "",
                    transition: "background-color 0.3s", // Add transition for background-color
                    "&:hover": {
                      [`.label-${item.id}`]: {
                        marginLeft: open ? 1.5 : 0, // Adjust the value based on your preference
                      },
                    },
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        marginLeft: isItemActive(item.path) && open ? 1.5 : "",
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: isItemActive(item.path) ? "white" : "",
                        transition: "margin-left 0.3s", // Add transition for marginLeft
                      }}
                      className={`label-${item.id}`}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: isItemActive(item.path) ? "white" : "",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Tooltip>
          ))}

          <ListItem
            key="Logout"
            disablePadding
            onClick={handleOpenLogoutModal}
            sx={{
              cursor: "pointer",
              display: "block",
              backgroundColor: openLogoutModal ? "#4a1e81" : "",
              transition: "background-color 0.3s", // Add transition for background-color
              "&:hover": {
                [`.label-logout`]: {
                  marginLeft: open ? 1.5 : 0, // Adjust the value based on your preference
                },
              },
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  marginLeft: openLogoutModal ? 1.5 : "",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: openLogoutModal ? "white" : "",
                  transition: "margin-left 0.3s", // Add transition for marginLeft
                }}

                className={`label-logout`}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{
                  opacity: open ? 1 : 0,
                  color: openLogoutModal ? "white" : "",
                }}
              />
            </ListItemButton>
          </ListItem>

          <Dialog
            open={openLogoutModal}
            onClose={handleCloseLogoutModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Logout Confirmation"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseLogoutModal}>Cancel</Button>
              <Button onClick={handleLogout} autoFocus>
                Logout
              </Button>
            </DialogActions>
          </Dialog>

        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f3f3f4",
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

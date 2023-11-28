import * as React from "react";
import {useEffect} from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import { logout, selectRole } from "../reducers/authSlice";
import { useNavigate } from 'react-router-dom';


let settings = ["Profile", "Logout"];

function Navbar() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let role = useAppSelector(selectRole)
  
  useEffect(() => {
    if (role === 'admin') {
      settings = ["Logout"];
    } else {
      settings = ["Profile", "Logout"];
    }
  }, [])

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: string) => {
    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;
      case "Logout":
        dispatch(logout());
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ position: "absolute", right: 40 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
export default Navbar;

import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import userStore from "../../stores/userStore";

const MenuItemForNavBar = () => {
  const { user, getUserIfToken, logout } = userStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getUserIfToken();
  }, [getUserIfToken]);


  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {user ? (
          <>
            <MenuItem onClick={() => navigate("/user")}>My account</MenuItem>
            <MenuItem onClick={() => navigate("/admin")}>Admin panel</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => navigate("/signin")}>Sign In</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default MenuItemForNavBar;

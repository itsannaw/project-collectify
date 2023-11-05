import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import MenuItemForNavBar from "./MenuItemForNavBar";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <section className="flex justify-between items-center">
      <AppBar position="static" color="inherit">
        <div className="flex justify-between mx-5 py-2">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <button
            onClick={handleHome}
            className="flex gap-2 items-center justify-center"
          >
            <span className="text-xl font-semibold drop-shadow-xl">
              COLLECTIFY
            </span>
            <img className="h-[45px] w-[45px]" src="bar.svg" alt="" />
          </button>

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
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItemForNavBar />
            </Menu>
          </div>
        </div>
      </AppBar>
    </section>
  );
}

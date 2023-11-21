import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import userStore from "../../stores/userStore";
import { useTranslation } from "react-i18next";

const MenuItemForNavBar = () => {
  const { user, getUserIfToken, logout } = userStore();
  const { t } = useTranslation();
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
          <div>
            <MenuItem
              onClick={() => {
                navigate(`/user/${user.username}`);
                handleClose();
              }}
            >
              {t("menu_item.account")}
            </MenuItem>
            {user.admin && (
              <MenuItem
                onClick={() => {
                  navigate(`/admin/${user.username}`);
                  handleClose();
                }}
              >
                {t("menu_item.adm")}
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                logout();
                navigate("/");
                handleClose();
              }}
            >
              {t("menu_item.logout")}
            </MenuItem>
          </div>
        ) : (
          <MenuItem
            onClick={() => {
              navigate("/signin");
              handleClose();
            }}
          >
            {t("menu_item.sign_in")}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default MenuItemForNavBar;

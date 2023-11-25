import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = {
  en: "English",
  ru: "Русский",
};

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { i18n } = useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="large"
        edge="start"
        aria-label="menu"
      >
        <TranslateIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Object.entries(LANGUAGES).map(([lang, langName]) => {
          return (
            <MenuItem
              key={lang}
              onClick={() => {
                i18n.changeLanguage(lang);
                handleClose();
              }}
              selected={i18n.language === lang}
            >
              {langName}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default LanguageSelector;

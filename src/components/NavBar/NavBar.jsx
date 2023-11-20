import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import MenuItemForNavBar from "./MenuItemForNavBar";
import BasicMenuForNavBar from "./BasicMenuForNavBar";
import SearchField from "./SearchField";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import themeStore from "../../stores/themeStore";
import { useCallback } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const { mode, setMode } = themeStore();

  const handleHome = () => {
    navigate("/");
  };

  const toggleTheme = useCallback(() => {
    setMode(mode === "light" ? "dark" : "light");
  }, [mode, setMode]);

  return (
    <nav className="flex justify-between items-center">
      <AppBar position="static" color="inherit">
        <div className="flex justify-between mx-5 py-2 items-center">
          <div className="flex items-center gap-5">
            <BasicMenuForNavBar />
            <button
              onClick={handleHome}
              className="flex gap-2 items-center justify-center"
            >
              <span className="text-xl font-semibold drop-shadow-xl">
                COLLECTIFY
              </span>
              <img className="h-[45px] w-[45px]" src="/bar.svg" alt="" />
            </button>
            <SearchField />
          </div>
          <div className="flex">
            <IconButton onClick={toggleTheme}>
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <MenuItemForNavBar />
          </div>
        </div>
      </AppBar>
    </nav>
  );
}

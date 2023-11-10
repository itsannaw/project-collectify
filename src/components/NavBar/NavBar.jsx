import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import MenuItemForNavBar from "./MenuItemForNavBar";
import BasicMenuForNavBar from "./BasicMenuForNavBar";
import SearchField from "./SearchField";

export default function NavBar() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <section className="flex justify-between items-center">
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
              <img className="h-[45px] w-[45px]" src="bar.svg" alt="" />
            </button>
            <SearchField />
          </div>
          <MenuItemForNavBar />
        </div>
      </AppBar>
    </section>
  );
}

import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const MenuItemForNavBar = () => {
  const navigate = useNavigate();

  const handleAccount = () => {
    navigate("/user");
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <>
      <MenuItem onClick={handleAccount}>My account</MenuItem>
      <MenuItem onClick={handleAdmin}>Admin panel</MenuItem>
      <MenuItem onClick={handleSignIn}>Sign In</MenuItem>
      <MenuItem>Logout</MenuItem>
    </>
  );
};

export default MenuItemForNavBar;

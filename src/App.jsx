import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserAccount from "./pages/UserAccount";
import Home from "./pages/Home";
import globalRouter from "./router/globalRouter";
import Admin from "./pages/Admin";
import CreateCollection from "./pages/CreateCollection";

const App = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserAccount />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/create-collection" element={<CreateCollection />} />
      </Routes>
    </>
  );
};

export default App;

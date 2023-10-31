import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserAccount from "./pages/UserAccount";
import Home from "./pages/Home";
import globalRouter from "./router/globalRouter";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserAccount from "./pages/UserAccount";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserAccount />} />
        <Route path="/user" element={<UserAccount />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;

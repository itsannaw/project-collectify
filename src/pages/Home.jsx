import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <NavBar />
      <Outlet />
    </section>
  );
};

export default Home;

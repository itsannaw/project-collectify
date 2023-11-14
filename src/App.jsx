import { Outlet, useNavigate } from "react-router-dom";
import globalRouter from "./router/globalRouter";

const App = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  return <Outlet />;
};

export default App;

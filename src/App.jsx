import { Outlet, useNavigate } from "react-router-dom";
import globalRouter from "./router/globalRouter";
import { ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import themeStore from "./stores/themeStore";

const App = () => {
  const navigate = useNavigate();
  const { mode } = themeStore();
  globalRouter.navigate = navigate;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
};

export default App;

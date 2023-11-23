import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "./i18n/i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

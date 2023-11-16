import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import Home from "../pages/Home.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import Admin from "../pages/Admin.jsx";
import CreateCollection from "../pages/CreateCollection.jsx";
import AuthGuard from "../guards/AuthGuard.jsx";
import UserAccount from "../pages/UserAccount.jsx";
import HomePage from "../pages/HomePage.jsx";
import MoreCollection from "../pages/MoreCollection.jsx";

const protect = (c) => <AuthGuard component={c} />;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/user/:id",
            element: protect(<UserAccount />),
          },

          {
            path: "/admin/:id",
            element: protect(<Admin />),
          },
          {
            path: "/create-collection",
            element: protect(<CreateCollection />),
          },
          {
            path: "/contact",
            element: <ContactUs />,
          },
          {
            path: "/signin",
            element: <SignIn />,
          },
          {
            path: "/collection/:id",
            element: <MoreCollection />,
          },
        ],
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

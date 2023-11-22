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
import ErrorPage from "../pages/ErrorPage.jsx";
import AddEditCollection from "../pages/AddEditCollection.jsx";
import CreateItem from "../pages/CreateItem.jsx";
import MoreItem from "../pages/MoreItem.jsx";

const protect = (c) => <AuthGuard component={c} />;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
            path: "/user/:username",
            element: protect(<UserAccount />),
          },

          {
            path: "/admin/:username",
            element: protect(<Admin />),
          },
          {
            path: "/create-collection",
            element: protect(<CreateCollection />),
          },
          {
            path: "/edit-collection/:id",
            element: protect(<AddEditCollection isEdit={true} />),
          },
          {
            path: "/collection/:id/create-item",
            element: protect(<CreateItem />),
          },
          {
            path: "/collection/:id/item/:itemId",
            element: protect(<MoreItem />),
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

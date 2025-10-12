import Signin from "./components/Signin";
import Header from "./components/Header";
import Dashboard from "./routes/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import RootRedirect from "./routes/RootRedirect";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

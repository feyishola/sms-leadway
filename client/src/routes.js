import { createBrowserRouter, Outlet } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import CreateSchool from "./pages/createschool";
import HomeLayout from "./layouts/homelayout";
import Home from "./pages/home";
import AccountCreated from "./Components/AcountCreated";
import CreateSchoolSuccessFul from "./Components/CreatedSchoolSuccessFul";
import CreatingSchool from "./Components/CreatingSchool";
import PrivateRoutes from "./guards/privateroutes";
import PublicRoutes from "./guards/publicroutes";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "_",
        element: <AccountCreated />,
      },
      {
        path: "/school-created",
        element: <CreateSchoolSuccessFul />,
      },
      {
        path: "/creating-school",
        element: <CreatingSchool />,
      },
      {
        path: "/createschool",
        element: <CreateSchool />,
      },
      {
        path: "/home",
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

export default router;

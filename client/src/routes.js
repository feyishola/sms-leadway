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
import FramerPage from "./pages/framerpage";
import LandingPage from "./pages/landingpage";
import ThreePage from "./pages/threepage";
import Charts from "./pages/charts";
import ReactQuery from "./pages/reactquery";

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
      {
        path: "/framerpage",
        element: <FramerPage />,
      },
      {
        path: "/landingpage",
        element: <LandingPage />,
      },
      {
        path: "/threepage",
        element: <ThreePage />,
      },
      {
        path: "/recharts",
        element: <Charts />,
      },
      {
        path: "/reactquery",
        element: <ReactQuery />,
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

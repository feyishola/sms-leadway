import { createBrowserRouter, Outlet } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import CreateSchool from "./pages/createschool";
import HomeLayout from "./layouts/homelayout";
import Home from "./pages/home";
import AccountCreated from "./Components/AcountCreated";
import CreateSchoolSuccessFul from "./Components/CreatedSchoolSuccessFul";
import CreatingSchool from "./Components/CreatingSchool";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
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
]);

export default router;

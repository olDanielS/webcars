import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { CarDetails } from "./pages/car";
import { SignIn } from "./pages/login";
import { SignUp } from "./pages/register";
import { NewCar } from "./pages/dashboard/newCar";

import {Layout} from "./components/layout";
import { Private } from "./routes/private";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },{
        path: "/car/:id",
        element: <CarDetails />
      }
      ,{
        path: "/dashboard",
        element: <Private><Dashboard/></Private>
      },
      {
        path: "/dashboard/new",
        element: <Private><NewCar/></Private>
      }
    ]
  },
  {
    path: "/login",
    element: <SignIn />
  },
  {
    path: "/register",
    element: <SignUp />
  }
])

export {router};
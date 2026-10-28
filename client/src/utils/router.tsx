import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../components/layout/Mainlayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Onboarding from "../pages/Onboarding";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Todos from "../pages/Todos";

export const router = createBrowserRouter([
    {
        path: "/main",
        element: <Mainlayout/>,
        children: [
            {
                path: "/main/todos",
                element: <Todos/>
            },
            {
                path: "/main/home",
                element: <Home/>
            },
        ]
    },
    {
        path: "/",
        element: <Onboarding/>
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/signin",
        element: <Signin/>
    },
    {
        path: "*",
        element: <NotFound/>
    },
])

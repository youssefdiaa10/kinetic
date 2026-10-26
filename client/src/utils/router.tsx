import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../components/layout/Mainlayout";
import AuthPage from "../pages/AuthPage";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Onboarding from "../pages/Onboarding";
import Signin from "../pages/Signin";
import Todos from "../pages/Todos";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout/>,
        children: [
            {
                path: "/todos",
                element: <Todos/>
            },
            {
                path: "/home",
                element: <Home/>
            },
        ]
    },
    {
        path: "/onboarding",
        element: <Onboarding/>
    },
    {
        path: "/signup",
        element: <AuthPage mode="signup"/>
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

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

function Mainlayout() {
    const navigate = useNavigate()
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
    const token = localStorage.getItem("token")

    useEffect(() => {
        console.log(`Mainlayout isAuthenticated: ${isAuthenticated}`)
        if (!isAuthenticated && token === null) {
            navigate("/signin")
        }
    },[isAuthenticated, token])

    return <Outlet/>
}

export default Mainlayout

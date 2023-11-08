import React from "react";
import { Navigate } from "react-router-dom";
import paths from "../paths";

const Logout = () => {
    localStorage.clear();
    return <Navigate to={paths.signIn} />
}

export default Logout;
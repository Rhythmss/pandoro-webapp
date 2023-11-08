import React from "react";
import { Navigate } from "react-router-dom";
import paths from "../paths";

const PrivateRoute = ({ children }) => {
    const userId = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID);

    if (!userId) {
        return <Navigate to={paths.signIn} />
    }
    return children;
}

export default PrivateRoute;
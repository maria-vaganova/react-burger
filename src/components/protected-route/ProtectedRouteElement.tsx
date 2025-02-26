import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {EMPTY_REFRESH_TOKEN, REFRESH_TOKEN_STORAGE_TAG} from "../../utils/data";

interface ProtectedRouteProps {
    redirectPath?: string;
    children: React.ReactNode;
    isAuthorizedRedirect?: boolean;
}

function ProtectedRouteElement({children, redirectPath = "/", isAuthorizedRedirect = false}: ProtectedRouteProps) {
    const location = useLocation();

    const isAuthenticated: boolean = localStorage.getItem(REFRESH_TOKEN_STORAGE_TAG) !== EMPTY_REFRESH_TOKEN;

    if (isAuthenticated && isAuthorizedRedirect) {
        return <Navigate to={redirectPath} replace/>;
    }

    if (!isAuthenticated && !isAuthorizedRedirect) {
        return <Navigate to={redirectPath} state={{from: location}} replace/>;
    }

    return (<>{children}</>);
}

export default ProtectedRouteElement;
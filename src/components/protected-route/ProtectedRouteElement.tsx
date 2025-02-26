import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {EMPTY_REFRESH_TOKEN, REFRESH_TOKEN_STORAGE_TAG} from "../../utils/data";

interface ProtectedRouteProps {
    redirectPath: string;
    children: React.ReactNode;
    isAuthorizedRedirect: boolean;
}

function ProtectedRouteElement({children, redirectPath, isAuthorizedRedirect}: ProtectedRouteProps) {
    const location = useLocation();

    const isAuthenticated: boolean = localStorage.getItem(REFRESH_TOKEN_STORAGE_TAG) !== EMPTY_REFRESH_TOKEN;

    if (location.pathname === redirectPath) {
        return (<>{children}</>);
    }

    if (isAuthenticated && isAuthorizedRedirect) {
        const targetPath = location.state?.from?.pathname || redirectPath;
        if (location.pathname !== targetPath)
            return <Navigate to={targetPath} state={{from: location}} replace/>;
    }

    if (!isAuthenticated && !isAuthorizedRedirect) {
        return <Navigate to={redirectPath} state={{from: location}} replace/>;
    }

    return (<>{children}</>);
}

export default ProtectedRouteElement;
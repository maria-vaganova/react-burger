import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {isUserAuthenticated} from "../../utils/util";

interface IProtectedRouteProps {
    redirectPath: string;
    children: React.ReactNode;
    isAuthorizedRedirect: boolean;
}

function ProtectedRouteElement({children, redirectPath, isAuthorizedRedirect}: IProtectedRouteProps) {
    const location = useLocation();

    const isAuthenticated: boolean = isUserAuthenticated();

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
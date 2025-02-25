import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {loginStateToProps, useAppSelector} from "../../services/store";

interface ProtectedRouteProps {
    redirectPath?: string;
    children: React.ReactNode;
    isAuthorizedRedirect?: boolean;
}

function ProtectedRouteElement({children, redirectPath="/", isAuthorizedRedirect = false}: ProtectedRouteProps) {
    const location = useLocation();
    const {loginInfo} = useAppSelector(loginStateToProps);

    const isAuthenticated = loginInfo?.success === true;

    if (isAuthenticated && isAuthorizedRedirect) {
        return <Navigate to={redirectPath} replace />;
    }

    if (!isAuthenticated && !isAuthorizedRedirect) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    return (<>{children}</>);
}

export default ProtectedRouteElement;
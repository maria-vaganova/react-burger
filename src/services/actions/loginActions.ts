import {Dispatch} from "redux";
import {
    AUTHORIZED_SERVER_INFO,
    EMPTY_AUTHORIZATION_INFO,
    EMPTY_REFRESH_TOKEN, EMPTY_SERVER_INFO,
    LOGIN_URL,
    LOGOUT_URL,
    POST_LOGIN,
    POST_LOGIN_FAILED,
    POST_LOGIN_SUCCESS,
    POST_LOGOUT,
    REFRESH_TOKEN_STORAGE_TAG
} from "../../utils/data";
import {IAuthorizationInfo, IServerInfo, IUserToLogIn} from "../../utils/types";
import {request} from "../../utils/util";

export interface IPostLoginAction {
    type: typeof POST_LOGIN;
}

export interface IPostLoginSuccessAction {
    type: typeof POST_LOGIN_SUCCESS;
    loginInfo: IAuthorizationInfo;
    loginMessage: IServerInfo;
}

export interface IPostLoginFailedAction {
    type: typeof POST_LOGIN_FAILED;
    loginInfo: IAuthorizationInfo;
    loginMessage: IServerInfo;
}

export interface IPostLogoutAction {
    type: typeof POST_LOGOUT;
    loginInfo: IAuthorizationInfo;
    loginMessage: IServerInfo;
}

export type TLoginActions =
    | IPostLoginAction
    | IPostLoginSuccessAction
    | IPostLoginFailedAction;

export type TLogoutActions =
    | IPostLogoutAction
    | IPostLoginFailedAction;

export function getLogin(user: IUserToLogIn) {
    return async function getLoginThunk(dispatch: Dispatch<TLoginActions>) {
        dispatch({
            type: POST_LOGIN
        })
        try {
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, EMPTY_REFRESH_TOKEN);
            const loginInfo = await request(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            dispatch({
                type: POST_LOGIN_SUCCESS,
                loginInfo: loginInfo as IAuthorizationInfo,
                loginMessage: AUTHORIZED_SERVER_INFO
            });
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, loginInfo.refreshToken);
        } catch (error: any) {
            dispatch({
                type: POST_LOGIN_FAILED,
                loginInfo: EMPTY_AUTHORIZATION_INFO,
                loginMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}

export function getLogout() {
    return async function getLogoutThunk(dispatch: Dispatch<TLogoutActions>) {
        try {
            const token: string = localStorage.getItem(REFRESH_TOKEN_STORAGE_TAG) || EMPTY_REFRESH_TOKEN;
            const logoutInfo = await request(LOGOUT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token})
            });
            dispatch({
                type: POST_LOGOUT,
                loginInfo: EMPTY_AUTHORIZATION_INFO,
                loginMessage: logoutInfo as IServerInfo
            });
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, EMPTY_REFRESH_TOKEN);
        } catch (error: any) {
            dispatch({
                type: POST_LOGIN_FAILED,
                loginInfo: EMPTY_AUTHORIZATION_INFO,
                loginMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}
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
import {AuthorizationInfo, ServerInfo, UserToLogIn} from "../../utils/types";

export interface PostLoginAction {
    type: typeof POST_LOGIN;
}

export interface PostLoginSuccessAction {
    type: typeof POST_LOGIN_SUCCESS;
    loginInfo: AuthorizationInfo;
    loginMessage: ServerInfo;
}

export interface PostLoginFailedAction {
    type: typeof POST_LOGIN_FAILED;
    loginInfo: AuthorizationInfo;
    loginMessage: ServerInfo;
}

export interface PostLogoutAction {
    type: typeof POST_LOGOUT;
    loginInfo: AuthorizationInfo;
    loginMessage: ServerInfo;
}

export type LoginActions =
    | PostLoginAction
    | PostLoginSuccessAction
    | PostLoginFailedAction;

export type LogoutActions =
    | PostLogoutAction
    | PostLoginFailedAction;

export function getLogin(user: UserToLogIn) {
    return async function getLoginThunk(dispatch: Dispatch<LoginActions>) {
        dispatch({
            type: POST_LOGIN
        })
        try {
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, EMPTY_REFRESH_TOKEN);
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) {
                const info = await response.json() as ServerInfo;
                dispatch({
                    type: POST_LOGIN_FAILED,
                    loginInfo: EMPTY_AUTHORIZATION_INFO,
                    loginMessage: info
                });
                return;
            }

            const loginInfo = await response.json() as AuthorizationInfo;
            dispatch({
                type: POST_LOGIN_SUCCESS,
                loginInfo: loginInfo,
                loginMessage: AUTHORIZED_SERVER_INFO
            });
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, loginInfo.refreshToken);
        } catch (err) {
            dispatch({
                type: POST_LOGIN_FAILED,
                loginInfo: EMPTY_AUTHORIZATION_INFO,
                loginMessage: EMPTY_SERVER_INFO
            });
        }
    }
}

export function getLogout(user: UserToLogIn) {
    return async function getLogoutThunk(dispatch: Dispatch<LogoutActions>) {
        try {
            const token: string = localStorage.getItem(REFRESH_TOKEN_STORAGE_TAG) || EMPTY_REFRESH_TOKEN;
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, EMPTY_REFRESH_TOKEN);
            const response = await fetch(LOGOUT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(token)
            });
            const info = await response.json() as ServerInfo;
            if (!response.ok) {
                dispatch({
                    type: POST_LOGIN_FAILED,
                    loginInfo: EMPTY_AUTHORIZATION_INFO,
                    loginMessage: info
                });
                return;
            }
            dispatch({
                type: POST_LOGOUT,
                loginInfo: EMPTY_AUTHORIZATION_INFO,
                loginMessage: info
            });
        } catch (err) {
            dispatch({
                type: POST_LOGIN_FAILED,
                loginInfo: EMPTY_AUTHORIZATION_INFO,
                loginMessage: EMPTY_SERVER_INFO
            });
        }
    }
}
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
import {request} from "../../utils/util";

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
            const loginInfo = await request(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            dispatch({
                type: POST_LOGIN_SUCCESS,
                loginInfo: loginInfo as AuthorizationInfo,
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
    return async function getLogoutThunk(dispatch: Dispatch<LogoutActions>) {
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
                loginMessage: logoutInfo as ServerInfo
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
import {Dispatch} from "redux";
import {
    POST_LOGIN_FAILED,
    POST_LOGIN_SUCCESS,
    POST_LOGIN,
    LOGIN_URL,
    EMPTY_AUTHORIZATION_INFO
} from "../../utils/data";
import {DeniedInfo, AuthorizationInfo, UserToLogIn} from "../../utils/types";

export interface PostLoginAction {
    type: typeof POST_LOGIN;
}

export interface PostLoginSuccessAction {
    type: typeof POST_LOGIN_SUCCESS;
    loginInfo: AuthorizationInfo;
}

export interface PostLoginFailedAction {
    type: typeof POST_LOGIN_FAILED;
    loginInfo: DeniedInfo;
}

export type LoginActions =
    | PostLoginAction
    | PostLoginSuccessAction
    | PostLoginFailedAction;

export function getLogin(user: UserToLogIn) {
    return async function getLoginThunk(dispatch: Dispatch<LoginActions>) {
        dispatch({
            type: POST_LOGIN
        })
        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) {
                const deniedInfo = await response.json() as DeniedInfo;
                dispatch({
                    type: POST_LOGIN_FAILED,
                    loginInfo: deniedInfo,
                });
                return;
            }

            const loginInfo = await response.json() as AuthorizationInfo;
            dispatch({
                type: POST_LOGIN_SUCCESS,
                loginInfo: loginInfo
            });
        } catch (err) {
            dispatch({
                type: POST_LOGIN_FAILED,
                loginInfo: EMPTY_AUTHORIZATION_INFO
            });
        }
    }
}
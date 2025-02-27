import {Dispatch} from "redux";
import {
    POST_REGISTER_FAILED,
    POST_REGISTER_SUCCESS,
    POST_REGISTER,
    REGISTER_URL,
    EMPTY_AUTHORIZATION_INFO,
    EMPTY_REFRESH_TOKEN,
    REFRESH_TOKEN_STORAGE_TAG,
    EMPTY_SERVER_INFO,
    AUTHORIZED_SERVER_INFO
} from "../../utils/data";
import {AuthorizationInfo, ServerInfo, UserAuthorization} from "../../utils/types";
import {request} from "../../utils/util";

export interface PostRegisterAction {
    type: typeof POST_REGISTER;
}

export interface PostRegisterSuccessAction {
    type: typeof POST_REGISTER_SUCCESS;
    registerInfo: AuthorizationInfo;
    registerMessage: ServerInfo;
}

export interface PostRegisterFailedAction {
    type: typeof POST_REGISTER_FAILED;
    registerInfo: AuthorizationInfo;
    registerMessage: ServerInfo;
}

export type RegisterActions =
    | PostRegisterAction
    | PostRegisterSuccessAction
    | PostRegisterFailedAction;

export function getRegister(newUser: UserAuthorization) {
    return async function getRegisterThunk(dispatch: Dispatch<RegisterActions>) {
        dispatch({
            type: POST_REGISTER
        })
        try {
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, EMPTY_REFRESH_TOKEN);
            const registerInfo = await request(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });
            dispatch({
                type: POST_REGISTER_SUCCESS,
                registerInfo: registerInfo as AuthorizationInfo,
                registerMessage: AUTHORIZED_SERVER_INFO
            });
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, registerInfo.refreshToken);
        } catch (error: any) {
            dispatch({
                type: POST_REGISTER_FAILED,
                registerInfo: EMPTY_AUTHORIZATION_INFO,
                registerMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}
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
import {IAuthorizationInfo, IServerInfo, IUserAuthorization} from "../../utils/types";
import {request} from "../../utils/util";

export interface IPostRegisterAction {
    type: typeof POST_REGISTER;
}

export interface IPostRegisterSuccessAction {
    type: typeof POST_REGISTER_SUCCESS;
    registerInfo: IAuthorizationInfo;
    registerMessage: IServerInfo;
}

export interface IPostRegisterFailedAction {
    type: typeof POST_REGISTER_FAILED;
    registerInfo: IAuthorizationInfo;
    registerMessage: IServerInfo;
}

export type TRegisterActions =
    | IPostRegisterAction
    | IPostRegisterSuccessAction
    | IPostRegisterFailedAction;

export function getRegister(newUser: IUserAuthorization) {
    return async function getRegisterThunk(dispatch: Dispatch<TRegisterActions>) {
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
                registerInfo: registerInfo as IAuthorizationInfo,
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
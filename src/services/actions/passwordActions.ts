import {Dispatch} from "redux";
import {
    EMPTY_SERVER_INFO,
    POST_PASSWORD,
    POST_PASSWORD_SUCCESS,
    POST_PASSWORD_FAILED,
    FORGOT_PASSWORD_URL,
    RESET_PASSWORD_URL
} from "../../utils/data";
import {IResetPasswordInfo, IServerInfo} from "../../utils/types";
import {request} from "../../utils/util";

export interface IPostPasswordAction {
    type: typeof POST_PASSWORD;
}

export interface IPostPasswordSuccessAction {
    type: typeof POST_PASSWORD_SUCCESS;
    passwordMessage: IServerInfo;
}

export interface IPostPasswordFailedAction {
    type: typeof POST_PASSWORD_FAILED;
    passwordMessage: IServerInfo;
}

export type TPostPasswordActions =
    | IPostPasswordAction
    | IPostPasswordSuccessAction
    | IPostPasswordFailedAction;

export function askToResetPassword(email: string) {
    return async function askToResetPasswordThunk(dispatch: Dispatch<TPostPasswordActions>) {
        dispatch({
            type: POST_PASSWORD
        })
        try {
            const resetInfo = await request(FORGOT_PASSWORD_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            });
            dispatch({
                type: POST_PASSWORD_SUCCESS,
                passwordMessage: resetInfo as IServerInfo
            });
        } catch (error: any) {
            dispatch({
                type: POST_PASSWORD_FAILED,
                passwordMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}

export function getNewPassword(data: IResetPasswordInfo) {
    return async function getNewPasswordThunk(dispatch: Dispatch<TPostPasswordActions>) {
        dispatch({
            type: POST_PASSWORD
        })
        try {
            const passwordInfo = await request(RESET_PASSWORD_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            dispatch({
                type: POST_PASSWORD_SUCCESS,
                passwordMessage: passwordInfo as IServerInfo
            });
        } catch (error: any) {
            dispatch({
                type: POST_PASSWORD_FAILED,
                passwordMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}
import {Dispatch} from "redux";
import {
    EMPTY_SERVER_INFO,
    POST_PASSWORD,
    POST_PASSWORD_SUCCESS,
    POST_PASSWORD_FAILED,
    FORGOT_PASSWORD_URL,
    RESET_PASSWORD_URL
} from "../../utils/data";
import {ResetPasswordInfo, ServerInfo} from "../../utils/types";
import {request} from "../../utils/util";

export interface PostPasswordAction {
    type: typeof POST_PASSWORD;
}

export interface PostPasswordSuccessAction {
    type: typeof POST_PASSWORD_SUCCESS;
    passwordMessage: ServerInfo;
}

export interface PostPasswordFailedAction {
    type: typeof POST_PASSWORD_FAILED;
    passwordMessage: ServerInfo;
}

export type PostPasswordActions =
    | PostPasswordAction
    | PostPasswordSuccessAction
    | PostPasswordFailedAction;

export function askToResetPassword(email: string) {
    return async function askToResetPasswordThunk(dispatch: Dispatch<PostPasswordActions>) {
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
                passwordMessage: resetInfo as ServerInfo
            });
        } catch (error: any) {
            dispatch({
                type: POST_PASSWORD_FAILED,
                passwordMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}

export function getNewPassword(data: ResetPasswordInfo) {
    return async function getNewPasswordThunk(dispatch: Dispatch<PostPasswordActions>) {
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
                passwordMessage: passwordInfo as ServerInfo
            });
        } catch (error: any) {
            dispatch({
                type: POST_PASSWORD_FAILED,
                passwordMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}
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
    passwordMessage: IServerInfo;
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

export function askToResetPassword(email: string): (dispatch: Dispatch<TPostPasswordActions>) => Promise<void> {
    return async function askToResetPasswordThunk(dispatch: Dispatch<TPostPasswordActions>): Promise<void> {
        dispatch({
            type: POST_PASSWORD,
            passwordMessage: EMPTY_SERVER_INFO
        })
        try {
            const resetInfo: IServerInfo = await request(FORGOT_PASSWORD_URL, {
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
        } catch (error) {
            dispatch({
                type: POST_PASSWORD_FAILED,
                passwordMessage: error as IServerInfo || EMPTY_SERVER_INFO
            });
        }
    }
}

export function getNewPassword(data: IResetPasswordInfo): (dispatch: Dispatch<TPostPasswordActions>) => Promise<void> {
    return async function getNewPasswordThunk(dispatch: Dispatch<TPostPasswordActions>): Promise<void> {
        dispatch({
            type: POST_PASSWORD,
            passwordMessage: EMPTY_SERVER_INFO
        })
        try {
            const passwordInfo: IServerInfo = await request(RESET_PASSWORD_URL, {
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
        } catch (error) {
            dispatch({
                type: POST_PASSWORD_FAILED,
                passwordMessage: error as IServerInfo || EMPTY_SERVER_INFO
            });
        }
    }
}
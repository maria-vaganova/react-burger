import {Dispatch} from "redux";
import {
    POST_REGISTER_FAILED,
    POST_REGISTER_SUCCESS,
    POST_REGISTER,
    REGISTER_URL
} from "../../utils/data";
import {DeniedInfo, RegisterInfo, UserAuthorization} from "../../utils/types";

export interface PostRegisterAction {
    type: typeof POST_REGISTER;
}

export interface PostRegisterSuccessAction {
    type: typeof POST_REGISTER_SUCCESS;
    registerInfo: RegisterInfo | DeniedInfo;
}

export interface PostRegisterFailedAction {
    type: typeof POST_REGISTER_FAILED;
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
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });
            if (!response.ok) {
                const deniedInfo = await response.json() as DeniedInfo;
                dispatch({
                    type: POST_REGISTER_FAILED,
                    registerInfo: deniedInfo,
                });
                return;
            }

            const registerInfo = await response.json() as RegisterInfo;
            dispatch({
                type: POST_REGISTER_SUCCESS,
                registerInfo: registerInfo
            });
        } catch (err) {
            dispatch({
                type: POST_REGISTER_FAILED
            });
        }
    }
}
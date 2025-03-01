import {Dispatch} from "redux";
import {
    EMPTY_CURRENT_USER_INFO,
    AUTHORIZED_SERVER_INFO,
    EMPTY_SERVER_INFO,
    USER_URL,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    SET_USER,
    SET_USER_SUCCESS,
    SET_USER_FAILED
} from "../../utils/data";
import {CurrentUserInfo, ServerInfo, UserAuthorization} from "../../utils/types";
import {request} from "../../utils/util";

export interface GetUserAction {
    type: typeof GET_USER;
}

export interface GetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    userInfo: CurrentUserInfo;
    userMessage: ServerInfo;
}

export interface GetUserFailedAction {
    type: typeof GET_USER_FAILED;
    userInfo: CurrentUserInfo;
    userMessage: ServerInfo;
}

export interface SetUserAction {
    type: typeof SET_USER;
}

export interface SetUserSuccessAction {
    type: typeof SET_USER_SUCCESS;
    userInfo: CurrentUserInfo;
    userMessage: ServerInfo;
}

export interface SetUserFailedAction {
    type: typeof SET_USER_FAILED;
    userInfo: CurrentUserInfo;
    userMessage: ServerInfo;
}

export type GetUserActions =
    | GetUserAction
    | GetUserSuccessAction
    | GetUserFailedAction;

export type SetUserActions =
    | SetUserAction
    | SetUserSuccessAction
    | SetUserFailedAction;

export function setUserInfo(user: UserAuthorization, accessToken: string) {
    return async function setUserInfoThunk(dispatch: Dispatch<SetUserActions>) {
        dispatch({
            type: SET_USER
        })
        try {
            const userInfo = await request(USER_URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                },
                body: JSON.stringify(user)
            });
            dispatch({
                type: SET_USER_SUCCESS,
                userInfo: userInfo as CurrentUserInfo,
                userMessage: AUTHORIZED_SERVER_INFO
            });
        } catch (error: any) {
            dispatch({
                type: SET_USER_FAILED,
                userInfo: EMPTY_CURRENT_USER_INFO,
                userMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}

export function getUserInfo(accessToken: string) {
    return async function getUserInfoThunk(dispatch: Dispatch<GetUserActions>) {
        dispatch({
            type: GET_USER
        })
        try {
            const userInfo = await request(USER_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`
                }
            });
            dispatch({
                type: GET_USER_SUCCESS,
                userInfo: userInfo as CurrentUserInfo,
                userMessage: AUTHORIZED_SERVER_INFO
            });
        } catch (error: any) {
            dispatch({
                type: GET_USER_FAILED,
                userInfo: EMPTY_CURRENT_USER_INFO,
                userMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}
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
import {ICurrentUserInfo, IServerInfo, IUserAuthorization} from "../../utils/types";
import {request} from "../../utils/util";

export interface IGetUserAction {
    type: typeof GET_USER;
}

export interface IGetUserSuccessAction {
    type: typeof GET_USER_SUCCESS;
    userInfo: ICurrentUserInfo;
    userMessage: IServerInfo;
}

export interface IGetUserFailedAction {
    type: typeof GET_USER_FAILED;
    userInfo: ICurrentUserInfo;
    userMessage: IServerInfo;
}

export interface ISetUserAction {
    type: typeof SET_USER;
}

export interface ISetUserSuccessAction {
    type: typeof SET_USER_SUCCESS;
    userInfo: ICurrentUserInfo;
    userMessage: IServerInfo;
}

export interface ISetUserFailedAction {
    type: typeof SET_USER_FAILED;
    userInfo: ICurrentUserInfo;
    userMessage: IServerInfo;
}

export type TGetUserActions =
    | IGetUserAction
    | IGetUserSuccessAction
    | IGetUserFailedAction;

export type TSetUserActions =
    | ISetUserAction
    | ISetUserSuccessAction
    | ISetUserFailedAction;

export function setUserInfo(user: IUserAuthorization, accessToken: string) {
    return async function setUserInfoThunk(dispatch: Dispatch<TSetUserActions>) {
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
                userInfo: userInfo as ICurrentUserInfo,
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
    return async function getUserInfoThunk(dispatch: Dispatch<TGetUserActions>) {
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
                userInfo: userInfo as ICurrentUserInfo,
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
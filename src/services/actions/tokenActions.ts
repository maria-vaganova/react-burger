import {Dispatch} from "redux";
import {
    EMPTY_REFRESH_TOKEN,
    EMPTY_SERVER_INFO,
    EMPTY_TOKEN_INFO,
    REFRESH_TOKEN_STORAGE_TAG,
    GET_TOKEN,
    GET_TOKEN_FAILED,
    GET_TOKEN_SUCCESS,
    TOKEN_URL,
    AUTHORIZED_SERVER_INFO
} from "../../utils/data";
import {IServerInfo, ITokenInfo} from "../../utils/types";
import {request} from "../../utils/util";

export interface IGetAccessTokenAction {
    type: typeof GET_TOKEN;
}

export interface IGetAccessTokenSuccessAction {
    type: typeof GET_TOKEN_SUCCESS;
    tokenInfo: ITokenInfo;
    tokenMessage: IServerInfo;
}

export interface IGetAccessTokenFailedAction {
    type: typeof GET_TOKEN_FAILED;
    tokenInfo: ITokenInfo;
    tokenMessage: IServerInfo;
}

export type TGetAccessTokenActions =
    | IGetAccessTokenAction
    | IGetAccessTokenSuccessAction
    | IGetAccessTokenFailedAction;

export function getAccessToken(): (dispatch: Dispatch<TGetAccessTokenActions>) => Promise<void> {
    return async function getAccessTokenThunk(dispatch: Dispatch<TGetAccessTokenActions>): Promise<void> {
        dispatch({
            type: GET_TOKEN
        })
        try {
            const token: string = localStorage.getItem(REFRESH_TOKEN_STORAGE_TAG) || EMPTY_REFRESH_TOKEN;
            const tokenInfo: ITokenInfo = await request(TOKEN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            });
            dispatch({
                type: GET_TOKEN_SUCCESS,
                tokenInfo: tokenInfo as ITokenInfo,
                tokenMessage: AUTHORIZED_SERVER_INFO
            });
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, tokenInfo.refreshToken)
        } catch (error) {
            dispatch({
                type: GET_TOKEN_FAILED,
                tokenInfo: EMPTY_TOKEN_INFO,
                tokenMessage: error as IServerInfo || EMPTY_SERVER_INFO
            });
        }
    }
}
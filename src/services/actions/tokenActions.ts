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
import {ServerInfo, TokenInfo} from "../../utils/types";
import {request} from "../../utils/util";

export interface GetAccessTokenAction {
    type: typeof GET_TOKEN;
}

export interface GetAccessTokenSuccessAction {
    type: typeof GET_TOKEN_SUCCESS;
    tokenInfo: TokenInfo;
    tokenMessage: ServerInfo;
}

export interface GetAccessTokenFailedAction {
    type: typeof GET_TOKEN_FAILED;
    tokenInfo: TokenInfo;
    tokenMessage: ServerInfo;
}

export type GetAccessTokenActions =
    | GetAccessTokenAction
    | GetAccessTokenSuccessAction
    | GetAccessTokenFailedAction;

export function getAccessToken() {
    return async function getAccessTokenThunk(dispatch: Dispatch<GetAccessTokenActions>) {
        dispatch({
            type: GET_TOKEN
        })
        try {
            const token: string = localStorage.getItem(REFRESH_TOKEN_STORAGE_TAG) || EMPTY_REFRESH_TOKEN;
            const tokenInfo = await request(TOKEN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            });
            dispatch({
                type: GET_TOKEN_SUCCESS,
                tokenInfo: tokenInfo as TokenInfo,
                tokenMessage: AUTHORIZED_SERVER_INFO
            });
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, tokenInfo.refreshToken)
        } catch (error: any) {
            dispatch({
                type: GET_TOKEN_FAILED,
                tokenInfo: EMPTY_TOKEN_INFO,
                tokenMessage: error || EMPTY_SERVER_INFO
            });
        }
    }
}
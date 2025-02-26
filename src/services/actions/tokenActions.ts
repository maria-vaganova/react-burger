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
            const response = await fetch(TOKEN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            });
            if (!response.ok) {
                const info = await response.json() as ServerInfo;
                dispatch({
                    type: GET_TOKEN_FAILED,
                    tokenInfo: EMPTY_TOKEN_INFO,
                    tokenMessage: info
                });
                return;
            }
            const tokenInfo = await response.json() as TokenInfo;
            dispatch({
                type: GET_TOKEN_SUCCESS,
                tokenInfo: tokenInfo,
                tokenMessage: AUTHORIZED_SERVER_INFO
            });
            localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, tokenInfo.refreshToken)
        } catch (err) {
            dispatch({
                type: GET_TOKEN_FAILED,
                tokenInfo: EMPTY_TOKEN_INFO,
                tokenMessage: EMPTY_SERVER_INFO
            });
        }
    }
}
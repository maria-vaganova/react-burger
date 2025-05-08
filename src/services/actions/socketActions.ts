import {
    TWSActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START
} from "./wsActionTypes";
import {Dispatch} from "redux";
import {
    ALL_SOCKET_ID,
    ALL_WS,
    BASE_SOCKET_ID,
    BASE_WS,
} from "../../utils/data";

export function startAllSocket(token: string): (dispatch: Dispatch<TWSActions>) => Promise<void> {
    return async function startAllSocketThunk(dispatch: Dispatch<TWSActions>): Promise<void> {
        dispatch({
            type: WS_CONNECTION_START,
            payload: {url: ALL_WS, accessToken: token.replace("Bearer ", "")},
            socketId: ALL_SOCKET_ID
        })
    }
}

export function stopAllSocket(): (dispatch: Dispatch<TWSActions>) => Promise<void> {
    return async function stopAllSocketThunk(dispatch: Dispatch<TWSActions>): Promise<void> {
        dispatch({
            type: WS_CONNECTION_CLOSED,
            payload: {code: 1000},
            socketId: ALL_SOCKET_ID
        })
    }
}

export function startBaseSocket(token: string): (dispatch: Dispatch<TWSActions>) => Promise<void> {
    return async function startBaseSocketThunk(dispatch: Dispatch<TWSActions>): Promise<void> {
        dispatch({
            type: WS_CONNECTION_START,
            payload: {url: BASE_WS, accessToken: token.replace("Bearer ", "")},
            socketId: BASE_SOCKET_ID
        })
    }
}

export function stopBaseSocket(): (dispatch: Dispatch<TWSActions>) => Promise<void> {
    return async function stopBaseSocketThunk(dispatch: Dispatch<TWSActions>): Promise<void> {
        dispatch({
            type: WS_CONNECTION_CLOSED,
            payload: {code: 1000},
            socketId: BASE_SOCKET_ID
        })
    }
}

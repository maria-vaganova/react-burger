import {IFeedInfo} from "../../utils/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export interface IStartSocketAction {
    type: typeof WS_CONNECTION_START;
    payload: { url: string; accessToken: string };
    socketId: string;
}

export interface ISuccessSocketAction {
    type: typeof WS_CONNECTION_SUCCESS;
    payload: Event;
    socketId: string;
}

export interface IErrorSocketAction {
    type: typeof WS_CONNECTION_ERROR;
    payload: { error: string } | Event;
    socketId: string;
}

export interface IClosedSocketAction {
    type: typeof WS_CONNECTION_CLOSED;
    payload: { code: number } | Event;
    socketId: string;
}

export interface IGetMessageSocketAction {
    type: typeof WS_GET_MESSAGE;
    payload: IFeedInfo;
    socketId: string;
}

export interface ISendMessageSocketAction {
    type: typeof WS_SEND_MESSAGE;
    payload: any;
    socketId: string;
}

export type TWSActions =
    | IStartSocketAction
    | ISuccessSocketAction
    | IErrorSocketAction
    | IClosedSocketAction
    | IGetMessageSocketAction
    | ISendMessageSocketAction;
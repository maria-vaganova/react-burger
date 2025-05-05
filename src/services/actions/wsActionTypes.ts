export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type TWSActions =
    | { type: typeof WS_CONNECTION_START; payload: { url: string; accessToken: string }; socketId: string }
    | { type: typeof WS_CONNECTION_SUCCESS; payload: Event; socketId: string }
    | { type: typeof WS_CONNECTION_ERROR; payload: { error: string } | Event; socketId: string }
    | { type: typeof WS_CONNECTION_CLOSED; payload: Event; socketId: string }
    | { type: typeof WS_GET_MESSAGE; payload: string; socketId: string }
    | { type: typeof WS_SEND_MESSAGE; payload: any; socketId: string };
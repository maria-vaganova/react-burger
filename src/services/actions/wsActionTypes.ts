export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export type TWSActions =
    | { type: 'WS_CONNECTION_START'; payload: string }
    | { type: 'WS_CONNECTION_SUCCESS'; payload: any }
    | { type: 'WS_CONNECTION_ERROR'; payload: any }
    | { type: 'WS_CONNECTION_CLOSED'; payload: any }
    | { type: 'WS_GET_MESSAGE'; payload: string }
    | { type: 'WS_SEND_MESSAGE'; payload: any }
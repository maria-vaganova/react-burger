import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    TWSActions
} from '../actions/wsActionTypes';
import type {TWSState} from '../../utils/types';

const initialState: TWSState = {};

function socketReducer(state: TWSState = initialState, action: TWSActions) {
    const {socketId} = action;
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                [socketId]: {
                    wsConnected: false,
                    messages: [],
                    error: undefined,
                },
            };

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                [socketId]: {
                    ...state[socketId],
                    wsConnected: true,
                    error: undefined,
                },
            };
        case WS_CONNECTION_ERROR:
            let errorMessage = 'Ошибка соединения';
            if (typeof action.payload === 'object' && 'error' in action.payload) {
                errorMessage = action.payload.error;
            } else if (action.payload instanceof Event) {
                errorMessage = `Ошибка: ${action.payload.type}`;
            }
            return {
                ...state,
                [socketId]: {
                    ...state[socketId],
                    wsConnected: false,
                    error: errorMessage
                },
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                [socketId]: {
                    ...state[socketId],
                    wsConnected: false,
                    error: undefined,
                },
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                [socketId]: {
                    ...state[socketId],
                    messages: [...state[socketId].messages, action.payload],
                    // messages: [...state[socketId].messages, JSON.parse(action.payload as string)],
                    error: undefined,
                },
            };
        default:
            return state;
    }
}

export default socketReducer;
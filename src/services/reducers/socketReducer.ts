import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    TWSActions
} from '../actions/wsActionTypes';
import type {IMessage} from '../../utils/types';

type TWSState = {
    wsConnected: boolean;
    messages: IMessage[];

    error?: Event;
}

const initialState: TWSState = {
    wsConnected: false,
    messages: []
};

const wsReducer = (state: TWSState = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case 'WS_CONNECTION_ERROR':
            if (action.payload?.error) {
                return {
                    ...state,
                    error: action.payload.error,
                    wsConnected: false,
                };
            }
            return {
                ...state,
                error: 'Ошибка соединения',
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                messages: [...state.messages, JSON.parse(action.payload as string)]
            };
        default:
            return state;
    }
};

export default wsReducer;
import type {Middleware, MiddlewareAPI} from 'redux';
import type {SocketActions, SocketDispatch, RootState} from '../store';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE, WS_SEND_MESSAGE
} from "../actions/wsActionTypes";

export const socketMiddleware = (): Middleware => {
    const sockets: Record<string, WebSocket> = {}; // Храним сокеты по socketId
    const connections: Record<string, string> = {}; // Храним URL для каждого socketId

    return ((store: MiddlewareAPI<SocketDispatch, RootState>) => {
        return (next) => (action: SocketActions) => {
            const {dispatch, getState} = store;
            const {type, payload, socketId} = action;

            // Подключение
            if (type === WS_CONNECTION_START) {
                const {url, accessToken} = payload;
                const wsUrl = `${url}?token=${accessToken}`;
                connections[socketId] = url; // Сохраняем URL для socketId
                sockets[socketId] = new WebSocket(wsUrl);

                // Обработчики событий
                sockets[socketId].onopen = (event) => {
                    dispatch({type: WS_CONNECTION_SUCCESS, payload: event, socketId});
                };

                sockets[socketId].onerror = (event) => {
                    dispatch({type: WS_CONNECTION_ERROR, payload: event, socketId});
                };

                sockets[socketId].onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.message === 'Invalid or missing token') {
                        dispatch({
                            type: WS_CONNECTION_ERROR,
                            payload: {error: data.message},
                            socketId,
                        });
                        sockets[socketId].close();
                        return;
                    }
                    dispatch({type: WS_GET_MESSAGE, payload: data, socketId});
                };

                sockets[socketId].onclose = (event) => {
                    dispatch({type: WS_CONNECTION_CLOSED, payload: event, socketId});
                };
            }

            // Отправка сообщений
            if (type === WS_SEND_MESSAGE) {
                const message = payload;
                const socket = sockets[socketId];
                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(message));
                }
            }

            return next(action);
        };
    }) as Middleware;
};
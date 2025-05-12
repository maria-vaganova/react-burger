import socketReducer from '../reducers/socketReducer';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    IStartSocketAction,
    ISuccessSocketAction,
    IErrorSocketAction,
    IClosedSocketAction,
    IGetMessageSocketAction,
    TWSActions
} from '../actions/wsActionTypes';
import {IFeedInfo, IOrderFeedInfo, TWSState} from '../../utils/types';

// === Mock data ===
const mockSocketId = 'orders_all';
const mockUrl = 'wss://example.com/websocket';
const mockToken = 'mock-access-token';

const mockOrder: IOrderFeedInfo = {
    _id: 'abc123',
    name: 'Burger',
    status: 'done',
    number: 12345,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:05:00Z',
    ingredients: ['ingredient_id_1', 'ingredient_id_2']
};

const mockFeedInfo: IFeedInfo = {
    success: true,
    orders: [mockOrder],
    total: 100,
    totalToday: 10
};

describe('socket reducer', () => {
    const initialState = {} as TWSState;

    it('should return the initial state', () => {
        expect(socketReducer(undefined, {} as TWSActions)).toEqual(initialState);
    });

    it('should handle WS_CONNECTION_START', () => {
        const action: IStartSocketAction = {
            type: WS_CONNECTION_START,
            payload: {
                url: mockUrl,
                accessToken: mockToken
            },
            socketId: mockSocketId
        };
        const expectedState = {
            [mockSocketId]: {
                wsConnected: false,
                messages: [],
                error: undefined
            }
        };
        expect(socketReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        const previousState = {
            [mockSocketId]: {
                wsConnected: false,
                messages: [],
                error: 'Connection failed'
            }
        };
        const action: ISuccessSocketAction = {
            type: WS_CONNECTION_SUCCESS,
            payload: new Event('open'),
            socketId: mockSocketId
        };
        const expectedState = {
            [mockSocketId]: {
                wsConnected: true,
                messages: [],
                error: undefined
            }
        };
        expect(socketReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle WS_CONNECTION_ERROR with object payload', () => {
        const previousState = {
            [mockSocketId]: {
                wsConnected: false,
                messages: [],
                error: undefined
            }
        };
        const action: IErrorSocketAction = {
            type: WS_CONNECTION_ERROR,
            payload: {
                error: 'Connection failed'
            },
            socketId: mockSocketId
        };
        const expectedState = {
            [mockSocketId]: {
                wsConnected: false,
                messages: [],
                error: 'Connection failed'
            }
        };
        expect(socketReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle WS_CONNECTION_ERROR with Event payload', () => {
        const previousState = {
            [mockSocketId]: {
                wsConnected: false,
                messages: [],
                error: undefined
            }
        };
        const event = new Event('error');
        const action: IErrorSocketAction = {
            type: WS_CONNECTION_ERROR,
            payload: event,
            socketId: mockSocketId
        };
        const expectedState = {
            [mockSocketId]: {
                wsConnected: false,
                messages: [],
                error: 'Ошибка: error'
            }
        };
        expect(socketReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        const previousState = {
            [mockSocketId]: {
                wsConnected: true,
                messages: [],
                error: undefined
            }
        };
        const action: IClosedSocketAction = {
            type: WS_CONNECTION_CLOSED,
            payload: new Event('close'),
            socketId: mockSocketId
        };
        const expectedState = {
            [mockSocketId]: {
                wsConnected: false,
                messages: [],
                error: undefined
            }
        };
        expect(socketReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle WS_GET_MESSAGE action and append message to messages array', () => {
        const previousState = {
            [mockSocketId]: {
                wsConnected: true,
                messages: [],
                error: undefined
            }
        };
        const action: IGetMessageSocketAction = {
            type: WS_GET_MESSAGE,
            payload: mockFeedInfo,
            socketId: mockSocketId
        };
        const expectedState = {
            [mockSocketId]: {
                wsConnected: true,
                messages: [mockFeedInfo],
                error: undefined
            }
        };
        expect(socketReducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle multiple WS_GET_MESSAGE actions correctly', () => {
        const previousState = {
            [mockSocketId]: {
                wsConnected: true,
                messages: [mockFeedInfo],
                error: undefined
            }
        };
        const anotherMockFeedInfo: IFeedInfo = {
            success: true,
            orders: [
                {
                    ...mockOrder,
                    name: 'Another Burger'
                }
            ],
            total: 101,
            totalToday: 11
        };
        const action: IGetMessageSocketAction = {
            type: WS_GET_MESSAGE,
            payload: anotherMockFeedInfo,
            socketId: mockSocketId
        };
        const expectedState = {
            [mockSocketId]: {
                wsConnected: true,
                messages: [mockFeedInfo, anotherMockFeedInfo],
                error: undefined
            }
        };
        expect(socketReducer(previousState, action)).toEqual(expectedState);
    });
});
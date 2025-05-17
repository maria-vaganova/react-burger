import orderReducer from '../reducers/orderReducer';
import {
    IGetOrderNumberAction,
    IGetOrderNumberSuccessAction,
    IGetOrderNumberFailedAction,
    IGetOrderByNumberAction,
    IGetOrderByNumberSuccessAction,
    IGetOrderByNumberFailedAction,
    TOrderActions
} from '../actions/orderActions';
import {
    EMPTY_ORDER_INFO,
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_SUCCESS
} from '../../utils/data';
import {IOrderInfo, IFeedInfo} from '../../utils/types';

describe('order reducer', () => {
    const initialState = {
        request: false,
        failed: false,
        orderInfo: EMPTY_ORDER_INFO
    };

    it('should return the initial state', () => {
        expect(orderReducer(undefined, {} as TOrderActions)).toEqual(initialState);
    });

    it('should handle GET_ORDER_NUMBER', () => {
        const action: IGetOrderNumberAction = {
            type: GET_ORDER_NUMBER
        };
        const expectedState = {
            request: true,
            failed: false,
            orderInfo: EMPTY_ORDER_INFO
        };
        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ORDER_NUMBER_SUCCESS action with order info', () => {
        const mockOrderInfo: IOrderInfo = {
            name: 'Burger',
            success: true,
            order: {
                number: 12345
            }
        };
        const action: IGetOrderNumberSuccessAction = {
            type: GET_ORDER_NUMBER_SUCCESS,
            orderInfo: mockOrderInfo
        };
        const expectedState = {
            request: false,
            failed: false,
            orderInfo: mockOrderInfo
        };
        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ORDER_NUMBER_FAILED', () => {
        const action: IGetOrderNumberFailedAction = {
            type: GET_ORDER_NUMBER_FAILED
        };
        const expectedState = {
            request: false,
            failed: true,
            orderInfo: EMPTY_ORDER_INFO
        };
        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ORDER action', () => {
        const action: IGetOrderByNumberAction = {
            type: GET_ORDER
        };
        const expectedState = {
            request: true,
            failed: false,
            orderInfo: EMPTY_ORDER_INFO
        };
        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ORDER_SUCCESS action with feed info', () => {
        const mockFeedInfo: IFeedInfo = {
            success: true,
            orders: [
                {
                    ingredients: ['1', '2', '3'],
                    _id: 'abc123',
                    name: 'Tasty Burger',
                    status: 'done',
                    number: 12345,
                    createdAt: '2024-01-01T00:00:00Z',
                    updatedAt: '2024-01-01T00:05:00Z'
                }
            ],
            total: 100,
            totalToday: 10
        };
        const action: IGetOrderByNumberSuccessAction = {
            type: GET_ORDER_SUCCESS,
            orderInfo: mockFeedInfo
        };
        const expectedState = {
            request: false,
            failed: false,
            orderInfo: mockFeedInfo
        };
        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ORDER_FAILED action', () => {
        const action: IGetOrderByNumberFailedAction = {
            type: GET_ORDER_FAILED
        };
        const expectedState = {
            request: false,
            failed: true,
            orderInfo: EMPTY_ORDER_INFO
        };
        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });
});

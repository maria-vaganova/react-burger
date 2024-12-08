import {OrderState} from "../../utils/types";
import {EMPTY_ORDER_INFO, GET_ORDER_NUMBER, GET_ORDER_NUMBER_FAILED, GET_ORDER_NUMBER_SUCCESS} from "../../utils/data";
import {Reducer} from "redux";

const initialState: OrderState = {
    orderRequest: false,
    orderFailed: false,
    orderInfo: EMPTY_ORDER_INFO
}

const orderReducer: Reducer<OrderState, { type: string; orderInfo?: any }> = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderInfo: action.orderInfo,
                orderRequest: false
            };
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        default: {
            return state;
        }
    }
};

export default orderReducer;
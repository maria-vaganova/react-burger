import {IOrderState} from "../../utils/types";
import {
    EMPTY_ORDER_INFO,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_SUCCESS
} from "../../utils/data";
import {Reducer} from "redux";
import {IGetOrderNumberSuccessAction, TOrderActions} from "../actions/orderActions";

const initialState: IOrderState = {
    orderRequest: false,
    orderFailed: false,
    orderInfo: EMPTY_ORDER_INFO
}

function isGetOrderNumberSuccessAction(action: TOrderActions): action is IGetOrderNumberSuccessAction {
    return action.type === GET_ORDER_NUMBER_SUCCESS;
}

const orderReducer: Reducer<IOrderState, {
    type: string;
    orderInfo?: any
}> = (state: IOrderState = initialState, action: TOrderActions): IOrderState => {
    switch (action.type) {
        case GET_ORDER_NUMBER: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            if (!isGetOrderNumberSuccessAction(action)) {
                throw new Error("Invalid action type");
            }
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
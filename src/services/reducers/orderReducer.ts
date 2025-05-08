import {IOrderInfo, IOrderState} from "../../utils/types";
import {
    EMPTY_ORDER_INFO,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED
} from "../../utils/data";
import {Reducer} from "redux";
import {IGetOrderByNumberSuccessAction, IGetOrderNumberSuccessAction, TOrderActions} from "../actions/orderActions";

const initialState: IOrderState = {
    request: false,
    failed: false,
    orderInfo: EMPTY_ORDER_INFO
}

function isGetOrderNumberSuccessAction(action: TOrderActions): action is IGetOrderNumberSuccessAction {
    return action.type === GET_ORDER_NUMBER_SUCCESS;
}
function isGetOrderByNumberSuccessAction(action: TOrderActions): action is IGetOrderByNumberSuccessAction {
    return action.type === GET_ORDER_SUCCESS;
}

const orderReducer: Reducer<IOrderState, {
    type: string;
    orderInfo?: IOrderInfo;
}> = (state: IOrderState = initialState, action: TOrderActions): IOrderState => {
    switch (action.type) {
        case GET_ORDER_NUMBER: {
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            if (!isGetOrderNumberSuccessAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                orderInfo: action.orderInfo,
                request: false
            };
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                failed: true,
                request: false
            };
        }
        case GET_ORDER: {
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            if (!isGetOrderByNumberSuccessAction(action)) {
                throw new Error("Invalid action type");
            }
            return {
                ...state,
                orderInfo: action.orderInfo,
                request: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                failed: true,
                request: false
            };
        }
        default: {
            return state;
        }
    }
};

export default orderReducer;
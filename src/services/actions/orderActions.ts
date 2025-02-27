import {
    EMPTY_ORDER_INFO,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_SUCCESS,
    ORDER_POST_URL
} from "../../utils/data";
import {OrderInfo} from "../../utils/types";
import {Dispatch} from "redux";
import {request} from "../../utils/util";

export interface GetOrderNumberAction {
    type: typeof GET_ORDER_NUMBER;
}

export interface GetOrderNumberSuccessAction {
    type: typeof GET_ORDER_NUMBER_SUCCESS;
    orderInfo: OrderInfo;
}

export interface GetOrderNumberFailedAction {
    type: typeof GET_ORDER_NUMBER_FAILED;
}

export type OrderActions =
    | GetOrderNumberAction
    | GetOrderNumberSuccessAction
    | GetOrderNumberFailedAction;

export function getOrderNumber(ingredients: string[]) {
    return async function getOrderNumberThunk(dispatch: Dispatch<OrderActions>) {
        dispatch({
            type: GET_ORDER_NUMBER
        })
        try {
            const orderInfo = await request(ORDER_POST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients})
            });
            dispatch({
                type: GET_ORDER_NUMBER_SUCCESS,
                orderInfo: orderInfo as OrderInfo
            });
        } catch (err) {
            dispatch({
                type: GET_ORDER_NUMBER_FAILED
            });
        }
    }
}

export function clearOrderNumber() {
    return async function clearOrderNumberThunk(dispatch: Dispatch<OrderActions>) {
        dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            orderInfo: EMPTY_ORDER_INFO
        })
    }
}
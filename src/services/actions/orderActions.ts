import {GET_ORDER_NUMBER, GET_ORDER_NUMBER_FAILED, GET_ORDER_NUMBER_SUCCESS, ORDER_POST_URL} from "../../utils/data";
import {OrderInfo} from "../../utils/types";
import {Dispatch} from "redux";

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
            const response = await fetch(ORDER_POST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients})
            });

            if (response.ok) {
                const orderInfo = await response.json() as OrderInfo;
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    orderInfo
                });
            } else {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED
                });
            }
        } catch (err) {
            dispatch({
                type: GET_ORDER_NUMBER_FAILED
            });
        }
    }
}
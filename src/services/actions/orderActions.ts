import {
    EMPTY_ORDER_INFO,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_SUCCESS,
    ORDER_POST_URL
} from "../../utils/data";
import {IOrderInfo} from "../../utils/types";
import {Dispatch} from "redux";
import {request} from "../../utils/util";

export interface IGetOrderNumberAction {
    type: typeof GET_ORDER_NUMBER;
}

export interface IGetOrderNumberSuccessAction {
    type: typeof GET_ORDER_NUMBER_SUCCESS;
    orderInfo: IOrderInfo;
}

export interface IGetOrderNumberFailedAction {
    type: typeof GET_ORDER_NUMBER_FAILED;
}

export type TOrderActions =
    | IGetOrderNumberAction
    | IGetOrderNumberSuccessAction
    | IGetOrderNumberFailedAction;

export function getOrderNumber(ingredients: string[]): (dispatch: Dispatch<TOrderActions>) => Promise<void> {
    return async function getOrderNumberThunk(dispatch: Dispatch<TOrderActions>): Promise<void> {
        dispatch({
            type: GET_ORDER_NUMBER
        })
        try {
            const orderInfo: IOrderInfo = await request(ORDER_POST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ingredients})
            });
            dispatch({
                type: GET_ORDER_NUMBER_SUCCESS,
                orderInfo: orderInfo as IOrderInfo
            });
        } catch (err) {
            dispatch({
                type: GET_ORDER_NUMBER_FAILED
            });
        }
    }
}

export function clearOrderNumber(): (dispatch: Dispatch<TOrderActions>) => Promise<void> {
    return async function clearOrderNumberThunk(dispatch: Dispatch<TOrderActions>): Promise<void> {
        dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            orderInfo: EMPTY_ORDER_INFO
        })
    }
}
import {
    EMPTY_ORDER_INFO,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    ORDER_POST_URL
} from "../../utils/data";
import {IFeedInfo, IOrderInfo} from "../../utils/types";
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

export interface IGetOrderByNumberAction {
    type: typeof GET_ORDER;
}

export interface IGetOrderByNumberSuccessAction {
    type: typeof GET_ORDER_SUCCESS;
    orderInfo: IFeedInfo;
}

export interface IGetOrderByNumberFailedAction {
    type: typeof GET_ORDER_FAILED;
}

export type TOrderActions =
    | IGetOrderNumberAction
    | IGetOrderNumberSuccessAction
    | IGetOrderNumberFailedAction
    | IGetOrderByNumberAction
    | IGetOrderByNumberSuccessAction
    | IGetOrderByNumberFailedAction;

export function getOrderNumber(ingredients: string[], accessToken?: string): (dispatch: Dispatch<TOrderActions>) => Promise<void> {
    return async function getOrderNumberThunk(dispatch: Dispatch<TOrderActions>): Promise<void> {
        dispatch({
            type: GET_ORDER_NUMBER
        })
        try {
            let orderInfo: IOrderInfo;
            if (accessToken) {
                orderInfo = await request(ORDER_POST_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${accessToken}`,
                    },
                    body: JSON.stringify({ingredients})
                });
            } else {
                orderInfo = await request(ORDER_POST_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ingredients})
                });
            }
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

export function getOrderByNumber(id: string): (dispatch: Dispatch<TOrderActions>) => Promise<void> {
    return async function getOrderByNumberThunk(dispatch: Dispatch<TOrderActions>): Promise<void> {
        dispatch({
            type: GET_ORDER
        })
        try {
            const orderInfo: IFeedInfo = await request(`${ORDER_POST_URL}/${encodeURIComponent(id)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            dispatch({
                type: GET_ORDER_SUCCESS,
                orderInfo: orderInfo as IFeedInfo
            });
        } catch (err) {
            dispatch({
                type: GET_ORDER_FAILED
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
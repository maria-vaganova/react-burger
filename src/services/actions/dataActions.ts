import {DATA_URL, GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS} from "../../utils/data";
import {IIngredient} from "../../utils/types";
import {Dispatch} from "redux";
import {request} from "../../utils/util";

export interface IGetDataAction {
    type: typeof GET_DATA;
}

export interface IGetDataSuccessAction {
    type: typeof GET_DATA_SUCCESS;
    dataInfo: IIngredient[];
}

export interface IGetODataFailedAction {
    type: typeof GET_DATA_FAILED;
}

export type TDataActions =
    | IGetDataAction
    | IGetDataSuccessAction
    | IGetODataFailedAction;

export function getData() {
    return async function getDataThunk(dispatch: Dispatch<TDataActions>) {
        dispatch({
            type: GET_DATA
        })
        try {
            const dataInfo = await request(DATA_URL);
            dispatch({
                type: GET_DATA_SUCCESS,
                dataInfo: dataInfo.data as IIngredient[]
            });
        } catch (err) {
            dispatch({
                type: GET_DATA_FAILED
            });
        }
    }
}
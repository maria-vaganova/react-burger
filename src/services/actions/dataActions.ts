import {DATA_URL, GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS} from "../../utils/data";
import {Ingredient} from "../../utils/types";
import {Dispatch} from "redux";
import {request} from "../../utils/util";

export interface GetDataAction {
    type: typeof GET_DATA;
}

export interface GetDataSuccessAction {
    type: typeof GET_DATA_SUCCESS;
    dataInfo: Ingredient[];
}

export interface GetODataFailedAction {
    type: typeof GET_DATA_FAILED;
}

export type DataActions =
    | GetDataAction
    | GetDataSuccessAction
    | GetODataFailedAction;

export function getData() {
    return async function getDataThunk(dispatch: Dispatch<DataActions>) {
        dispatch({
            type: GET_DATA
        })
        try {
            const dataInfo = await request(DATA_URL);
            dispatch({
                type: GET_DATA_SUCCESS,
                dataInfo: dataInfo as Ingredient[]
            });
        } catch (err) {
            dispatch({
                type: GET_DATA_FAILED
            });
        }
    }
}
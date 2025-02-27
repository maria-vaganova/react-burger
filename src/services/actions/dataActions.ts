import {DATA_URL, GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS} from "../../utils/data";
import {Ingredient} from "../../utils/types";
import {Dispatch} from "redux";

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
            const response = await fetch(DATA_URL);
            if (response.ok) {
                const dataInfo = (await response.json()).data as Ingredient[];
                dispatch({
                    type: GET_DATA_SUCCESS,
                    dataInfo
                });
            } else {
                dispatch({
                    type: GET_DATA_FAILED
                });
            }
        } catch (err) {
            dispatch({
                type: GET_DATA_FAILED
            });
        }
    }
}
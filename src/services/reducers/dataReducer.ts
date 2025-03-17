import {IDataState} from "../../utils/types";
import {Reducer} from "redux";
import {GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS} from "../../utils/data";
import {TDataActions, IGetDataSuccessAction} from "../actions/dataActions";

const initialState: IDataState = {
    dataRequest: false,
    dataFailed: false,
    dataInfo: []
}

function isGetDataSuccessAction(action: TDataActions): action is IGetDataSuccessAction {
    return action.type === GET_DATA_SUCCESS;
}

const dataReducer: Reducer<IDataState, TDataActions> = (state: IDataState = initialState, action: TDataActions): IDataState => {
    switch (action.type) {
        case GET_DATA: {
            return {
                ...state,
                dataRequest: true,
                dataFailed: false,
            };
        }
        case GET_DATA_SUCCESS: {
            if (!isGetDataSuccessAction(action)) {
                throw new Error("Invalid action type");
            }

            return {
                ...state,
                dataInfo: action.dataInfo,
                dataRequest: false
            };
        }
        case GET_DATA_FAILED: {
            return {
                ...state,
                dataFailed: true,
                dataRequest: false
            };
        }
        default: {
            return state;
        }
    }
};

export default dataReducer;
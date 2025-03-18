import {IDataState} from "../../utils/types";
import {Reducer} from "redux";
import {GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS} from "../../utils/data";
import {TDataActions, IGetDataSuccessAction} from "../actions/dataActions";

const initialState: IDataState = {
    request: false,
    failed: false,
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
                request: true,
                failed: false,
            };
        }
        case GET_DATA_SUCCESS: {
            if (!isGetDataSuccessAction(action)) {
                throw new Error("Invalid action type");
            }

            return {
                ...state,
                dataInfo: action.dataInfo,
                request: false
            };
        }
        case GET_DATA_FAILED: {
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

export default dataReducer;
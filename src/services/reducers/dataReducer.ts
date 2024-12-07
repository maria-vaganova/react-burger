import {DataState} from "../../utils/types";
import {Reducer} from "redux";
import {GET_DATA, GET_DATA_FAILED, GET_DATA_SUCCESS} from "../../utils/data";

const initialState: DataState = {
    dataRequest: false,
    dataFailed: false,
    dataInfo: []
}

const dataReducer: Reducer<DataState, { type: string; dataInfo?: any }> = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA: {
            return {
                ...state,
                dataRequest: true,
                dataFailed: false,
            };
        }
        case GET_DATA_SUCCESS: {
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
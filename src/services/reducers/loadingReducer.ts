import {LOADING_START, LOADING_STOP} from "../../utils/data";
import {TLoadingActions} from "../actions/loadingActions";
import {ILoadingState} from "../../utils/types";

const initialState: ILoadingState = {
    isLoading: true
};

function loadingReducer(state: ILoadingState = initialState, action: TLoadingActions): ILoadingState {
    switch (action.type) {
        case LOADING_START:
            return {...state, isLoading: true};
        case LOADING_STOP:
            return {...state, isLoading: false};
        default:
            return state;
    }
};

export default loadingReducer;
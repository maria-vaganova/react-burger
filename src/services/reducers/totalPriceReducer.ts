import {INCREMENT, DECREMENT, RESET} from "../../utils/data";
import {TotalPriceActionTypes} from "../actions/totalPriceActions";
import {TotalPriceState} from "../../utils/types";

const initialState: TotalPriceState = {count: 0};

function totalPriceReducer(state = initialState, action: TotalPriceActionTypes) {
    switch (action.type) {
        case INCREMENT: {
            return {...state, count: state.count + action.totalPrice};
        }
        case DECREMENT: {
            return {...state, count: state.count - action.totalPrice};
        }
        case RESET: {
            return {...state, count: 0};
        }
        default: {
            return state;
        }
    }
}

export default totalPriceReducer;
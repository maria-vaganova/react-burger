import {INCREMENT, DECREMENT, RESET} from "../../utils/data";
import {TTotalPriceActions} from "../actions/totalPriceActions";
import {ITotalPriceState} from "../../utils/types";

const initialState: ITotalPriceState = {count: 0};

function totalPriceReducer(state = initialState, action: TTotalPriceActions) {
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
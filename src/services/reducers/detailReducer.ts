import {IIngredientDetailState} from "../../utils/types";
import {EMPTY_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS} from "../../utils/data";
import {TIngredientDetailActions} from "../actions/detailActions";

const initialState: IIngredientDetailState = {
    ingredientDetails: EMPTY_INGREDIENT_DETAILS
};

function detailReducer (state: IIngredientDetailState = initialState, action: TIngredientDetailActions): IIngredientDetailState {
    switch (action.type) {
        case SHOW_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: action.ingredientDetailInfo,
            }
        }
        default: {
            return state;
        }
    }
};

export default detailReducer;

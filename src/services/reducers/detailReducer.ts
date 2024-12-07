import {IngredientDetailState} from "../../utils/types";
import {EMPTY_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS} from "../../utils/data";
import {IngredientDetailActionTypes} from "../actions/detailActions";

const initialState: IngredientDetailState = {
    ingredientDetails: EMPTY_INGREDIENT_DETAILS
};

function detailReducer (state = initialState, action: IngredientDetailActionTypes) {
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

import {CartState} from "../../utils/types";
import {ADD_INGREDIENT, DISCARD_INGREDIENT, MOVE_ITEMS} from "../../utils/data";
import {CartActionTypes} from "../actions/cartActions";

const initialState: CartState = {
    cartItems: []
};

function cartReducer (state = initialState, action: CartActionTypes) {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                cartItems: action.cartItems,
            }
        }
        case DISCARD_INGREDIENT: {
            return {
                ...state,
                cartItems: action.cartItems,
            }
        }
        case MOVE_ITEMS: {
            return {
                ...state,
                cartItems: action.cartItems,
            }
        }
        default: {
            return state;
        }
    }
};

export default cartReducer;

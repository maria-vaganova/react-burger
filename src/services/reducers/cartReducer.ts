import {CartState} from "../../utils/types";
import {ADD_INGREDIENT, BUN_TYPE, DISCARD_INGREDIENT, MOVE_ITEMS} from "../../utils/data";
import {CartActionTypes} from "../actions/cartActions";

const initialState: CartState = {
    cartItems: []
};

function cartReducer(state = initialState, action: CartActionTypes) {
    switch (action.type) {
        case ADD_INGREDIENT: {
            const newCart = [...state.cartItems];
            let displayOrder: number;

            if (newCart.length === 0) {
                displayOrder = 0;
            } else {
                const lastItem = newCart[newCart.length - 1];
                displayOrder = lastItem.displayOrder + 1;
            }

            if (action.cartItems[0].type === BUN_TYPE) {
                const bunIndex = newCart.findIndex(item => item.type === BUN_TYPE);
                if (bunIndex !== -1) {
                    newCart.splice(bunIndex, 1);
                }
                displayOrder = 0;
            }

            newCart.push({
                id: action.cartItems[0].id,
                type: action.cartItems[0].type,
                displayOrder,
                key: action.cartItems[0].key
            });
            return {...state, cartItems: newCart};
        }
        case DISCARD_INGREDIENT: {
            const newCart = state.cartItems.filter(item => item.displayOrder !== action.displayOrder)
                .map(item => {
                    return item.displayOrder > action.displayOrder
                        ? {...item, displayOrder: item.displayOrder - 1}
                        : item;
                });
            return {...state, cartItems: newCart};
        }
        case MOVE_ITEMS: {
            const newCart = [...state.cartItems];
            const [movedItem] = newCart.splice(action.fromIndex, 1);
            newCart.splice(action.toIndex, 0, movedItem);
            return {...state, cartItems: newCart};
        }
        default: {
            return state;
        }
    }
};

export default cartReducer;

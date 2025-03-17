import {ICartItem, ICartState} from "../../utils/types";
import {ADD_INGREDIENT, BUN_TYPE, DISCARD_INGREDIENT, MOVE_ITEMS} from "../../utils/data";
import {IAddIngredientAction, TCartActions, IDiscardIngredientAction, IMoveItemsAction} from "../actions/cartActions";

const initialState: ICartState = {
    cartItems: []
};

function isAddIngredientAction(action: TCartActions): action is IAddIngredientAction {
    return action.type === ADD_INGREDIENT;
}

function isDiscardIngredientAction(action: TCartActions): action is IDiscardIngredientAction {
    return action.type === DISCARD_INGREDIENT;
}

function isMoveItemsAction(action: TCartActions): action is IMoveItemsAction {
    return action.type === MOVE_ITEMS;
}

function cartReducer(state: ICartState = initialState, action: TCartActions): ICartState {
    switch (action.type) {
        case ADD_INGREDIENT: {
            if (!isAddIngredientAction(action)) {
                throw new Error("Invalid action type");
            }

            const newCart: ICartItem[] = [...state.cartItems];
            let displayOrder: number;

            if (newCart.length === 0) {
                displayOrder = 0;
            } else {
                const lastItem: ICartItem = newCart[newCart.length - 1];
                displayOrder = lastItem.displayOrder + 1;
            }

            if (action.cartItems[0].type === BUN_TYPE) {
                const bunIndex: number = newCart.findIndex((item: ICartItem): boolean => item.type === BUN_TYPE);
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
            if (!isDiscardIngredientAction(action)) {
                throw new Error("Invalid action type");
            }

            const newCart: ICartItem[] = state.cartItems
                .filter((item: ICartItem): boolean => item.displayOrder !== action.displayOrder)
                .map((item: ICartItem): ICartItem => {
                    return item.displayOrder > action.displayOrder
                        ? {...item, displayOrder: item.displayOrder - 1}
                        : item;
                });
            return {...state, cartItems: newCart};
        }

        case MOVE_ITEMS: {
            if (!isMoveItemsAction(action)) {
                throw new Error("Invalid action type");
            }

            const newCart: ICartItem[] = [...state.cartItems];
            const [movedItem] = newCart.splice(action.fromIndex, 1);
            newCart.splice(action.toIndex, 0, movedItem);
            return {...state, cartItems: newCart};
        }
        default: {
            return state;
        }
    }
}

export default cartReducer;

import {ADD_INGREDIENT, DISCARD_INGREDIENT, MOVE_ITEMS} from "../../utils/data";
import {CartItem} from "../../utils/types";

export interface AddIngredientAction {
    type: typeof ADD_INGREDIENT;
    cartItems: CartItem[];
}

export interface DiscardIngredientAction {
    type: typeof DISCARD_INGREDIENT;
    displayOrder: number;
}

export interface MoveItemsAction {
    type: typeof MOVE_ITEMS;
    fromIndex: number;
    toIndex: number;
}

export type CartActionTypes = AddIngredientAction | DiscardIngredientAction | MoveItemsAction;

export function addIngredientToCart(id: string, type: string, key: string): AddIngredientAction {
    return {
        type: ADD_INGREDIENT,
        cartItems: [{id: id, type: type, displayOrder: 0, key: key}]
    };
}

export function discardIngredientFromCart(displayOrder: number): DiscardIngredientAction {
    return {
        type: DISCARD_INGREDIENT,
        displayOrder: displayOrder
    };
}

export function moveItems(fromIndex: number, toIndex: number): MoveItemsAction {
    return {
        type: MOVE_ITEMS,
        fromIndex: fromIndex,
        toIndex: toIndex
    };
}
import {ADD_INGREDIENT, DISCARD_INGREDIENT, MOVE_ITEMS} from "../../utils/data";
import {ICartItem} from "../../utils/types";

export interface IAddIngredientAction {
    type: typeof ADD_INGREDIENT;
    cartItems: ICartItem[];
}

export interface IDiscardIngredientAction {
    type: typeof DISCARD_INGREDIENT;
    displayOrder: number;
}

export interface IMoveItemsAction {
    type: typeof MOVE_ITEMS;
    fromIndex: number;
    toIndex: number;
}

export type TCartActions = IAddIngredientAction | IDiscardIngredientAction | IMoveItemsAction;

export function addIngredientToCart(id: string, type: string, key: string): IAddIngredientAction {
    return {
        type: ADD_INGREDIENT,
        cartItems: [{id: id, type: type, displayOrder: 0, key: key}]
    };
}

export function discardIngredientFromCart(displayOrder: number): IDiscardIngredientAction {
    return {
        type: DISCARD_INGREDIENT,
        displayOrder: displayOrder
    };
}

export function moveItems(fromIndex: number, toIndex: number): IMoveItemsAction {
    return {
        type: MOVE_ITEMS,
        fromIndex: fromIndex,
        toIndex: toIndex
    };
}
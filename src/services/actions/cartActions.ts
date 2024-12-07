import {ADD_INGREDIENT, BUN_TYPE, DISCARD_INGREDIENT, MOVE_ITEMS} from "../../utils/data";
import {CartItem} from "../../utils/types";

export interface AddIngredientAction {
    type: typeof ADD_INGREDIENT;
    cartItems: CartItem[];
}
export interface DiscardIngredientAction {
    type: typeof DISCARD_INGREDIENT;
    cartItems: CartItem[];
}
export interface MoveItemsAction {
    type: typeof MOVE_ITEMS;
    cartItems: CartItem[];
}

export type CartActionTypes = AddIngredientAction | DiscardIngredientAction | MoveItemsAction;

export function addIngredientToCart(
    cart: CartItem[],
    id: string,
    type: string): AddIngredientAction {
    if (id !== "0") {
        let displayOrder: number = 0;
        if (cart === undefined || cart.length === 0) {
            return {
                type: ADD_INGREDIENT,
                cartItems: [{id: id, type: type, displayOrder: displayOrder}]
            }
        } else {
            let newCart = [...cart];
            const dOrder = newCart.pop()?.displayOrder;
            displayOrder = dOrder !== undefined ? dOrder + 1 : 0;
            if (displayOrder === 0 && type !== BUN_TYPE) displayOrder = 1;
            newCart = [...cart];
            if (type === BUN_TYPE) {
                const bun = cart.find(elem => elem.type === BUN_TYPE);
                if (bun !== undefined) {
                    newCart = newCart.filter(elem => elem.id !== bun.id);
                }
                displayOrder = 0;
            }
            newCart.push({id: id, type: type, displayOrder: displayOrder});
            return {
                type: ADD_INGREDIENT,
                cartItems: newCart
            }
        }
    }
    return {
        type: ADD_INGREDIENT,
        cartItems: cart || []
    }
}

export function discardIngredientFromCart(
    cart: CartItem[],
    displayOrder: number): DiscardIngredientAction {
    if (displayOrder) {
        let index = -1;
        let newCart = cart;
        index = cart.findIndex(elem => elem.displayOrder === displayOrder);
        if (index !== -1) {
            newCart = cart.filter(elem => elem.displayOrder !== displayOrder);
        }
        newCart.map(elem => {
            if (elem.displayOrder && elem.displayOrder > displayOrder) {
                return {id: elem.id, type: elem.type, displayOrder: elem.displayOrder - 1} as CartItem;
            } else return elem;
        })
        return {
            type: DISCARD_INGREDIENT,
            cartItems: newCart
        }
    }
    return {
        type: DISCARD_INGREDIENT,
        cartItems: cart || []
    }
}

export function moveItems(
    cart: CartItem[],
    fromIndex: number,
    toIndex: number
): MoveItemsAction {
    const newCart = [...cart];
    const [movedItem] = newCart.splice(fromIndex, 1);
    newCart.splice(toIndex, 0, movedItem);
    return {
        type: MOVE_ITEMS,
        cartItems: newCart
    }
}
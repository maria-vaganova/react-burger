import {INCREMENT, DECREMENT, RESET} from "../../utils/data";
import {Ingredient} from "../../utils/types";

export interface IncrementAction {
    type: typeof INCREMENT;
    totalPrice: number;
}

export interface DecrementAction {
    type: typeof DECREMENT;
    totalPrice: number;
}

export interface ResetAction {
    type: typeof RESET;
}

export type TotalPriceActionTypes = IncrementAction | DecrementAction | ResetAction;


export function increment(ingredient: Ingredient): IncrementAction {
    return {
        type: INCREMENT,
        totalPrice: ingredient.price
    };
}

export function decrement(ingredient: Ingredient): DecrementAction {
    return {
        type: DECREMENT,
        totalPrice: ingredient.price
    };
}

export function resetPrice(): ResetAction {
    return {
        type: RESET
    };
}
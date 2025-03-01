import {INCREMENT, DECREMENT, RESET} from "../../utils/data";
import {IIngredient} from "../../utils/types";

export interface IIncrementAction {
    type: typeof INCREMENT;
    totalPrice: number;
}

export interface IDecrementAction {
    type: typeof DECREMENT;
    totalPrice: number;
}

export interface IResetAction {
    type: typeof RESET;
}

export type TTotalPriceActions = IIncrementAction | IDecrementAction | IResetAction;


export function increment(ingredient: IIngredient): IIncrementAction {
    return {
        type: INCREMENT,
        totalPrice: ingredient.price
    };
}

export function decrement(ingredient: IIngredient): IDecrementAction {
    return {
        type: DECREMENT,
        totalPrice: ingredient.price
    };
}

export function resetPrice(): IResetAction {
    return {
        type: RESET
    };
}
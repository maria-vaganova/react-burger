import {CLEAR_INGREDIENT_DETAILS, EMPTY_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS} from "../../utils/data";
import {IIngredient, IIngredientDetailInfo} from "../../utils/types";

export interface IShowIngredientDetailAction {
    type: typeof SHOW_INGREDIENT_DETAILS;
    ingredientDetailInfo: IIngredientDetailInfo;
}
export interface IClearIngredientDetailAction {
    type: typeof CLEAR_INGREDIENT_DETAILS;
    ingredientDetailInfo: IIngredientDetailInfo;
}

export type TIngredientDetailActions = IShowIngredientDetailAction | IClearIngredientDetailAction;

export function fulfilIngredientDetails(ingredient: IIngredient): IShowIngredientDetailAction {
    const ingredientDetailInfo: IIngredientDetailInfo = {
        image_large: ingredient.image_large,
        name: ingredient.name,
        calories: ingredient.calories,
        proteins: ingredient.proteins,
        fat: ingredient.fat,
        carbohydrates: ingredient.carbohydrates
    };
    return {
        type: SHOW_INGREDIENT_DETAILS,
        ingredientDetailInfo: ingredientDetailInfo
    };
}

export function clearIngredientDetails(): IClearIngredientDetailAction {
    return {
        type: CLEAR_INGREDIENT_DETAILS,
        ingredientDetailInfo: EMPTY_INGREDIENT_DETAILS
    };
}
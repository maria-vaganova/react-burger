import {CLEAR_INGREDIENT_DETAILS, EMPTY_INGREDIENT_DETAILS, SHOW_INGREDIENT_DETAILS} from "../../utils/data";
import {Ingredient, IngredientDetailInfo} from "../../utils/types";

export interface ShowIngredientDetailAction {
    type: typeof SHOW_INGREDIENT_DETAILS;
    ingredientDetailInfo: IngredientDetailInfo;
}
export interface ClearIngredientDetailAction {
    type: typeof CLEAR_INGREDIENT_DETAILS;
    ingredientDetailInfo: IngredientDetailInfo;
}

export type IngredientDetailActionTypes = ShowIngredientDetailAction | ClearIngredientDetailAction;

export function fulfilIngredientDetails(ingredient: Ingredient): ShowIngredientDetailAction {
    const ingredientDetailInfo: IngredientDetailInfo = {
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

export function clearIngredientDetails(): ClearIngredientDetailAction {
    return {
        type: CLEAR_INGREDIENT_DETAILS,
        ingredientDetailInfo: EMPTY_INGREDIENT_DETAILS
    };
}
import {CartItem, Ingredient} from "./types";
import {BUN_TYPE} from "./data";

export function restoreIngredientListFromCart(
    cart: CartItem[] | undefined, isBunIncluded: boolean, data: Ingredient[]): Ingredient[] {
    if (cart) {
        return (isBunIncluded ? cart : cart.filter(elem => elem.type !== BUN_TYPE))
            .flatMap(elem => {
                return fulfilIngredient(elem.id, data);
            });
    }
    return [];
}

export function getIngredientCountFromCartById(cart: CartItem[] | undefined, id: string): number {
    let count = 0;
    cart?.forEach(elem => {
        if (elem.id === id) {
            count++;
        }
    })
    return count;
}

export function getBunFromCart(cart: CartItem[] | undefined, data: Ingredient[]): Ingredient | undefined {
    const bun = cart?.find(elem => elem.type === BUN_TYPE);
    if (bun === undefined) return undefined;
    return fulfilIngredient(bun.id, data);
}

export function fulfilIngredient(id: string, data: Ingredient[]): Ingredient {
    const findIngredient = data.find(elem => elem._id === id);
    return findIngredient ? findIngredient : {
        _id: "0",
        name: "Не найдено",
        type: "none",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "",
        image_mobile: "",
        image_large: "",
        __v: 0
    };
}

export function getDataIdsWithType(data: Ingredient[]): { id: string, type: string }[] {
    return data.map((elem) => ({
        id: elem._id,
        type: elem.type
    }));
}

export function getDataIds(data: Ingredient[]): string[] {
    return data.map((elem) => elem._id);
}

export function getIngredientTypeById(id: string, data: Ingredient[]): string {
    const ingredient = data.find(elem => elem._id === id);
    return ingredient ? ingredient.type : "";
}

import {CartItem, Ingredient, OrderInfo} from "./types";
import {BUN_TYPE, API_URL, ORDER_POST_URL} from "./data";

export function addIngredientToCart(
    cart: CartItem[] | undefined,
    setCart: Function,
    id: string,
    type: string) {
    if (id !== "0") {
        let displayOrder: number = 0;
        if (cart === undefined) {
            setCart([{id: id, type: type, displayOrder: displayOrder}]);
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
            setCart(newCart);
        }
    }
}

export function discardIngredientFromCart(
    cart: CartItem[] | undefined,
    setCart: Function,
    displayOrder: number) {
    if (cart !== undefined && displayOrder) {
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
        setCart(newCart);
    }
}

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

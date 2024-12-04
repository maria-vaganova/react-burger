import {Ingredient} from "./types";
import {BUN_TYPE, API_URL} from "./data";

export function addIngredientToCart(
    cart: [{
        id: string,
        type: string,
        count: number
    }] | undefined,
    setCart: Function,
    id: string,
    type: string) {
    if (id !== "0") {
        if (cart === undefined) {
            setCart([{id: id, type: type, count: 1}]);
        } else {
            let newCart = [...cart];
            if (type === BUN_TYPE) {
                const bun = cart.find(elem => elem.type === BUN_TYPE);
                if (bun !== undefined) {
                    newCart = newCart.filter(elem => elem.id !== bun.id);
                    setCart(newCart);
                }
            }
            const index = newCart.findIndex(elem => elem.id === id);
            if (index === -1) {
                setCart([...newCart, {id: id, type: type, count: 1}]);
            } else {
                newCart[index].count += 1;
                setCart(newCart);
            }
        }
    }
}

export function discardIngredientFromCart(
    cart: [{
        id: string,
        type: string,
        count: number
    }] | undefined,
    setCart: Function,
    id: string) {
    if (cart !== undefined && id !== "0") {
        const index = cart.findIndex(elem => elem.id === id);
        if (index !== -1) {
            const newCart = [...cart];
            newCart[index].count -= 1;
            if (newCart[index].count === 0) {
                setCart(cart.filter(elem => elem.id !== id));
            } else {
                setCart(newCart);
            }
        }
    }
}

export function getBunFromCart(cart: [{
    id: string,
    type: string,
    count: number
}] | undefined, data: Ingredient[]): Ingredient | undefined {
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

export function getDataIds(data: Ingredient[]): { id: string, type: string }[] {
    return data.map((elem) => ({
        id: elem._id,
        type: elem.type
    }));
}

export async function fetchData(): Promise<Ingredient[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Ошибка сети');
    }
    return (await response.json()).data as Ingredient[];
}

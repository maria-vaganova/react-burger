import {CartItem, Ingredient, OrderInfo} from "./types";
import {BUN_TYPE, API_URL, ORDER_POST_URL} from "./data";

export function addIngredientToCart(
    cart: CartItem[] | undefined,
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
    cart: CartItem[] | undefined,
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

export function restoreIngredientListFromCart(
    cart: CartItem[] | undefined, isBunIncluded: boolean, data: Ingredient[]): Ingredient[] {
    if (cart) {
        return (isBunIncluded ? cart : cart.filter(elem => elem.type !== BUN_TYPE))
            .flatMap(elem => {
                const ingredient = fulfilIngredient(elem.id, data);
                return Array.from({length: elem.count}, (): Ingredient => (ingredient));
            });
    }
    return [];
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

export async function fetchData(): Promise<Ingredient[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Ошибка сети');
    }
    return (await response.json()).data as Ingredient[];
}

export async function postOrder(ingredients: string[]): Promise<OrderInfo> {
    const response = await fetch(ORDER_POST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ingredients})
    });
    if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.status + " " + response.statusText);
    }
    return await response.json() as OrderInfo;
}

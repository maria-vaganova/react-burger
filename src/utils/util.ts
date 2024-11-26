import {Ingredient} from "./types";
import {BUN_TYPE, dataList} from "./data";

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
}] | undefined): Ingredient | undefined {
    const bun = cart?.find(elem => elem.type === BUN_TYPE);
    if (bun === undefined) return undefined;
    return fulfilIngredient(bun.id);
}

export function getCartSum(cart: [{
    id: string,
    type: string,
    count: number
}] | undefined): number {
    return cart ? cart.reduce((sum, elem) => sum + fulfilIngredient(elem.id).price * elem.count, 0) : 0;
}

export function fulfilIngredient(id: string): Ingredient {
    const findIngredient = dataList.find(elem => elem._id === id);
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

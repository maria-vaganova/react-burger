import {ICartItem, IIngredient} from "./types";
import {BUN_TYPE, EMPTY_REFRESH_TOKEN, REFRESH_TOKEN_STORAGE_TAG} from "./data";

export function restoreIngredientListFromCart(
    cart: ICartItem[] | undefined, isBunIncluded: boolean, data: IIngredient[]): IIngredient[] {
    if (cart) {
        return (isBunIncluded ? cart : cart.filter(elem => elem.type !== BUN_TYPE))
            .flatMap(elem => {
                return fulfilIngredient(elem.id, data);
            });
    }
    return [];
}

export function getIngredientCountFromCartById(cart: ICartItem[] | undefined, id: string): number {
    let count = 0;
    cart?.forEach(elem => {
        if (elem.id === id) {
            count++;
        }
    })
    return count;
}

export function getBunFromCart(cart: ICartItem[] | undefined, data: IIngredient[]): IIngredient | undefined {
    const bun = cart?.find(elem => elem.type === BUN_TYPE);
    if (bun === undefined) return undefined;
    return fulfilIngredient(bun.id, data);
}

export function fulfilIngredient(id: string, data: IIngredient[]): IIngredient {
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

export function getDataIdsWithType(data: IIngredient[]): { id: string, type: string }[] {
    return data.map((elem) => ({
        id: elem._id,
        type: elem.type
    }));
}

export function getDataIds(data: IIngredient[]): string[] {
    return data.map((elem) => elem._id);
}

export function getIngredientTypeById(id: string, data: IIngredient[]): string {
    const ingredient = data.find(elem => elem._id === id);
    return ingredient ? ingredient.type : "";
}

function checkResponse(response: Response): Promise<any> {
    if (response.ok) {
        return response.json();
    } else {
        return response.json().then((data) => {
            throw data;
        });
    }
}

export function request(url: string, options: RequestInit = {}): Promise<any> {
    return fetch(url, options).then(checkResponse);
}

export function isUserAuthenticated(): boolean {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_TAG);
    if (!refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, EMPTY_REFRESH_TOKEN);
        return false;
    }
    return refreshToken !== EMPTY_REFRESH_TOKEN;
}
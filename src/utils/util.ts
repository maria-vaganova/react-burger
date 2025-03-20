import {ICartItem, IIngredient} from "./types";
import {BUN_TYPE, EMPTY_REFRESH_TOKEN, REFRESH_TOKEN_STORAGE_TAG} from "./data";

export function restoreIngredientListFromCart(
    cart: ICartItem[] | undefined, isBunIncluded: boolean, data: IIngredient[]): IIngredient[] {
    if (cart) {
        return (isBunIncluded ? cart : cart.filter((elem: ICartItem): boolean => elem.type !== BUN_TYPE))
            .flatMap((elem: ICartItem): IIngredient => {
                return fulfilIngredient(elem.id, data);
            });
    }
    return [];
}

export function getIngredientCountFromCartById(cart: ICartItem[] | undefined, id: string): number {
    let count: number = 0;
    cart?.forEach((elem: ICartItem): void => {
        if (elem.id === id) {
            count++;
        }
    })
    return count;
}

export function getBunFromCart(cart: ICartItem[] | undefined, data: IIngredient[]): IIngredient | undefined {
    const bun: ICartItem | undefined = cart?.find((elem: ICartItem): boolean => elem.type === BUN_TYPE);
    if (bun === undefined) return undefined;
    return fulfilIngredient(bun.id, data);
}

export function fulfilIngredient(id: string, data: IIngredient[]): IIngredient {
    const findIngredient: IIngredient | undefined = data.find((elem: IIngredient): boolean => elem._id === id);
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
    return data.map((elem: IIngredient): { id: string, type: string } => ({
        id: elem._id,
        type: elem.type
    }));
}

export function getDataIds(data: IIngredient[]): string[] {
    return data.map((elem: IIngredient): string => elem._id);
}

export function getIngredientTypeById(id: string, data: IIngredient[]): string {
    const ingredient: IIngredient | undefined = data.find((elem: IIngredient): boolean => elem._id === id);
    return ingredient ? ingredient.type : "";
}

function checkResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
        return response.json();
    } else {
        return response.json().then((data) => {
            throw data;
        });
    }
}

export function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    return fetch(url, options).then(checkResponse<T>);
}

export function isUserAuthenticated(): boolean {
    const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN_STORAGE_TAG);
    if (!refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_STORAGE_TAG, EMPTY_REFRESH_TOKEN);
        return false;
    }
    return refreshToken !== EMPTY_REFRESH_TOKEN;
}

export function getOrderNumberForCard(number: number): string {
    return number.toString().padStart(6, '0');
}

export function getRussianNameForStatus(status: string): string {
    switch (status) {
        case "done":
            return "Выполнен";
        case "pending":
            return "Готовится";
        case "created":
            return "Создан";
        default:
            return "Отменён";
    }
}
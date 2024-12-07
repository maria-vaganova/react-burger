import {Dispatch, SetStateAction} from "react";

export interface Ingredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface TotalPriceState {
    count: number;
}

export interface TotalPriceAction {
    type: "increment" | "decrement" | "reset";
    ingredient?: Ingredient;
}

export interface OrderInfo {
    name: string;
    order: Order;
    success: boolean;
}

export interface Order {
    number: number;
}

export interface CartItem {
    id: string;
    type: string;
    displayOrder: number;
}

export interface OrderState {
    orderRequest: boolean;
    orderFailed: boolean;
    orderInfo: OrderInfo;
}

export interface CartContextType {
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;
}
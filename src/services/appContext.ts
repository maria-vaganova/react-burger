import {createContext} from 'react';
import {CartContextType, OrderNumberContextType} from "../utils/types";
import {EMPTY_CART_CONTEXT, EMPTY_ORDER_NUMBER_CONTEXT} from "../utils/data";

export const OrderNumberContext = createContext<OrderNumberContextType>(EMPTY_ORDER_NUMBER_CONTEXT);
export const CartContext = createContext<CartContextType>(EMPTY_CART_CONTEXT);

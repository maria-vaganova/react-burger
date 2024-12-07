import {createContext} from 'react';
import {CartContextType} from "../utils/types";
import {EMPTY_CART_CONTEXT} from "../utils/data";

// export const OrderNumberContext = createContext<OrderNumberContextType>(EMPTY_ORDER_NUMBER_CONTEXT);
export const CartContext = createContext<CartContextType>(EMPTY_CART_CONTEXT);

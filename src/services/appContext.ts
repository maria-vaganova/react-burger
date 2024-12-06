import {createContext, SetStateAction, Dispatch} from 'react';

interface OrderNumberContextType {
    orderNumber: number;
    setOrderNumber: Dispatch<SetStateAction<number>>;
}

export const OrderNumberContext = createContext<OrderNumberContextType | undefined>(undefined);

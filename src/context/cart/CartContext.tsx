import { createContext } from 'react';
import { ICartProduct } from '@/interfaces';


export interface ContextCartProps {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    taxRate: number;
    total: number;

    //Methods
    addProductToCart: (p: ICartProduct) => void;
    updateCartQuantity: (p: ICartProduct) => void;
    removeCartProduct: (p: ICartProduct) => void;
}


export const CartContext = createContext({} as ContextCartProps);
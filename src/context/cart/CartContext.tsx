import { createContext } from 'react';
import { ICartProduct } from '@/interfaces';
import { ShippingAddress } from './CartProvider';


export interface ContextCartProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    taxRate: number;
    total: number;

    shippingAddress?: ShippingAddress;

    //Methods
    addProductToCart: (p: ICartProduct) => void;
    updateCartQuantity: (p: ICartProduct) => void;
    removeCartProduct: (p: ICartProduct) => void;
    updateAddress: (p: ShippingAddress) => void;
    createOrder: () => Promise<{ hasError: boolean; msg: string;}>;
}


export const CartContext = createContext({} as ContextCartProps);
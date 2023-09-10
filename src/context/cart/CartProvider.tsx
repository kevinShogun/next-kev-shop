import { FC, ReactNode, useEffect, useReducer, useRef } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '@/interfaces';
import { CartContext, cartReducer } from './';

interface Props {
    children: ReactNode | ReactNode[];
}

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    taxRate: number;
    total: number;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    taxRate: 0,
    total: 0
};

export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try {
            const thisCookie = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];

            dispatch({
                type: '[Cart] - Load from cookies | storage',
                payload: thisCookie
            })
        } catch (error) {
            dispatch({
                type: '[Cart] - Load from cookies | storage',
                payload: []
            })
        }
    }, [])


    const firstTimeLoad = useRef(true);

    useEffect(() => {
        if (firstTimeLoad.current) {
            firstTimeLoad.current = false;
            if (state.cart.length === 0) {
                return;
            }
        }
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart]);


    useEffect(() => {
        if (firstTimeLoad.current) {
            firstTimeLoad.current = false;
            if (state.cart.length === 0) {
                return;
            }
        }
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            taxRate: taxRate * subTotal,
            total: subTotal * (taxRate + 1)
        }

        dispatch({
            type: '[Cart] - Update order summary',
            payload: orderSummary
        });
        
    }, [state.cart]);

    const addProductToCart = (product: ICartProduct) => {

        // solution 
        const productInCart = state.cart.some(p => p._id === product._id);
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });

        const productInCartDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
        if (!productInCartDifferentSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] });

        // Add
        const updateProducts = state.cart.map(p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            //update quantity
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updateProducts });
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({
            type: '[Cart] - Change cart quantity',
            payload: product
        });
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({
            type: '[Cart] - Remove product in cart',
            payload: product
        });
    }

    return (
        <CartContext.Provider
            value={{
                ...state,
                //Methods
                addProductToCart,
                updateCartQuantity,
                removeCartProduct
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
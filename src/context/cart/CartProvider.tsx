import { FC, ReactNode, useEffect, useReducer, useRef } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct, IOrder } from '@/interfaces';
import { CartContext, cartReducer } from './';
import { tesloApi } from '@/api';
import axios from 'axios';

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
    shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    taxRate: 0,
    total: 0,
    shippingAddress: undefined

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

    useEffect(() => {
        if (Cookie.get('firstName')) {
            dispatch({
                type: '[Cart] - LoadAddres from cookies',
                payload: {
                    firstName: Cookie.get('firstName') || "",
                    lastName: Cookie.get('lastName') || "",
                    address: Cookie.get('address') || "",
                    address2: Cookie.get('address2') || "",
                    zip: Cookie.get('zip') || "",
                    city: Cookie.get('city') || "",
                    country: Cookie.get('country') || "",
                    phone: Cookie.get('phone') || "",
                }
            });
        }
    }, []);

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

    const updateAddress = (address: ShippingAddress) => {

        Cookie.set('firstName', address.firstName);
        Cookie.set('lastName', address.lastName);
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || "");
        Cookie.set('zip', address.zip);
        Cookie.set('city', address.city);
        Cookie.set('country', address.country);
        Cookie.set('phone', address.phone);


        dispatch({
            type: '[Cart] - Update address',
            payload: address
        })
    }


    const createOrder = async ():Promise<{ 
        hasError: boolean; msg: string;
    }> => {
        if(!state.shippingAddress){
            throw new Error('No hay direccion de entrega');
        }
        const body:IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            taxRate: state.taxRate,
            total: state.total,
            isPaid: false
        }

        try {
            const { data } = await tesloApi.post('/order', body);
            dispatch({ type: '[Cart] - Order complete' });
            return {
                hasError: false,
                msg: data._id!
            }
        } catch (error) {
            console.log(error)
            if(axios.isAxiosError(error)){
                return {
                    hasError: true,
                    msg: error.response?.data.message
                }
            }
            return {
                hasError: true,
                msg: 'Error no controlado, favor contactar al administrador'
            }
        }   
    }


    return (
        <CartContext.Provider
            value={{
                ...state,

                //Methods
                addProductToCart,
                updateCartQuantity,
                removeCartProduct,
                updateAddress,
                createOrder
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
import { ShippingAddress } from "./CartProvider";
import { CartState } from "./";
import { ICartProduct } from "@/interfaces";

type CartActions =
	| {
			type: "[Cart] - Load from cookies | storage";
			payload: ICartProduct[];
	  }
	| { type: "[Cart] - Update products in cart"; payload: ICartProduct[] }
	| { type: "[Cart] - Change cart quantity"; payload: ICartProduct }
	| { type: "[Cart] - Remove product in cart"; payload: ICartProduct }
	| { type: "[Cart] - LoadAddres from cookies"; payload: ShippingAddress }
	| { type: "[Cart] - Update address"; payload: ShippingAddress }
	| { type: "[Cart] - Order complete";}
	| {
			type: "[Cart] - Update order summary";
			payload: {
				numberOfItems: number;
				subTotal: number;
				taxRate: number;
				total: number;
			};
	  };

export const cartReducer = (
	state: CartState,
	action: CartActions
): CartState => {
	switch (action.type) {
		case "[Cart] - Load from cookies | storage":
			return {
				...state,
				isLoaded: true,
				cart: [...action.payload],
			};
		case "[Cart] - Update products in cart":
			return {
				...state,
				cart: [...action.payload],
			};
		case "[Cart] - Change cart quantity":
			return {
				...state,
				cart: state.cart.map((p) => {
					if (p._id !== action.payload._id) return p;
					if (p.size !== action.payload.size) return p;

					return action.payload;
				}),
			};
		case "[Cart] - Remove product in cart":
			return {
				...state,
				cart: state.cart.filter(
					(p) =>
						!(p._id === action.payload._id && p.size === action.payload.size)
				),
			};
		case "[Cart] - Update order summary":
			return {
				...state,
				...action.payload,
			};
		case "[Cart] - LoadAddres from cookies":
		case "[Cart] - Update address":
			return {
				...state,
				shippingAddress: action.payload,
			};
		case "[Cart] - Order complete":
			return {
				...state,
				cart: [],
				numberOfItems: 0,
				subTotal: 0,
				taxRate: 0,
				total: 0
			};
		default:
			return state;
	}
};

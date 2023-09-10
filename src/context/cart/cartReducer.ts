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
				...action.payload
			}
		default:
			return state;
	}
};

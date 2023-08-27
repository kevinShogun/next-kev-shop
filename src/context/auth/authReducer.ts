import { AuthState } from "./";
import { IUser } from "@/interfaces";

type AuthActions =
	| { type: "[Auth] - Login"; payload: IUser }
	| { type: "[Auth] - Logout" };

export const authReducer = (
	state: AuthState,
	action: AuthActions
): AuthState => {
	switch (action.type) {
		case "[Auth] - Login":
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
			};
		case "[Auth] - Logout":
			return {
				...state,
				isLoggedIn: false,
				user: undefined,
			};
		default:
			return state;
	}
};

import { UiState } from "./";

type UiActions = { type: "[UI] - ToggleMenu" };

export const UiReducer = (state: UiState, action: UiActions): UiState => {
	switch (action.type) {
		case "[UI] - ToggleMenu":
			return {
				...state,
				isMenuOpen: !state.isMenuOpen,
			};
		default:
			return state;
	}
};

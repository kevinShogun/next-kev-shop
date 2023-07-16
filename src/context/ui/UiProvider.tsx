import { FC, ReactNode, useReducer } from 'react';
import { UiContext, UiReducer} from './';

interface Props {
    children: ReactNode | ReactNode[];
}

export interface UiState {
    isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
};

export const UiProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(UiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({type: '[UI] - ToggleMenu'})
    }

    return (
        <UiContext.Provider
            value={{
                ...state,
                //Methods
                toggleSideMenu
            }}
        >
            {children}
        </UiContext.Provider>
    );
};
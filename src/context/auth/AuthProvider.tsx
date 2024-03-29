import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import { AuthContext, authReducer } from './';

interface Props {
    children: ReactNode | ReactNode[];
}

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
};

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();
    const { data, status } = useSession();

    useEffect(() => {
        if(status === 'authenticated'){
            // console.log({user: data.user});
            dispatch({
                type: '[Auth] - Login',
                payload: data.user as IUser
            })
        }
    }, [status, data]);
    

    // useEffect(() => {
    //     checkToken();
    // }, []);
    

    const checkToken = async () => {

        if(!Cookies.get('token')) return;

        try {
            const {data} = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            // console.log(data);
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user }); 
        } catch (error) {
            Cookies.remove('token');
            return;
        }
    }


    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {

            const { data } = await tesloApi.post('/user/login', { email, password });

            const { token, user } = data;

            Cookies.set('token', token);

            dispatch({ type: '[Auth] - Login', payload: user });

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{
        hasError: boolean;
        message?: string;
    }> => {

        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password });

            const { token, user } = data;

            Cookies.set('token', token);

            dispatch({ type: '[Auth] - Login', payload: user });

            return {
                hasError: false
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            } else {
                return {
                    hasError: true,
                    message: 'No se pudo crear el usuario - Intente nuevamente'
                }
            }
        }
    }

    const logout = () => {
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');
        localStorage.clear();
        sessionStorage.clear();
        signOut();
        router.push("/")
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,

                //methods
                loginUser,
                registerUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
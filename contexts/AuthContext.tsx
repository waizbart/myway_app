import React, { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
    signed: boolean;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
    handleLogin: (login: string, password: string) => Promise<void>;
    handleLogout: () => void;
    handleSignUp: (data: SingUpData, feeGow?: boolean) => Promise<void>;
};

type SingUpData = {
    username: string,
    name: string,
    phone: string,
    email: string,
    password: string,
    hasCar: boolean,
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

function AuthProvider({ children }: { children: ReactNode }) {
    const { navigate } = useNavigation<any>();

    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadStorageData() {
            setIsLoading(true);
            const storageToken = await AsyncStorage.getItem('user-token');

            if (storageToken) {
                setUser(storageToken);
            }

            setIsLoading(false);
        }

        loadStorageData();
    }, []);

    const handleLogin = async (login: string, password: string): Promise<void> => {
        try {
            setIsLoading(true);

            const { token } = await api.post('/auth/login', {
                login,
                password
            });

            console.log({token})

            await AsyncStorage.setItem('user-token', token)

            setUser(token);
            navigate('Route')
            setIsLoading(false);
        } catch (e: any) {
            setIsLoading(false);
            throw new Error(e);
        };
    }

    const handleSignUp = async (data: SingUpData): Promise<void> => {
        try {
            setIsLoading(true);

            await api.post('/auth/register', data)

            setIsLoading(false);
            navigate('Login')

        } catch (e: any) {
            setIsLoading(false);
            throw new Error(e);
        };
    }


    const handleLogout = () => {
        try {
            setUser(null);
            AsyncStorage.removeItem('user-token');
        } catch (e: any) {
            throw new Error(e);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signed: Boolean(user),
                isLoading,
                setIsLoading,
                user,
                handleLogin,
                handleLogout,
                handleSignUp
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
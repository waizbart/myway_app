import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const publicRoutes = [
    "/auth/login",
    "/auth/register"
];

export const api = axios.create({
    baseURL: "http://192.168.0.116:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem("user-token");

    if (token && !publicRoutes.includes(config.url as string)) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
});
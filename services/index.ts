import { api } from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function getRoutes() {
  const storageToken = await AsyncStorage.getItem('user-token');

  try {
    const response = await api.get("/route", {
      headers: {
        Authorization: `Bearer ${storageToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
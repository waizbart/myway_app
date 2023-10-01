import { api } from "./api";

interface RouteData {
  name: string;
  coordinates: Coordinate[];
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

export async function getRoutes() {
  try {
    const response = await api.get("/route");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export async function createRoute(data: RouteData) {
  try {
    const response = await api.post('/route', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export async function getMatches(routeId: string) {
  try {
    const response = await api.get(`/route/${routeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
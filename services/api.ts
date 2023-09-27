import axios from "axios";

export const api = axios.create({
    baseURL: "http://172.17.118.214:8080",
    headers: {
        "Content-Type": "application/json"
    }
});
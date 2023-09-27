import axios from "axios";

export const api = axios.create({
    baseURL: "http://172.17.112.16:8080",
    headers: {
        "Content-Type": "application/json"
    }
});
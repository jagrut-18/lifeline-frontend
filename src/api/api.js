import { login } from "./apis/login";

export const API = {
    login: (email, password) => login(email, password),
};
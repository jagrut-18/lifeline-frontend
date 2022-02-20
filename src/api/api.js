import { login } from "./apis/login";
import { onboarding } from "./apis/onboarding";

export const API = {
    login: (email, password) => login(email, password),
    onboarding: (formData) => onboarding(formData),
};
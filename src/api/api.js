import { locationAutoComplete } from "./apis/location_autocomplete";
import { login } from "./apis/login";
import { onboarding } from "./apis/onboarding";

export const API = {
    login: (email, password) => login(email, password),
    onboarding: (formData) => onboarding(formData),
    locationAutocomplete: (query) => locationAutoComplete(query),
};
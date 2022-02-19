import { AX } from "../axios";

export async function login(email, password) {
    const reqData = {
        'email': email,
        'password': password,
    };
    AX.post('/login', reqData).then((response) => {
        const data = response.data;
    })
}
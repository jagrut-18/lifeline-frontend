export default function login(email, userId, token) {
    localStorage.setItem('email', email);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('token', token);
}


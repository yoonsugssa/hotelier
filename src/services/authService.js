// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

const authService = {
    register: (username, email, password) => {
        return axios.post(`${API_URL}/register`, { username, email, password });
    },

    login: (usuarioOrEmail, password) => {
        return axios.post(`${API_URL}/login`, { usuarioOrEmail, password });
    },

    googleLogin: (credentialToken) => {
        return axios.post(`${API_URL}/google-login`, { credential: credentialToken });
    },

    saveToken: (token) => {
        localStorage.setItem('user_token', token);
    },

    getToken: () => {
        return localStorage.getItem('user_token');
    },

    logout: () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_photo');
        localStorage.removeItem('google_user');
    },

    // 🔥🔥🔥 GUARDA LOS DATOS DEL USUARIO (GOOGLE O REGISTRO NORMAL)
    setUserData: ({ username, email, googleUser, picture }) => {
        localStorage.setItem("user_email", email || "");
        localStorage.setItem("user_name", username || "");
        localStorage.setItem("user_photo", picture || ""); 
        localStorage.setItem("google_user", googleUser ? "true" : "false");
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('user_token');
    }
};

export default authService;

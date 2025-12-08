// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../view/login.vue';
import Register from '../view/register.vue';
import Home from '../view/Home.vue';
import authService from '../services/authService';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },

  // Home ya NO requiere auth
  { path: '/home', name: 'Home', component: Home },

  // Página inicial → Home
  { path: '/', redirect: '/home' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard actualizado
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();

  // Si ya está autenticado y trata de entrar a Login o Register → llévalo a Home
  if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    return next({ name: 'Home' });
  }

  next();
});

export default router;

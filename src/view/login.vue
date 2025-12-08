<template>
  <form class="modern-form" @submit.prevent="handleLogin">
    <h2 class="form-title">Iniciar Sesión</h2>
    <div class="form-body">
        
        <div class="input-group">
            <div class="input-wrapper">
            <svg fill="none" viewBox="0 0 24 24" class="input-icon">
                <path
                stroke-width="1.5"
                stroke="currentColor"
                d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                />
            </svg>
            <input
                v-model="email"
                required
                placeholder="Usuario o Correo Electrónico"
                class="form-input"
                :class="{ 'input-error': error && emailError }"
                type="text"
            />
            </div>
            <p v-if="error && (emailError || generalError)" class="error-message">
            {{ error }}
            </p>
        </div>

        <div class="input-group">
            <div class="input-wrapper">
            <svg fill="none" viewBox="0 0 24 24" class="input-icon">
                <path
                stroke-width="1.5"
                stroke="currentColor"
                d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z"
                />
            </svg>
            <input
                v-model="password"
                required
                placeholder="Contraseña"
                class="form-input"
                :class="{ 'input-error': error && passwordError }"
                :type="passwordFieldType"
            />
            <button
                class="password-toggle"
                type="button"
                @click="togglePasswordVisibility"
            >
                <svg
                v-if="!showPassword"
                fill="none"
                viewBox="0 0 24 24"
                class="eye-icon"
                >
                <path
                    stroke-width="1.5"
                    stroke="currentColor"
                    d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                />
                <circle
                    stroke-width="1.5"
                    stroke="currentColor"
                    r="3"
                    cy="12"
                    cx="12"
                />
                </svg>
                <svg v-else fill="none" viewBox="0 0 24 24" class="eye-icon">
                <path
                    stroke-width="1.5"
                    stroke="currentColor"
                    d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                    stroke-dasharray="2 2"
                    opacity="0.5"
                />
                <path
                    stroke-width="1.5"
                    stroke="currentColor"
                    stroke-linecap="round"
                    d="M3 3L21 21"
                />
                <circle
                    stroke-width="1.5"
                    stroke="currentColor"
                    r="3"
                    cy="12"
                    cx="12"
                    opacity="0.5"
                />
                </svg>
            </button>
            </div>
            <p v-if="error && passwordError" class="error-message">{{ error }}</p>
        </div>
    </div>

    <div class="separator"><span>o</span></div>

    <div id="google-button-target" style="width: 302px; margin: 0 auto">
        </div>

    <button class="submit-button" type="submit" :disabled="isLoading">
      <span class="button-text">{{
        isLoading ? 'Cargando...' : 'Iniciar Sesión'
      }}</span>
      <div class="button-glow"></div>
    </button>

    <div class="form-footer">
      <router-link to="/register" class="login-link"
        ><span class="abajo"
          >¿No tienes una cuenta? Regístrate aquí.</span
        ></router-link
      >
      <a class="login-link"
        >Al iniciar sesión aceptas nuestros
        <span class="abajo">Términos y condiciones</span> y la
        <span class="abajo">Política de privacidad</span>.</a
      >
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// *** Importaciones necesarias
import authService from '../services/authService' 
import '../assets/css/styles.css'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref(null)
const router = useRouter()

const passwordFieldType = computed(() =>
  showPassword.value ? 'text' : 'password',
)

const passwordError = computed(() => {
  if (!error.value) return false
  const msg = error.value.toLowerCase()
  return msg.includes('contraseña') || msg.includes('password')
})

const emailError = computed(() => {
  if (!error.value) return false
  const msg = error.value.toLowerCase()
  return msg.includes('usuario') || msg.includes('email') || msg.includes('correo')
})

const generalError = computed(() => {
  return error.value && !emailError.value && !passwordError.value
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Función de callback de Google (va a /Home)
const handleGoogleCredential = async (response) => {
  error.value = null
  isLoading.value = true

  const idToken = response.credential
  if (!idToken) {
    error.value = 'Fallo al obtener la credencial de Google.'
    isLoading.value = false
    return
  }

  try {
    const res = await authService.googleLogin(idToken)
    authService.saveToken(res.data.user_token);
    // ✅ Redirección correcta a /Home después de Google Login
    router.replace('/home') 
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Error de autenticación con Google (Backend).';
    error.value = errorMessage;
    console.error("Error en Google Login:", err);
  } finally {
    isLoading.value = false
  }
}


onMounted(() => {

    if (typeof window.google !== 'undefined') {
        window.google.accounts.id.initialize({
            client_id: '128715608979-nffc56ns9uagf29p7j9em6vmm6mrkidv.apps.googleusercontent.com',
            callback: handleGoogleCredential,
            ux_mode: "popup" 
        });

        window.google.accounts.id.renderButton(
            document.getElementById('google-button-target'),
            { 
                type: 'standard',
                shape: 'rectangular',
                theme: 'outline',
                text: 'signin_with',
                size: 'large',
                width: 302,
                locale: 'es',
                logo_alignment: 'left'
            }
        );
    } else {
        console.warn("La librería GSI de Google no se ha cargado. Revisa tu index.html.");
    }
})

// Función de login tradicional (va a /home)
const handleLogin = async () => {
  error.value = null
  isLoading.value = true

  if (!email.value || !password.value) {
    error.value = 'El usuario o correo es obligatorio.'
    isLoading.value = false
    return
  }

  try {
    const res = await authService.login(email.value, password.value)
    authService.saveToken(res.data.user_token);
    
    // ✅ Redirección correcta a /home después de Login tradicional
    router.push('/home')
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Error de conexión. Verifica que el backend esté en http://localhost:3000.';
    error.value = errorMessage;
    console.error("Error en login tradicional:", err);
  } finally {
    isLoading.value = false
  }
}
</script>
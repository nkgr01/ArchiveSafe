import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// primeicons temporarily kept for icon compatibility; consider replacing with Heroicons / FontAwesome later
import 'primeicons/primeicons.css';
import './assets/styles/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
// PrimeVue removed: using local UI components and simple notification fallbacks

// Initialiser l'utilisateur connecté au démarrage
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
authStore.fetchUser();

app.mount('#app');

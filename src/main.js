import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import LogInSignUp from './components/LogInSignUp.vue'

const app = createApp(App);
app.component('login-sign-up', LogInSignUp);

app.mount('#app')

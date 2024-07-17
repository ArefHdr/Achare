import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import '@/styles/resets.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import '@/styles/global.css'
import router from "@/router/index.js";

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

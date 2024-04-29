import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import install from './install/index'
const app  = createApp(App)
app.use(install)
app.mount('#app')

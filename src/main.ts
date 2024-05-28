import { createApp } from 'vue'
import '@/common/style/global.scss'
import App from './App.vue'
import ElementPlus from "element-plus";
import install from './install/index'
// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
import './styles/variables.scss';

const app  = createApp(App)
app.use(install)
app.use(ElementPlus)

app.mount('#app')


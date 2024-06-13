import { createApp } from 'vue'
import '@/common/style/global.scss'
import App from './App.vue'
import ElementPlus from "element-plus";
import install from './install/index'
// element css
import "element-plus/dist/index.css";

import '@/common/style/elementReset.scss';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

//引入字体图标库
import '@/styles/iconfont.css';
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
import './styles/variables.scss';
import 'virtual:svg-icons-register' //注册svg图标模块
import '@/common/style/dark.scss';

import '@/common/style/light.scss';
//添加默认主题模式
document.documentElement.classList.add('light')
const app  = createApp(App)
app.use(install)
app.use(ElementPlus, {  
    locale: zhCn,  
  }); 

app.mount('#app')


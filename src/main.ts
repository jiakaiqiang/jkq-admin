import { createApp } from 'vue'
import '@/common/style/global.scss'
import App from './App.vue'
import ElementPlus from "element-plus";
import install from './install/index'
// element css
import "element-plus/dist/index.css";
import * as Sentry from "@sentry/vue";
import '@/common/style/elementReset.scss';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import enUs from 'element-plus/es/locale/lang/en';
import i18n from './lang';
import { useI18n } from 'vue-i18n';

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
Sentry.init({
  app,
  dsn: "https://3048882cbebd0f0fa5950cb5b4ef59e4@o4509684149518336.ingest.de.sentry.io/4509684151156816",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations:[Sentry.browserTracingIntegration(),Sentry.feedbackIntegration()],
  //采样率
  tracesSampleRate: 1.0
});

// 根据i18n设置Element Plus的语言
const getElementLocale = () => {
  const locale = i18n.global.locale.value;
  return locale === 'en-US' ? enUs : zhCn;
};

app.use(install)
app.use(ElementPlus, {  
    locale: getElementLocale(),  
  }); 
app.use(i18n)

app.mount('#app')


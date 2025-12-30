import { createI18n } from 'vue-i18n';
import indexJson from './index.json';

const messages = {
  'zh-CN': indexJson['zh-CN'],
  'en-US': indexJson['en-US']
};

// 从本地存储获取语言设置，如果没有则使用浏览器语言
const getLocale = () => {
  const storedLocale = localStorage.getItem('language');
  if (storedLocale) {
    return storedLocale;
  }
  const browserLocale = navigator.language;
  return messages[browserLocale as keyof typeof messages] ? browserLocale : 'zh-CN';
};

const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  messages
});

export default i18n;

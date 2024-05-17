import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import {SYSTEM_NAME} from './src/config'
import { resolve } from "path";
//自动import 
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
import {viteMockServe} from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
     AutoImport({ imports: ['vue', 'vue-router','pinia'] ,dts:false}),
     Components({ resolvers:[ElementPlusResolver()]}),
     createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: SYSTEM_NAME } //注入htm 参数
      }
    }),
     // 使用 svg 图标
     createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
     // name 可以写在 script 标签上
     vueSetupExtend({}),
     viteMockServe({
    // supportTs: false, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.ts 文件更改
    mockPath: '@/mock', // 设置 mock 文件夹路径
     })
    ],
  //配置别名
  resolve: {
   alias:{
    '@': fileURLToPath(new URL('./src', import.meta.url))
   }
  },
  

})

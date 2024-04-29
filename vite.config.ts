import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

//自动import 
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
     AutoImport({ imports: ['vue', 'vue-router','pinia'] ,dts:false}),
     Components({ resolvers:[ElementPlusResolver()]}),
    ],
  //配置别名
  resolve: {
   alias:{
    '@': fileURLToPath(new URL('./src', import.meta.url))
   }
  }

})

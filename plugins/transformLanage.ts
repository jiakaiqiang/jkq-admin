// vite-plugin-full-demo.ts
import { Plugin } from 'vite'
import fs from 'fs'
import { handleVueCode ,extractChineseFromVue,extractChineseFromTS,handleVueScriptCode,handleTransformJSCode, handleChinese} from './pluginsUtils'
import { aiTransolteForm } from './postAiTransolteForm'
export default function transformLanagePlugin(): Plugin {
  return {
    name: 'transform-lanage-plugin',   // 插件名称，必须

    /**
     * apply: 指定插件在何种模式下生效
     * 'serve' 仅开发模式
     * 'build' 仅构建模式
     * 不写则两者都生效
     */
    // ← 删除这一行则开发 + 生产都生效

    /**
     * enforce: 插件执行顺序
     * 'pre' 先执行
     * 'post' 后执行
     */
    enforce: 'pre',

    /**
     * config：在 Vite 解析配置前调用，可以修改配置
     */
    config(config, env) {
      console.log('🧩 config 钩子执行，当前模式:', env.mode)

      return {
        define: {
          __PLUGIN_DEV__: JSON.stringify(env.command === 'serve')
        }
      }
    },

    /**
     * configResolved：最终配置已经解析完成
     */
    configResolved(resolvedConfig) {
      console.log('⚙️ 最终配置已解析')
    },
    // resolveId(source, importer, options) {
    //   console.log('🔍 resolveId 钩子执行，source:', source, 'importer:', importer, 'options:', options)
    // },

    /**
     * transform：对某些文件的源码进行处理
     * serve + build 都可执行
     */
    transform(code: string, id: string): string | void {
      // 排除node_modules目录下的文件
      if (id.includes('node_modules')) {
        return code;
      }
      // 匹配id中包含.vue的文件，并且排除虚拟文件
      if (id.includes('.vue') && !id.startsWith('\0')) {
        try {
           //匹配script 并且引入i18n
           const transformedScript = handleVueScriptCode(code)
         
          
          return handleVueCode(transformedScript,id);
        } catch (error) {
           
          console.error(`❌ 处理文件 ${id} 时出错:`, error);
          return handleVueCode( handleVueScriptCode(code),id);
        }
      }
      //处理js里面的中文
       //排除json文件
 
      if (id.includes('.ts') && !id.startsWith('\0')) {

        try {
          
        //处理js 文件中的国际化
        const transformJSCode = handleTransformJSCode(code,id)
          return handleVueCode(transformJSCode,id)
        } catch (error) {
           
          console.error(`❌ 处理文件 ${id} 时出错:`, error);
          return handleVueCode( handleTransformJSCode(code,id),id);
        }
     
      }
    
    },
    /**
     * buildStart：构建开始（build）
     */
    buildStart() {
      console.log('🏗️ buildStart —— 构建开始')
    },

    /**
     * closeBundle：构建结束（build）
     */
    closeBundle() {
    
      console.log('🔚 构建完成 closeBundle')
    }
  }
}
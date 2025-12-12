// vite-plugin-full-demo.ts
import { Plugin } from 'vite'

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

    /**
     * transform：对某些文件的源码进行处理
     * serve + build 都可执行
     */
    transform(code: string, id: string): string | void {
      // 匹配id中包含.vue的文件，并且排除虚拟文件
      if (id.includes('.vue') && !id.startsWith('\0')) {
        try {
          // 处理Vue文件内容，提取非注释部分的中文
          function extractChineseFromVue(content: string): string[] {
            // 1. 移除HTML注释 <!-- ... -->
            let processedContent = content.replace(/<!--[\s\S]*?-->/g, '');
            
            // 2. 处理script标签内容
            processedContent = processedContent.replace(/(<script[\s\S]*?>)([\s\S]*?)(<\/script>)/g, (match, openTag, scriptContent, closeTag) => {
              // 移除script中的单行注释
              scriptContent = scriptContent.replace(/\/\/.*$/gm, '');
              // 移除script中的多行注释
              scriptContent = scriptContent.replace(/\/\*[\s\S]*?\*\//g, '');
              return openTag + scriptContent + closeTag;
            });
            
            // 3. 处理style标签内容
            processedContent = processedContent.replace(/(<style[\s\S]*?>)([\s\S]*?)(<\/style>)/g, (match, openTag, styleContent, closeTag) => {
              // 移除style中的单行注释
              styleContent = styleContent.replace(/\/\/.*$/gm, '');
              // 移除style中的多行注释
              styleContent = styleContent.replace(/\/\*[\s\S]*?\*\//g, '');
              // 移除CSS特殊注释 /*! ... */
              styleContent = styleContent.replace(/\/\*![\s\S]*?\*\//g, '');
              return openTag + styleContent + closeTag;
            });
            
            // 4. 提取所有连续的中文字符串
            const chineseRegex = /[\u4e00-\u9fa5]+/g;
            return processedContent.match(chineseRegex) || [];
          }
          
          const chineseMatches = extractChineseFromVue(code);
          
          if (chineseMatches.length > 0) {
            // 去重并排序中文字符串
            const uniqueChinese = [...new Set(chineseMatches)].sort();
            console.log(`📄 文件 ${id} 中除去注释外包含 ${uniqueChinese.length} 个中文词组`);
            console.log(`中文词组：${uniqueChinese}`);
          } else {
            console.log(`📄 文件 ${id} 中除去注释外不包含中文字符`);
          }
          
          return code;
        } catch (error) {
          console.error(`❌ 处理文件 ${id} 时出错:`, error);
          return code;
        }
      }
      
      return code;
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
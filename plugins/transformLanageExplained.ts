// vite-plugin-transform-language-explained.ts
import { Plugin } from 'vite'

export default function transformLanageExplained(): Plugin {
  return {
    name: 'transform-language-explained',   // 插件名称，必须
    enforce: 'pre',

    /**
     * transform：获取和处理源代码（编译前）
     * 在代码被编译成最终产物之前调用
     * 适用于：源码分析、代码注入、语法转换等
     */
    transform(code, id) {
      console.log(`🔧 transform 钩子 - 处理文件: ${id}`)
      console.log(`📝 源代码预览: ${code.substring(0, 100)}...`)
      
      // 示例1: 在Vue文件中注入日志
      if (id.endsWith('.vue')) {
        return {
          code: `console.log("[源码注入] 来自transform钩子");
${code}`,
          map: null // 如果需要保持sourcemap，应该生成正确的map
        }
      }
      
      // 示例2: 修改JavaScript代码
      if (id.endsWith('.js') || id.endsWith('.ts')) {
        // 可以在这里分析和修改源代码
        // 例如：替换特定的函数调用、添加polyfill等
      }
    },

    /**
     * generateBundle：获取和处理编译后的代码（最终产物）
     * 在所有文件都编译完成，准备生成最终产物时调用
     * 适用于：产物分析、代码压缩、版权信息注入等
     */
    generateBundle(_, bundle) {
      console.log('📦 generateBundle 钩子 - 处理最终编译产物')
      
      // 遍历所有构建产物
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        
        // 处理JS文件块（编译后的代码）
        if (chunk.type === 'chunk') {
          console.log(`📄 JS文件: ${fileName}`)
          console.log(`📝 编译后代码预览: ${chunk.code.substring(0, 100)}...`)
          
          // 示例1: 注入版权信息
          const copyright = `/* 
 * 版权信息：这是一个示例项目
 * 构建时间：${new Date().toISOString()}
 */
`;
          chunk.code = copyright + chunk.code;
          
          // 示例2: 替换特定内容
          // chunk.code = chunk.code.replace('console.log', '// console.log');
          
          // 示例3: 统计代码行数
          const lineCount = chunk.code.split('\n').length;
          console.log(`📊 ${fileName} 代码行数: ${lineCount}`);
        }
        
        // 处理资源文件
        else if (chunk.type === 'asset') {
          console.log(`🖼️ 资源文件: ${fileName}`);
          // 可以处理CSS、图片等资源文件
        }
      }
    },

    /**
     * renderChunk：获取和处理单个编译后的JS文件
     * 在每个JS文件编译完成后调用，比generateBundle更早
     * 适用于：单个文件的代码优化、混淆等
     */
    renderChunk(code, chunk, options) {
      console.log(`🎯 renderChunk 钩子 - 处理文件: ${chunk.fileName}`)
      console.log(`📝 编译后代码预览: ${code.substring(0, 100)}...`)
      
      // 示例：添加文件信息注释
      const fileInfo = `/* 文件: ${chunk.fileName} */
`;
      return {
        code: fileInfo + code,
        map: null
      };
    }
  }
}

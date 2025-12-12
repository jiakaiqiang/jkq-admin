# Vite 开发模式源码获取指南

## 1. 开发模式下获取源码的方法

### 1.1 transform 钩子
在开发模式下，每次文件修改和加载时都会触发 `transform` 钩子，可以通过此钩子获取各种类型文件的源码。

**功能**：
- 获取 Vue、JavaScript、TypeScript、CSS 等各种文件的源码
- 可以分析和修改源码内容
- 在开发服务器启动和文件修改时都会执行

**使用示例**：
```typescript
transform(code, id) {
  if (this.meta.env.command === 'serve') {
    // 获取Vue文件源码
    if (id.endsWith('.vue')) {
      console.log(`Vue文件源码: ${code}`);
      return {
        code: `console.log("开发模式处理Vue文件");
${code}`,
        map: null
      };
    }
  }
}
```

### 1.2 handleHotUpdate 钩子
在开发模式下，当文件修改并触发热更新时，会调用 `handleHotUpdate` 钩子。

**功能**：
- 获取变更的文件路径
- 获取受影响的模块信息
- 可以读取完整的变更后文件内容
- 可以自定义热更新行为

**使用示例**：
```typescript
handleHotUpdate(ctx) {
  console.log(`文件变更: ${ctx.file}`);
  
  // 读取完整的变更后文件内容
  const fs = require('fs');
  const sourceCode = fs.readFileSync(ctx.file, 'utf-8');
  console.log(`变更后源码: ${sourceCode}`);
}
```

## 2. 如何测试

### 2.1 启动开发服务器

```bash
npm run dev
```

### 2.2 查看控制台输出

启动开发服务器后，您将在控制台看到类似以下的输出：

```
🔧 [开发模式] transform 钩子 - 处理文件: src/App.vue
📝 Vue文件源码预览: <template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>...

🔧 [开发模式] transform 钩子 - 处理文件: src/main.ts
📝 JS/TS文件源码预览: import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')...
```

### 2.3 修改文件测试热更新

当您修改项目中的任何文件时，将触发 `handleHotUpdate` 钩子，并在控制台看到类似以下的输出：

```
🔥 [开发模式] handleHotUpdate 钩子 - 文件变更: src/App.vue
📁 变更文件路径: src/App.vue
🔗 受影响的模块数量: 1
   - 受影响模块: src/App.vue
📝 变更后源码预览: <template>
  <div>
    <h1>Hello World (修改后)</h1>
  </div>
</template>...
```

## 3. 实际应用场景

### 3.1 代码分析和监控
- 检测未使用的变量或导入
- 监控特定函数的调用
- 分析代码复杂度

### 3.2 开发辅助功能
- 注入调试信息
- 添加性能监控代码
- 自动生成文档

### 3.3 代码转换
- 自动修复语法错误
- 添加兼容性代码
- 替换特定的代码片段

## 4. 注意事项

1. **性能影响**：在开发模式下，`transform` 钩子会在每次文件加载时执行，应避免执行耗时操作。

2. **Source Map**：如果修改了源码内容，应该生成正确的 Source Map 以保证调试体验。

3. **文件类型**：不同类型的文件有不同的处理方式，需要根据文件扩展名进行区分。

4. **环境判断**：使用 `this.meta.env.command === 'serve'` 来确保代码只在开发模式下执行。

## 5. 扩展阅读

- [Vite 插件 API 文档](https://vitejs.dev/guide/api-plugin.html)
- [Vite 开发服务器 API](https://vitejs.dev/guide/api-plugin.html#configureserver)
- [Rollup 插件钩子](https://rollupjs.org/plugin-development/#hooks)

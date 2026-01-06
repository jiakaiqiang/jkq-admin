//处理vue文件代码，提取非注释部分的中文 并且将{{}}中的中文替换成${} ""中的中文 替换床属性绑定的方式
import fs from 'fs';
import path from 'path';
import pluginsConfig from './pluginsConfig';
// 配置参数
const rootDir = './src'; // 你的源码目录
const excludeDir = 'lang'; // 需要排除的国际化文件夹名
export function handleTransformJSCode(code: string,filePath:string) {
    //去除 src下lang中的index.ts 文件
    if (filePath.indexOf('lang/index.ts') !== -1) {
        return code
    }
    console.log(code,'codecodecodecodecodecode')
  let transformedCode = ` \n import i18nData from '@/lang/index' \n
  console.log(i18nData,'i18nData')
 // 引入i18n 
  \n  let $t =  i18nData.global.t \n `
    
    return transformedCode +  code
}

export function handleVueCode(code: string,filePath: string) {
  if (filePath.includes(path.sep + excludeDir + path.sep) || filePath.endsWith('.json')) {
        return;
    }
    code = code.replace(/<!--[\s\S]*?-->/g, '');
    // 1. 处理{{}}中的中文
    code = code.replace(/{{\s*([\u4e00-\u9fa5]+)\s*}}/g, (match, p1) => {
        return `{{${p1}}}`;
    });
    // 2. 处理""中的中文
    // code = code.replace(/(["'])([\u4e00-\u9fa5]+)\1/g, (match, p1, p2) => {
    //   return `${p1}${p2}${p1}`;
    // });
// 只匹配纯中文文本，不包含{{ }}的内容
const regex = /(?<=>)(?![\s\S]*\{\{)([^<>\n]*[\u4e00-\u9fa5]+[^<>\n]*)(?=<)/g;
 code = code.replace(regex, (match) => {
    // 再次双重检查，防止首尾有残留空格的特殊情况
    const text = match.trim();
    if (!text) return match; 
    
    return `{{ $t('${text}') }}`;
});
    
    // 获取标签中的中文并将中文替换成"$t("")" 并且属性采用vue的属性绑定
    code =code.replace(/([a-zA-Z]+)="([^"]*[\u4e00-\u9fa5][^"]*)"/g, ':$1="$t(\'$2\')"');


    // 处理js中的中文
    code = code.replace(/(?<!\$t\()(['"])([\u4e00-\u9fa5]+)\1(?!\))/g, "$t('$2')");
   console.log(code,'codecodecodecodecodecode',filePath)
    return code
}

//处理vue文件中的script代码 引入i18n 
export function handleVueScriptCode(scriptContent: string) {
    let processedContent = scriptContent.replace(/(<script[\s\S]*?>)([\s\S]*?)(<\/script>)/g, (match, openTag, scriptContent, closeTag) => {
        
        //添加代码片段
       let i18nCode = `\n import { useI18n } from 'vue-i18n';\n const { t:$t ,locale} = useI18n();\n`
        return openTag + i18nCode +  scriptContent + closeTag;
    });
    
    return processedContent;
}


// 处理Vue文件内容，提取非注释部分的中文
export function extractChineseFromVue(content: string): string[] {
   
    // 1. 移除HTML注释 <!-- ... -->
    let processedContent = content.replace(/<!--[\s\S]*?-->/g, '');
    // 1.获取template标签中的中文内容
     processedContent = processedContent.replace(/(<template[\s\S]*?>)([\s\S]*?)(<\/template>)/g, (match, openTag, scriptContent, closeTag) => {
        // 移除script中的单行注释
        scriptContent = scriptContent.replace(/\/\/.*$/gm, '');
        // 移除script中的多行注释
        scriptContent = scriptContent.replace(/\/\*[\s\S]*?\*\//g, '');
        //添加代码片段
       
        return openTag +  scriptContent + closeTag;
    });


    // 2. 处理script标签内容
    processedContent = processedContent.replace(/(<script[\s\S]*?>)([\s\S]*?)(<\/script>)/g, (match, openTag, scriptContent, closeTag) => {
        // 移除script中的单行注释
        scriptContent = scriptContent.replace(/\/\/.*$/gm, '');
        // 移除script中的多行注释
        scriptContent = scriptContent.replace(/\/\*[\s\S]*?\*\//g, '');
        //添加代码片段
       
        return openTag +  scriptContent + closeTag;
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
// 处理ts文件内容 提取非注释部分的中文
export function extractChineseFromTS(content: string): string[] {
    // 1. 移除单行注释 // ...
    let processedContent = content.replace(/\/\/.*$/gm, '');
    // 2. 移除多行注释 /* ... */
    processedContent = processedContent.replace(/\/\*[\s\S]*?\*\//g, '');
    // 3. 提取所有连续的中文字符串
    const chineseRegex = /[\u4e00-\u9fa5]+/g;
    return processedContent.match(chineseRegex) || [];
}

//处理生成的中文 并且按照多语言的格式写入文件
export function handleChinese(transformList: string[]) {
    let chineseJson: Record<string, Record<string, string>> = {
        "zh-CN":{},
        "en-US":{}
    }
    //   pluginsConfig.langList.forEach(lang=>{
    //     chineseJson['"'+lang+'"'] = {}
    // })

    transformList.forEach(item=>{
    
        
        //map[`"${item}"`] = `"${item}"`
         chineseJson["zh-CN"][item] =item
         chineseJson["en-US"][item] = ""

    })

    //将提取的文字写入文件中

    fs.writeFileSync('./src/lang/index.json', JSON.stringify(chineseJson, null, 2), 'utf-8');
   

   
}
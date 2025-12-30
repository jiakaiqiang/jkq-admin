//处理vue文件代码，提取非注释部分的中文 并且将{{}}中的中文替换成${} ""中的中文 替换床属性绑定的方式
import fs from 'fs';
import pluginsConfig from './pluginsConfig.ts';
export function handleVueCode(code: string) {
    return code
    code = code.replace(/<!--[\s\S]*?-->/g, '');
    // 1. 处理{{}}中的中文
    code = code.replace(/{{\s*([\u4e00-\u9fa5]+)\s*}}/g, (match, p1) => {
        return `{{${p1}}}`;
    });
    // 2. 处理""中的中文
    // code = code.replace(/(["'])([\u4e00-\u9fa5]+)\1/g, (match, p1, p2) => {
    //   return `${p1}${p2}${p1}`;
    // });
    // 获取标签中的中文并将中文替换成"$t("")" 并且属性采用vue的属性绑定
    code = code.replace(/<([a-zA-Z0-9]+)\s+([^>]*?)>/g, (match, p1, p2) => {
        // 匹配属性中的中文
        p2 = p2.replace(/([a-zA-Z0-9-]+)\s*=\s*(["'])([\u4e00-\u9fa5]+)\2/g, (match: string, attr: string, quote: string, p3: string) => {
            return `:${attr}=${quote}$t('${p3}')${quote}`;
        });
        return `<${p1} ${p2}>`;
    });

    // 处理js中的中文
    code = code.replace(/(["'])([\u4e00-\u9fa5]+)\1/g, (match, p1, p2) => {
        return `${p1}$t('${p2}')${p1}`;
    });

    return code
}
// 处理Vue文件内容，提取非注释部分的中文
export function extractChineseFromVue(content: string): string[] {
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

//处理生成的中文 并且按照多语言的格式写入文件
export function handleChinese(transformList: string[]) {
    let chineseJson: Record<string, Record<string, string>> = {
        "zh-CN":{},
        "en-US":{}
    }
    //   pluginsConfig.langList.forEach(lang=>{
    //     chineseJson['"'+lang+'"'] = {}
    // })
  console.log(chineseJson,'chineseJson-----------------------')
    transformList.forEach(item=>{
    
        
        //map[`"${item}"`] = `"${item}"`
         chineseJson["zh-CN"][item] =item
         chineseJson["en-US"][item] = ""

    })

    //将提取的文字写入文件中

    fs.writeFileSync('./src/assets/lang/index.json', JSON.stringify(chineseJson, null, 2), 'utf-8');
   

   
}

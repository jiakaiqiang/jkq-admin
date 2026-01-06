// 通过Node实现获取src目录下所有文件中的中文字符
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
 function handleChinese(transformList) {
    let chineseJson = {
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

// ES模块中获取__dirname的替代方案
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 递归获取目录下的所有文件
function getAllFiles(dirPath, allFiles = []) {
  const files = fs.readdirSync(dirPath)
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      // 排除lang目录（国际化文件目录）
      if (file !== 'lang') {
        getAllFiles(filePath, allFiles)
      }
    } else {
      // 只处理特定类型的文件
      const ext = path.extname(file)
      if (['.vue', '.ts', '.js', '.tsx', '.jsx'].includes(ext)) {
        allFiles.push(filePath)
      }
    }
  })
  
  return allFiles
}

// 从文件内容中提取中文字符
function extractChinese(text) {
  // 移除注释内容
  let processedText = text
    .replace(/\/\/.*$/gm, '')  // 移除单行注释
    .replace(/\/\*[\s\S]*?\*\//g, '')  // 移除多行注释
    .replace(/<!--[\s\S]*?-->/g, '')  // 移除HTML注释

  // 提取中文字符
  const chineseRegex = /[\u4e00-\u9fa5]+/g
  const matches = processedText.match(chineseRegex)
  
  return matches ? [...new Set(matches)] : []
}

// 处理单个文件并提取中文
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const chineseList = extractChinese(content)
    return chineseList
  } catch (error) {
    console.error(`读取文件失败 ${filePath}:`, error.message)
    return []
  }
}

// 主函数：扫描src目录并提取所有中文
function scanSrcForChinese() {
  const srcDir = path.resolve(__dirname, '../src')
  
  if (!fs.existsSync(srcDir)) {
    console.error('src目录不存在')
    return
  }
  
  console.log('开始扫描src目录...')
  
  // 获取所有文件
  const files = getAllFiles(srcDir)
  console.log(`找到 ${files.length} 个需要处理的文件`)
  
  // 提取所有中文
  const allChinese = new Set()
  
  files.forEach(file => {
    const chineseList = processFile(file)
    chineseList.forEach(chinese => allChinese.add(chinese))
  })
  
  const chineseArray = Array.from(allChinese).sort()
  console.log(`共提取 ${chineseArray.length} 个中文字符`)
  console.log('中文列表：', chineseArray)

   //遍历中文文件并写入lang/index.ts中
  handleChinese(chineseArray)
  
  return chineseArray
}

// 导出函数供其他模块使用
export { scanSrcForChinese, getAllFiles, extractChinese, processFile }

// 如果直接运行此文件，则执行扫描
scanSrcForChinese()
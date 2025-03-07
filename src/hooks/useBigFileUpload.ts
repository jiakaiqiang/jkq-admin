import SparkMD5 from 'spark-md5'
// 文件分片
export const splitFile = (file, size=1)=>{
    //size 是指文件的分块大小
    const fileChunkList = []
    let cur = 0
    while (cur < file.size) {
        fileChunkList.push({
            file: file.slice(cur, cur + size),
        })
        cur += size
    }
    return fileChunkList

}
export const  uploadChunks = (uploadChunkList) => {
    const formateList = uploadChunkList.value.map(({ file, fileName, index, chunkName }) => {
        // 对象需要转成二进制数据流进行传输
        const formData = new FormData() // 创建表单格式的数据流
        // 将切片转换成了表单的数据流
        formData.append('file', file)
        formData.append('fileName', fileName)
        formData.append('chunkName', chunkName)
        return { formData, index }
    })
}


//文件加密  ，文件加密的意义在于后续通过文件hash进行文件合并,  这种分片追加的hash加密方式其实是一种大文件加密的优化方式可以，如果对整个文件进行加密的话由于文件的大小会造成浏览器崩溃或者直接卡死。

export const encryptChunk = (fileChunkList )=>{

  //创建一个spark对象
    const spark = new SparkMD5.ArrayBuffer()
    let percentage = 0
    let count = 0
    //定义加载方法
    const loadNext = index => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(fileChunkList[index].file)
        reader.onload = e => {
            count++
            spark.append(e.target.result)
            if (count === fileChunkList.length) {
                spark.end()
                return
            } else {
                percentage += 100 / fileChunkList.length

                loadNext(count)
            }
        }
    }
    loadNext(count)

}


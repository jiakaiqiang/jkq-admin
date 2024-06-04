//全局统一引入第三方的插件
const  globalComponents =  import.meta.glob('../globalComponent/*.vue') 
import golbalVaible from '@/install/plugins/golbalVaible.ts'

const   plugins:any  =  import.meta.glob('./plugins/*.ts',{ eager: true }) // 会将./plugins/*.ts 文件中export default 的内容加载到plugins对象中
function install(app:any){
     //注册全局的组件
    Object.keys(globalComponents).forEach(item=>{
        const name = item.replace(/(.*\/)*([^.]+).*/gi, '$2')
        //注册全局的组件
        app.component(name,globalComponents[item])
    
    })

    //注册routers
    Object.keys(plugins).forEach(item=>{
       console.log(item,'-fewfwf')
      app.use(plugins[item].default)
    })

    //定义全局变量
    for(const [key,value] of Object.entries(golbalVaible)){
        // console.log(key,value)
        app.config.globalProperties[key] = value
    }
   
}



export default install
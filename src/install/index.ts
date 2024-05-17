//全局统一引入第三方的插件
const  globalComponents =  import.meta.glob('../globalComponent/*.vue') 

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
  
      app.use(plugins[item].default)
    })
   
}



export default install
//全局统一引入第三方的插件
const  globalComponents =  import.meta.glob('../globalComponent/*.vue')
const   plugins  =  import.meta.glob('./plugins/.ts')
function install(app:any){
    Object.keys(globalComponents).forEach(item=>{
        const name = item.replace(/(.*\/)*([^.]+).*/gi, '$2')
        //注册全局的组件
        app.component(name,globalComponents[item])
    
    })
    //注册全局的组件
}



export default install
//处理权限和路由
export function permission (){
    //根据用户权限动态生成路由   !代表的是断言
    const  routerList = localStorage.getItem('routerList')!=null ? JSON.parse(localStorage.getItem('routerList')!):[]

    
   
}

 //根据用户权限动态生成按钮权限
 export function handleRouter(routerList:any[]){
     
 }
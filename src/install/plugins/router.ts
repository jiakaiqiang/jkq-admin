import { createRouter ,createWebHashHistory,} from "vue-router";
import { staticRouter, errorRouter } from "@/router/staticRouter";
// import { useUserStore } from "@/store/modules/user";
import { useAuthStore } from "@/store/modules/auth";
import NProgress from "@/config/nprogress";
import {SYSTEM_NAME,ROUTER_WHITE_LIST}  from '@/config/index'
/**
 * @description 📚 路由参数配置简介
 * @param path ==> 路由菜单访问路径
 * @param name ==> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect ==> 路由重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 路由菜单元信息
 * @param meta.icon ==> 菜单和面包屑对应的图标
 * @param meta.title ==> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 路由外链时填写的访问地址
 * @param meta.isHide ==> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull ==> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix ==> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive ==> 当前路由是否缓存
 * */
  const router = createRouter({
    history:createWebHashHistory(),
    routes: [...staticRouter, ...errorRouter],
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 })
  });
//路由全局守卫
router.beforeEach((to, from, next) => {
  // const userStore = useUserStore();
  const token =  localStorage.getItem('token');
  const authStore = useAuthStore();
  // 1.设置状态
  NProgress.start();
  //2.动态设置标题
  document.title = to.meta.title?`${SYSTEM_NAME}-${to.meta.title} `:`${SYSTEM_NAME}`;
  //1.判断是否有token 没有则跳转到登录页面
  if(to.path.toLocaleLowerCase()=='/login' ){
    if(token)   {
     
      return next('/workspace')
    }
      //resetRouter();
    return next();
    }
   // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
   if (ROUTER_WHITE_LIST.includes(to.path)) return next();
   //5.没有token 直接跳转 到登录页面
   if (!token) return next({ path: '/login', replace: true });
    // 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  // if (!authStore.authMenuListGet.length) {
  //   await initDynamicRouter();
  //   return next({ ...to, replace: true });
  // }

  // // 7.存储 routerName 做按钮权限筛选
  // authStore.setRouteName(to.name as string);

  // 8.正常访问页面
      next();
  
})
//在路由表中删除已有的路由
export function resetRouter() {
  const authStore = useAuthStore();
  authStore.flatMenuListGet.forEach(route => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
  
}
/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

router.afterEach(() => {
  NProgress.done();
});

  export default router;
  

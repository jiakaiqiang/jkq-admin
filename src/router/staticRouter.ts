import {customRouteRecordRaw} from '@/globalType/router.ts'
import Layout from "@/layout/index.vue";
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];



//使用类型交集进行类的扩展
export const staticRouter: Array<customRouteRecordRaw> = [


  {
    path: '/login',
    name: "login",
    isMenu: false,
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: '/workspace',
    name: "",
    isMenu: true,
    component: Layout,
    meta: {
      title: '工作台',
      name: "workspace",
    },
    isShowChidren: false,
    redirect: '/workspace/index',
  
    children: [{
      path: '/workspace/index', name: "index", component: () => import("@/views/workspace/index.vue"), meta: {
        title: "工作台",
        name: "index"
      }
    }]
  },
  {
    path: '/editor',
    name: "",
    component: Layout,
    redirect: '/editor/index',
    meta: {
      title: '编辑器',
      name: "editor",

    },
    isMenu: true,
    children: [
      { path: '/editor/index', name: 'editor', component: () => import('@/views/editor/index.vue'), meta: { title: '编辑器', name: 'index' } },
      {  path: '/editor/editor1', name: 'editor1', redirect:"/editor/editor1/index",  meta: { title: '编辑器1', name: 'editor1' },children:[
      {path:'/editor/editor1/index',name:'editor1',component:()=>import('@/views/editor/editor1/index.vue'),meta:{title:'编辑器1',name:'editor1'}},



      ] },
    
    
    ]
  }

];

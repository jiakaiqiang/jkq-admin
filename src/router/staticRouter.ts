import { RouteRecordRaw } from "vue-router";
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
export const staticRouter: RouteRecordRaw[] = [


  {
    path: '/login',
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: '/workspace',
    name: "",
    component: Layout,
    redirect: '/workspace/index',
    children: [{
      path: '/workspace/index', name: "index", component: () => import("@/views/workspace/index.vue"), meta: {
        title: "工作台"
      }
    }]
  },
  {
    path: '/editor',
    name: "",
    component: Layout,
    redirect: '/editor/index',
    children:[{path:'/editor/index',name:'editor',component:()=>import('@/views/editor/index.vue'),meta:{title:'编辑器'}}]
  }

];

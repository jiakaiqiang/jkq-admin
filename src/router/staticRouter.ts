import { customRouteRecordRaw } from '@/globalType/router.ts'
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

  {path: '/components/Form/Form3', icon: "icon-17", name: "Form3", component: () => import("@/views/components/form3.vue"), meta: {
    title: "基础表单",
    name: "Form3",
    isFullScreen:true
  }},
  {
    path: '/components',

    isMenu: true,
    component: Layout,
    meta: {
      name: 'components',
      title: "常用组件",
    },
    icon: "icon-zujian",
 
    children: [
      {
        path:"/Form",
   
        icon: "icon-17", name: "Form", meta: {
          title: "表单组件",
          name: "Form"
        },
        children:[
         
          {path: '/components/Form/Form', icon: "icon-17", name: "Form", component: () => import("@/views/components/form.vue"), meta: {
            title: "基础表单",
            name: "Form"
          }},
          // {path: '/components/Form/Form3', icon: "icon-17", name: "Form3", component: () => import("@/views/components/form3.vue"), meta: {
          //   title: "基础表单",
          //   name: "Form3"
          // }}
        ]
      },
      {
        path: '/components/Table', icon: "icon-biaoge", name: "Table", component: () => import("@/views/components/table.vue"), meta: {
          title: "表格组件",
          name: "Form"
        }
      },
      {
        path: '/components/FormTable', icon: "icon-biaodanbiaoge", name: "FormTable", component: () => import("@/views/components/formTable.vue"), meta: {
          title: "表单表格组件",
          name: "FormTable"
        }
      },
      {
        path: '/components/Tree', icon: "icon-shuzhuangtu", name: "Tree", component: () => import("@/views/components/tree.vue"), meta: {
          title: "树组件",
          name: "Tree"
        }
      },
      // {
      //   path: '/components/TreeSelect', icon:'icon-shuxuanze',name: "TreeSelect", component: () => import("@/views/components/treeSelect.vue"), meta: {
      //     title: "树选择组件",
      //     name: "Tree"
      //   }
      // },
      {
        path: '/components/TreeTable', name: "TreeTable", icon: 'icon-shuxuanze', component: () => import("@/views/components/TreeTable.vue"), meta: {
          title: "树表格组件",
          name: "Tree"
        }
      },
      {
        path: '/components/Icon', icon: "icon-tubiao", name: "Icon", component: () => import("@/views/components/icon.vue"), meta: {
          title: "图标组件",
          name: "Icon"
        }
      },
      {
        path: '/components/filterSearch', icon: "icon-sousuo", name: "filterSearch", component: () => import("@/views/components/filterSearch.vue"), meta: {
          title: "搜索组件",
          name: "Icon"
        }
      },
      {
        path: '/components/svg', icon: "icon-SVG", name: "svg", component: () => import("@/views/components/svg.vue"), meta: {
          title: "svg图标",
          name: "Icon"
        }
      },
      {
        path: '/components/upload', icon: "icon-wenjian", name: "upload", component: () => import("@/views/components/upload.vue"), meta: {
          title: "文件上传",
          name: "upload"
        }
      }, {
        path: '/components/richText', icon: 'icon-fuwenbenkuang', name: "richText", component: () => import("@/views/components/richText.vue"), meta: {
          title: "富文本编译器",
          name: "richText"
        }
      }
    ]
  },
 
  {
    path: '/lowCode',
    name: 'lowCode',
    component: Layout,
    meta: {
      title: '低代码管理',
      name: 'lowCode'
    },
    isMenu: true,
    redirect: '/lowCode/index',


    icon: 'icon-didaimapingtai',
    children: [
      {
        path: '/lowCode/index',
        name: 'lowCode-index',
        icon: 'icon-code',
        component: () => import('@/views/lowCode/index.vue'),
        meta: {
          title: '低代码设计器',
          name: 'index'
        }    

      },
      {
        path: '/lowCode/preview',
        name: 'lowCode-preview',
        icon: 'icon-yulan',
        component: () => import('@/views/lowCode/preview.vue'),
        meta: {
          title: '页面预览',
          name: 'preview'
        }

      }, {
        path: '/lowCode/echarts',
        name: 'lowCode-echarts',
        icon: 'icon-tubiao-zhexiantu',
        component: () => import('@/views/lowCode/echarts.vue'),
        meta: {
          title: '低代码可视化',
          name: 'echarts'
        }

      },

    ]


  },
  {
    path: '/ppt',
    name: "ppt",
    isMenu: true,
    component: Layout,
    isShowChidren: false,
    icon: 'icon-gongzuotai',
    meta: {
      title: 'ppt幻灯片',
      name: "ppt",
    },

    redirect: '/ppt/index',

    children: [{
      path: '/ppt/index',
      icon: 'icon-gongzuotai',
      name: "ppt-index", component: () => import("@/views/ppt/index.vue"), meta: {
        title: "ppt幻灯片",
        name: "index"
      }
    }]
  },
  {
    path: '/mind-map',
    name: "mindMap",
    isMenu: true,
    component: Layout,
    isShowChidren: false,
    icon: 'icon-gongzuotai',
    meta: {
      title: '思维导图',
      name: "mindMap",
    },

    redirect: '/mindMap/index',

    children: [{
      path: '/mindMap/index',
      icon: 'icon-gongzuotai',
      name: "mindMap-index", component: () => import("@/views/mindMap/index.vue"), meta: {
        title: "思维导图",
        name: "index"
      }
    }]
  },


];

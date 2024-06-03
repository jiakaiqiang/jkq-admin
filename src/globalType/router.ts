import { RouteRecordRaw } from "vue-router";
interface customRecordRaw {
    isMenu?: boolean;
    isShowChidren?: boolean;
    meta?: {
      title: string;
      name?: string;
    }
  }
  export type customRouteRecordRaw = RouteRecordRaw & customRecordRaw;
// 项目类型定义
export interface projectType {
  id?: string;
  name: string;
  description: string;
  createTime: string;
  updateTime?: string;
  status: string | number;
  [key: string]: any;
}
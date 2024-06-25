// 物料类型定义
export enum MaterialType {
    // 容器
    Container = 'container',
    // 文本
    Text = 'text',
    // 图片
    Image = 'image',
    // 按钮
    Button = 'button',
    // 表单
    Form = 'form',
    // 表格           
    Table = 'table',
    // 列表
    List = 'list',
    //图表
    Chart = 'chart',
    // 表单
}

// 物料属性定义
export interface MaterialProps {
    // 物料类型
    type: MaterialType;
    // 物料名称
    name: string;
    //物料分组
    group: string;
    // 物料描述
    description?: string;
    className?: string;
    // 物料属性
    props?: Record<string, any>;
    // 物料事件
    events: Record<string, any>;
    // 物料样式
    style?: Record<string, any>;
    // 子物料
    children?: MaterialProps[];
    // 物料唯一标识
    id: number;
    icon: string,


}

//分组枚举
export enum GroupEnum {
    // 基础组件
    Basic = 'basic',
    //布局
    Layout = 'layout',
    //图表组件
    Chart = 'chart',


}
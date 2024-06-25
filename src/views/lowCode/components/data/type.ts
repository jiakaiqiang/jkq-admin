// 物料类型定义
export enum MaterialType {
    // 容器
    Container = 'Container',
    // 文本
    Text = 'Text',
    // 图片
    Image = 'Image',
    // 按钮
    Button = 'Button',
    // 表单
    Form = 'Form',
    // 表格           
    Table = 'Table',
    // 列表
    List = 'List',
    //图表
    Chart = 'Chart',
    // 表单
}

// 物料属性定义
export interface MaterialProps {
    // 物料类型
    type: MaterialType;
    component?: any;
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
//处理基础组件树

export const schemaTree = {
  id: 'root',
  type: 'container',
  children: [{
    id: 'group1',
    type: 'container',
    "name": "基础组件",
    
    children: [{
        "name": "文本",
          "type": "Text",
          "icon": "el-icon-document",
         "id": 'jkq-text'
    },{
      "name": "输入框",
      "type": "Input",
      "icon": "el-icon-edit",
      "id": 'jkq-input'
    },
    {
        "id": "jkq-image",
          "name": "图片",
          "type": "Image",
          "icon": "el-icon-picture",
    }

    ]
  }, {
    id: 'group2',
    type: 'container',
    name: '其他',
    children: [{
      "icon": "el-icon-document",
      name: "按钮",
      id: 'jkq-button',
      type: "button"
    }]
  }]
}



//组件类型和组件属性映射关系
export const componentTypeMap = {
  'jkq-input': {
    type: 'Input',
    props: {
      placeholder: '请输入',
      value: ''
    },
    "category": "basic",
    "defaultProps": {
            "placeholder": "请输入内容",
            "width": 200,
            "height": 40,
            "borderColor": "#DCDFE6",
            "borderRadius": 4
          },
    "schema": {
      "style": {
        "fontSize": { "type": "number", "label": "字体大小", "min": 12, "max": 72 },
        "color": { "type": "color", "label": "文字颜色" },
        "fontWeight": { "type": "select", "label": "字体粗细", "options": ["normal", "bold"] },
        "textAlign": { "type": "select", "label": "对齐方式", "options": ["left", "center", "right"] },
        "lineHeight": { "type": "number", "label": "行高", "min": 1, "max": 3, "step": 0.1 }
      },
      "data": {
        "content": { "type": "textarea", "label": "文本内容" }
      }
    },
   
  },
  'jkq-button': {

    "type": "Button",
    "icon": "el-icon-mouse",
    "category": "basic",
    "defaultProps": {
      "text": "点击按钮",
      "type": "primary",
      "size": "medium",
      "width": "auto",
      "padding": 20,
      "backgroundColor": "#409EFF",
      "borderColor": "#409EFF",
      "borderRadius": 4
    },
    "schema": {
      "style": {
        "width": { "type": "number", "label": "宽度", "min": 60, "max": 300 },
        "height": { "type": "number", "label": "高度", "min": 30, "max": 60 },
        "backgroundColor": { "type": "color", "label": "背景色" },
        "borderColor": { "type": "color", "label": "边框色" },
        "borderRadius": { "type": "number", "label": "圆角", "min": 0, "max": 20 },
        "type": { "type": "select", "label": "按钮类型", "options": ["primary", "success", "warning", "danger", "info"] },
        "size": { "type": "select", "label": "按钮大小", "options": ["small", "medium", "large"] }
      },
      "data": {
        "text": { "type": "input", "label": "按钮文字" }
      },
      "event": {
        "onClick": { "type": "textarea", "label": "点击事件", "placeholder": "// JavaScript代码" }
      }
    }
  },
  'jkq-image': {
    "id": "image",

    "type": "Image",
    "icon": "el-icon-picture",
    "category": "basic",
    "defaultProps": {
      "src": "https://via.placeholder.com/200x150",
      "width": 200,
      "height": 150,
      "objectFit": "cover",
      "borderRadius": 4
    },
    "schema": {
      "style": {
        "width": { "type": "number", "label": "宽度", "min": 50, "max": 800 },
        "height": { "type": "number", "label": "高度", "min": 50, "max": 600 },
        "objectFit": { "type": "select", "label": "适应方式", "options": ["cover", "contain", "fill", "scale-down"] },
        "borderRadius": { "type": "number", "label": "圆角", "min": 0, "max": 20 }
      },
      "data": {
        "src": { "type": "input", "label": "图片地址" }
      }
    }
  },
  'jkq-select': {
    "id": "select",
    "name": "下拉选择",
    "type": "Select",
    "icon": "el-icon-arrow-down",
    "category": "form",
    "defaultProps": {
      "placeholder": "请选择",
      "width": 200,
      "height": 40,
      "borderColor": "#DCDFE6",
      "borderRadius": 4,
      "options": [
        { "label": "选项1", "value": "option1" },
        { "label": "选项2", "value": "option2" }
      ]
    },
    "schema": {
      "style": {
        "width": { "type": "number", "label": "宽度", "min": 100, "max": 400 },
        "height": { "type": "number", "label": "高度", "min": 30, "max": 60 },
        "borderColor": { "type": "color", "label": "边框色" },
        "borderRadius": { "type": "number", "label": "圆角", "min": 0, "max": 20 }
      },
      "data": {
        "placeholder": { "type": "input", "label": "占位符" },
        "value": { "type": "input", "label": "默认值" },
        "options": { "type": "json", "label": "选项数据", "placeholder": "[{\"label\":\"选项1\",\"value\":\"option1\"}]" }
      }
    }
  },
  'jkq-radio-group': {
    "id": "select",
    "name": "下拉选择",
    "type": "Select",
    "icon": "el-icon-arrow-down",
    "category": "form",
    "defaultProps": {
      "placeholder": "请选择",
      "width": 200,
      "height": 40,
      "borderColor": "#DCDFE6",
      "borderRadius": 4,
      "options": [
        { "label": "选项1", "value": "option1" },
        { "label": "选项2", "value": "option2" }
      ]
    },
    "schema": {
      "style": {
        "width": { "type": "number", "label": "宽度", "min": 100, "max": 400 },
        "height": { "type": "number", "label": "高度", "min": 30, "max": 60 },
        "borderColor": { "type": "color", "label": "边框色" },
        "borderRadius": { "type": "number", "label": "圆角", "min": 0, "max": 20 }
      },
      "data": {
        "placeholder": { "type": "input", "label": "占位符" },
        "value": { "type": "input", "label": "默认值" },
        "options": { "type": "json", "label": "选项数据", "placeholder": "[{\"label\":\"选项1\",\"value\":\"option1\"}]" }
      }
    }
  },
  'jkq-text':{
    "defaultProps": {
            "content": "这是一段文本",
            "fontSize": 14,
            "color": "#333333",
            "fontWeight": "normal",
            "textAlign": "left",
            "lineHeight": 1.5
          },
          "schema": {
            "style": {
              "fontSize": { "type": "number", "label": "字体大小", "min": 12, "max": 72 },
              "color": { "type": "color", "label": "文字颜色" },
              "fontWeight": { "type": "select", "label": "字体粗细", "options": ["normal", "bold"] },
              "textAlign": { "type": "select", "label": "对齐方式", "options": ["left", "center", "right"] },
              "lineHeight": { "type": "number", "label": "行高", "min": 1, "max": 3, "step": 0.1 }
            },
            "data": {
              "content": { "type": "textarea", "label": "文本内容" }
            }
          }
  }


}
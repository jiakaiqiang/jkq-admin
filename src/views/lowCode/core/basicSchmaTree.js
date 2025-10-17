//处理基础组件树

const schemaTree = {
  id: 'root',
  type: 'container',
  children: [{
    id:'group1',
    type:'container',
    children:[{
        id:'jkq-input',
        type:"input"
    }]
  },{
    id:'group2',
    type:'container',
    children:[{
        id:'jkq-button',
        type:"button"
    }]
  },children:[
    {
        
    }
  ]]
}



//组件类型和组件属性映射关系
const componentTypeMap = {
  'jkq-input': {
    type: 'input',
    props: {
      placeholder: '请输入',
      value: ''
    }
  },
  'jkq-button': {
    type: 'button',
    props: {
      text: '按钮'
    }
  }
}
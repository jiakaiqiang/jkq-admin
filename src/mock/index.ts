import Mock from 'mockjs'
export default ({mock}:any)=>{
  if(!mock) return 
  Mock.mock('/api/user/login','post',(option:any)=>{
      
  })
}
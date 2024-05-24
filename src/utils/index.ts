//防抖
export function fangdou(fn: Function, delay: number){
  //定义一个变量，用于保存定时器
  let timer: any = null;
  return function (arg:any) {
       //如果定时器则删除
       if (timer) {
           clearTimeout(timer);
       }
       //如果不存在则设置
       timer = setTimeout(() => {
           fn.apply(this,arg)
           //清除定时器
           timer = null;
       },delay)
  }

}

//节流  一段时间内只能点击一次
export function jieliu(fn: Function, delay: number){
 
    let isClick = true;
    return function (arg:any) {
          if(isClick){
            fn.apply(this,arg)
            isClick = false;
            setTimeout(() => {
                isClick = true;
            })
          }
    }
}

//查找最长递增子序列
function add(){
  const aa  = [10,9,2,5,3,7,101,18]
  //定义存储的最长子序列 
  let result= []
  for(let i = 0; i < aa.length; i++){
   if(aa[i]>result[result.length-1]){
     result.push(i)
   }else{
    //利用二分法实现插入
    let start = 0;
    let end = result.length-1;
    let middle =0
    while (start < end) {
      middle = Math.floor((start + end) / 2)
      if (aa[result[middle]] > aa[i]) {
        end = middle
      } else {
        start = middle + 1 //中间数的下一个最大的整数索引
      }
  

   }
   result[start] = i
  }
} 
 return  result
    
  }


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

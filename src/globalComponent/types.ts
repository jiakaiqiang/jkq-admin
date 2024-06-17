//按钮操作类型
export type  optionType = {
    title: string;
    icon: string;
    event: string;
    size?:string,
    circle?:boolean,
    plain?:boolean
  }


  //表格操作类型
 export  type fieldItemType ={
    label:string,
    value:string,
    type:string,
    list?:string,
    placeholder?:string,
    isShow?:boolean,

}
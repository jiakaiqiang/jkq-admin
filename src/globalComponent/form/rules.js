export default function initRules(list) {
    let obj = {}
    list.forEach(item => {
        switch (item.formType) {
            case 'itemInput':
            case 'itemTextarea':
                item.message = '请输入' + item.label
                break
            case 'itemSelect':
            case 'itemTimeSelect':
            case "itemDateSelect":
            case "itemDateTimeSelect":
            case 'itemCheckBox':
            case 'itemRadio':
                item.message = '请选择' + item.label
                break
        }
        if (item.required) {
            if (item.validator) {
                obj[item.value] = {
                    required: true,
                    validator: item.validator,
                    trigger: ['blur', 'change']
                }
            } else {
                obj[item.value] = {
                    required: true,
                    message: item.message,
                    trigger: ['blur', 'change']
                }
            }
        }
        // }else{
        //    obj[item.value]={
        //        message:item.message,
        //        trigger:['blur','change']
        //      }
        // }


    })
    return obj

}

let layouts = import.meta.glob('@/layout/index.vue')
let modules = import.meta.glob('@/views/**/*.vue')
console.log(modules, layouts, 'sdsd')
import router from '@/install/router'


export const handleRouter = (data: any) => {
    data.forEach((item: any) => {

        if (item.isMenu) {
            item.component = layouts['/src/layout/index.vue']
            item.redirect = item.children[0].path

        } else {
            item.component = modules[`/src/views${item.path}.vue`]
        }
        if (item.children) {
            handleRouter(item.children)
        }
    })


}
export const resultRouter = (data:any) => {
    handleRouter(data)

    addRouter( data)
}
export const addRouter = ( data: any) => {

    data.forEach((item: any) => {
       
        if(!router.hasRoute(item.name)){
            router.addRoute(item)
        }

        if (item.children) {
            addRouter(item.children)
        }
    })
}

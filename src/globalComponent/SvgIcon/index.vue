<template>
  <svg :style="iconStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang='ts' setup>
import { defineProps ,CSSProperties ,computed} from 'vue';
interface iconStyle{
        width: string;
        height: string;
        fill?: string;
    }
interface svgIcon{
    prefix?: string;
    name:string,
    iconStyle?: iconStyle;
    
}
let props = withDefaults(defineProps<svgIcon>(), {
    prefix: 'icon',
    name:"",
    iconStyle:()=>({ width: "100px", height: "100px" })
});
let  symbolId =  computed(()=>`#${props.prefix}-${props.name}`)
// Your code here

</script>

<style scoped lang='scss' >
/* Your styles here */
</style>
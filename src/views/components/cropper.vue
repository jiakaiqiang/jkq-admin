<template>
    <div class="cropper-container">
        <el-alert title="图片裁剪目前使用 vue-cropper 插件完成，官方文档请查看 ：https://github.com/xyxiao001/vue-cropper" type="warning"
            :closable="false" effect='dark' />

        <el-image :src="Image" style="width: 200px; height: 200px;margin-bottom:20px;margin-top:20px"></el-image>
        <el-button @click="openAvatarDialog">上传头像</el-button>
        <avatar-cropper v-model:dialogVisible="dialogVisible" @closeAvatarDialog="closeAvatarDialog"></avatar-cropper>
    </div>
</template>

<script lang="ts" setup>
import avatarCropper from '@/globalComponent/Cropper/index.vue';
import { ref } from 'vue'
const dialogVisible = ref(false)
let Image = ref('../../../public/coy.jpg')

const openAvatarDialog = () => {
    dialogVisible.value = true
    console.log(dialogVisible.value)
}
const closeAvatarDialog = (data: any) => {

    Image.value = window.URL.createObjectURL(data)
    dialogVisible.value = false

}

</script>
<style lang="scss" scoped>
.cropper-container {
    background: var(--el-bg-color);
    height: 100%;
    width: 100%;
    display: flex;

    align-items: center;
    flex-direction: column;

}
</style>
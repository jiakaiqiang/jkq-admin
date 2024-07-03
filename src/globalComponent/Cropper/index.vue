<template>
    <el-dialog title="裁剪头像" v-model="propData.dialogVisible" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false" @close="closeDialog" width="600px">
        <div class="avatar-container">
            <!-- 待上传图片 -->
            <div v-show="!options.img">
                <el-upload class="upload" ref="upload" action="" :on-change="upload"
                    accept="image/png, image/jpeg, image/jpg" :show-file-list="false" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary" ref="uploadBtn">
                        选择图片
                    </el-button>
                </el-upload>
                <div>支持jpg、png格式的图片，大小不超过5M</div>
            </div>
            <!-- 已上传图片 -->
            <div v-show="options.img" class="avatar-crop">
                <vueCropper v-if="propData.dialogVisible" class="crop-box" ref="cropper" :img="options.img"
                    :autoCrop="options.autoCrop" :fixedBox="options.fixedBox" :canMoveBox="options.canMoveBox"
                    :autoCropWidth="options.autoCropWidth" :autoCropHeight="options.autoCropHeight"
                    :centerBox="options.centerBox" :fixed="options.fixed" :fixedNumber="options.fixedNumber"
                    :canMove="options.canMove" :canScale="options.canScale"></vueCropper>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <div class="reupload" @click="reupload">
                <span v-show="options.img">重新上传</span>
            </div>
            <div>
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="getCrop">确 定</el-button>
            </div>
        </span>
    </el-dialog>
</template>

<script lang="ts" setup>

import { defineProps, defineEmits, toRefs, ref, defineModel } from 'vue';
import { ElMessage } from 'element-plus';
const propData = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false
    }
})
console.log(propData.dialogVisible, '----')
const visible = defineModel('dialogVisible')
const emits = defineEmits(['closeAvatarDialog'])


let cropper = ref(null)
let uploadBtn = ref(null)
const options = reactive({
    img: '', // 原图文件
    autoCrop: true, // 默认生成截图框
    fixedBox: false, // 固定截图框大小
    canMoveBox: true, // 截图框可以拖动
    autoCropWidth: 200, // 截图框宽度
    autoCropHeight: 200, // 截图框高度
    fixed: true, // 截图框宽高固定比例
    fixedNumber: [1, 1], // 截图框的宽高比例
    centerBox: true, // 截图框被限制在图片里面
    canMove: false, // 上传图片不允许拖动
    canScale: false // 上传图片不允许滚轮缩放
})


// 读取原图
const upload = (file: object) => {
    const isIMAGE = file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'
    const isLt5M = file.raw.size / 1024 / 1024 < 5
    if (!isIMAGE) {
        ElMessage({
            showClose: true,
            message: '请选择 jpg、png 格式的图片',
            type: 'warning'
        })
        return false
    }
    if (!isLt5M) {
        ElMessage({
            showClose: true,
            message: '图片大小不能超过 5MB',
            type: 'warning'
        })
        return false
    }
    let reader = new FileReader()
    reader.readAsDataURL(file.raw)
    reader.onload = e => {
        console.log(e, '-----')


        options.img = e.target.result // base64
    }
}
// 获取截图信息
const getCrop = () => {
    // 获取截图的 base64 数据
    // this.$refs.cropper.getCropData((data) => {
    //   this.$emit('closeAvatarDialog', data)
    //   this.closeDialog()
    // });
    // 获取截图的 blob 数据
    cropper.value.getCropBlob(data => {
        emits('closeAvatarDialog', data)
        closeDialog()
    })
}
// 重新上传
const reupload = () => {
    uploadBtn.value.$el.click()
}
// 关闭弹框
const closeDialog = () => {

    visible.value = false
    options.img = ''
}
</script>

<style lang="scss" scoped>
.dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .reupload {
        color: #409eff;
        cursor: pointer;
    }
}

.avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 560px;
    height: 400px;
    background-color: #f0f2f5;
    margin-right: 10px;
    border-radius: 4px;

    .upload {
        text-align: center;
        margin-bottom: 24px;
    }

    .avatar-crop {
        width: 560px;
        height: 400px;
        position: relative;

        .crop-box {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            overflow: hidden;
        }
    }
}
</style>
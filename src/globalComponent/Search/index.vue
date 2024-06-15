<template>
    <div class="search-container" ref="search-card">
        <el-card>
            <div>
                <el-form :model="searchData" :inline="true">
                    <el-row :gutter="10">
                        <el-col v-for="(item) in handleFieldList" :key="item.value" :span="24 / cols[colType]">
                            <el-form-item :label="item.label">
                                <el-input v-model="searchData[item.value]" :placeholder="item.placeholder"
                                    v-if="item.type == 'input'" clearable></el-input>
                                <el-select v-model="searchData[item.value]" :placeholder="item.placeholder"
                                    v-if="item.type == 'select'">
                                    <el-option v-for="itemchildren in props.listTypeInfo[item.list]"
                                        :key="itemchildren.value" :label="itemchildren.label"
                                        :value="itemchildren.value"></el-option>
                                </el-select>
                                <el-cascader v-model="searchData[item.value]" :placeholder="item.placeholder"
                                    v-if="item.type == 'cascader'"></el-cascader>
                                <el-date-picker v-model="searchData[item.value]" :placeholder="item.placeholder"
                                    v-if="item.type == 'date'"></el-date-picker>
                                <el-date-picker v-model="searchData[item.value]" :placeholder="item.placeholder"
                                    v-if="item.type == 'time'"></el-date-picker>
                                <el-tree-select v-if="item.type == 'selectTree'" v-model="searchData[item.value]"
                                    :data="props.treeParam.data" :render-after-expand="false"
                                    :show-checkbox="props.treeParam.checkBox" />
                            </el-form-item>

                        </el-col>
                        <el-col :span="handleFieldList.length % cols[colType] == 0 ? 24 :(cols[colType]- handleFieldList.length % cols[colType] )*24 / cols[colType] ">
                            <div style="display: flex;justify-content: flex-end; align-items: center">
                                <el-button type="primary" size="small" @click="handleSearch">搜索</el-button>
                                <el-button type="primary" size="small" @click="handleReset">重置</el-button>

                                <div v-if="isExpand || !isExpand && (handleFieldList.length < props.fieldList.length)">
                                    <el-button type="text" @click="handleExpand" size="small">{{ isExpand ? '收起' : '展开' }}
                                        <el-icon>
                                            <ArrowUpBold v-if="isExpand" />
                                            <ArrowDownBold v-else />
                                        </el-icon></el-button>
                                </div>
                            </div>
                        </el-col>



                    </el-row>

                </el-form>

            </div>

            <div v-if="isShowExpand">
                <el-form :model="searchData">

                </el-form>
            </div>


        </el-card>
    </div>
</template>

<script lang='ts' setup>

import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue';
import { ref, reactive, defineEmits, defineProps, PropType, computed, onActivated, onDeactivated, onMounted, onUnmounted } from 'vue'

/**
 * @params
 *  组件支持 input select selectTree,时间,日期  等方式
 *  fieldList:[]//搜索字段
 *  searchData:[]// 绑定的数据字段
import {ref,reactive,defineEmits,defineProps,PropType,computed,onActivated,onDeactivated,onMounted,onUnmounted} from  'vue'

/**
 * @params
 *  组件支持 input select selectTree,时间,日期  等方式
 *  fieldList:[]//搜索字段
 *  searchData:[]// 绑定的数据字段  
 *  isShowExpand:false// 是否显示展开按钮
 *  isShowReset:false// 是否显示重置按钮
 *  isShowSearch:false// 是否显示搜索按钮
 * 
 * 
 * 
 * 
 * 
*/
type fieldItemType = {
    label: string,
    value: string,

    type: string,
    list?: string,
    placeholder?: string,
    isShow?: boolean,

}
type listTypeInfoType = {
    [key: string]: Array<{ label: string, value: string }>,
}
const props = defineProps({
    fieldList: {
        type: Array<fieldItemType>,
        default: []
    },
    searchData: {
        type: Object as PropType<{ [key: string]: string }>,
        default: []
    },
    // 搜索中的树型选择框 数据
    treeParam: {
        type: Object,
    },
    isShowExpand: {
        type: Boolean,
        default: false
    },
    listTypeInfo: {
        type: Object as PropType<listTypeInfoType>,  //使用自定义的类型 用propType
        default: {}
    },
    isShowReset: {
        type: Boolean,
        default: false
    },
    isShowSearch: {
        type: Boolean,
        default: false
    },

})

const cols = reactive({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
let colType = ref('xl')
onMounted(() => {
    resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent);
    window.addEventListener("resize", resize);
});
onActivated(() => {
    resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent);
    window.addEventListener("resize", resize);
});
onUnmounted(() => {
    window.removeEventListener("resize", resize);
});
onDeactivated(() => {
    window.removeEventListener("resize", resize);
});
// 监听屏幕变化
const resize = (e: UIEvent) => {
    let width = (e.target as Window).innerWidth;
    switch (!!width) {
        case width < 768:
            colType.value = "xs";
            break;
        case width >= 768 && width < 992:
            colType.value = "sm";
            break;
        case width >= 992 && width < 1200:
            colType.value = "md";
            break;
        case width >= 1200 && width < 1920:
            colType.value = "lg";
            break;
        case width >= 1920:
            colType.value = "xl";
            break;
    }
};

const emit = defineEmits(['search', 'reset', 'handleEvent'])

const handleSearch = () => {
    emit('search', props.searchData)
}
const handleReset = () => {
    for (let key in props.searchData) {
        props.searchData[key] = ''
    }
    //重置
    emit('reset', props.searchData)
}


//获取显示的字段 
const showFileld = props.fieldList.filter(item => {
    return !Object.prototype.hasOwnProperty.call(item, 'isShow') || (Object.prototype.hasOwnProperty.call(item, 'isShow') && item.isShow)
})


let isExpand = ref(false)
const handleExpand = () => {
    isExpand.value = !isExpand.value
    emit('handleEvent', 'expand')
}

const handleFieldList = computed(() => {

    return isExpand.value ? showFileld : showFileld.filter((item, index) => index < (cols[colType.value] - 1) || index == 0)
})




</script>

<style lang='scss'>
.search-container {
    margin-bottom: 10px;

    .el-form {
        padding-right: 10px;
    }

    .el-select {
        min-width: 100px
    }

    .el-card__body {
        padding: 10px
    }

    .el-form-item {
        margin: 0 0 0 10px
    }

    .el-col-24,
    .el-col-8,
    .el-col-12,
    .el-col-6 {
        margin-bottom: 10px;
    }

}
</style>
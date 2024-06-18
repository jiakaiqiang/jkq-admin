<template>
    <div class="workspace-containter">
        <el-row :gutter="10" style="margin-bottom:10px;">
            <el-col :span="6">
                <div class="col-item header">
                    <SvgIcon name="component" :iconStyle="iconStyle" />
                    <div class="right">
                        <div>组件树</div>

                        <div>23</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="col-item header">
                    <SvgIcon name="date" :iconStyle="iconStyle" />
                    <div class="right">
                        <div>项目周期</div>

                        <div>18天</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="col-item header">
                    <SvgIcon name="yesterday" :iconStyle="iconStyle" />
                    <div class="right">
                        <div>昨日新提交文件</div>

                        <div>71</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="col-item header">
                    <SvgIcon name="today" :iconStyle="iconStyle" />
                    <div class="right">
                        <div>今日新提交文件</div>

                        <div>12</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-bottom:10px;">
            <el-col :span="16">
                <div class="col-item top top-first">
                    <div class="project-title">项目</div>
                    <div class="project-list">
                        <div v-for=" (item, index) in projectList" :key="index" class="project-list-item"
                            @click="goProject(item)">
                            <div class="project-list-title">
                                <div style="display:flex;align-items:center;">
                                    <i :class="`iconfont ${item.icon}`"
                                        :style="{ color: colorList[index], fontSize: '30px', marginRight: '10px' }"></i>
                                    {{ item.name }}
                                </div>

                                <el-tag :type="handlStatus[item.status].type">{{ handlStatus[item.status].text
                                    }}</el-tag>
                            </div>
                            <div class="project-list-description">{{ item.description }}</div>
                            <div class="project-list-progress">
                                <el-progress :percentage="item.progress"></el-progress>
                            </div>
                            <div class="project-list-time">
                                <div>{{ item.startTime }}</div>
                                <div>{{ item.endTime }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-item  top-first">
                    <div class="project-title">今日天气</div>
                    <div class="weather-box">

                        <div>

                            {{ weatherData.city.Country }} {{ weatherData.city.Province }} {{ weatherData.city.City }}
                        </div>
                        <div>
                            <div>
                                <span>空气质量： <el-tag type="success">优</el-tag></span>

                            </div>
                            <div class="weather-box-item">
                                <span>天气：<el-tag type="primary">{{ weatherData.condition.day_weather }}</el-tag></span>
                                <span>风向：<el-tag type="warning">{{ weatherData.condition.day_wind_direction
                                        }}</el-tag></span>
                                <span>最高温度:<el-tag type="danger">{{ weatherData.condition.max_degree }}</el-tag></span>
                                <span>最低温度:<el-tag type="primary">{{ weatherData.condition.min_degree }}</el-tag></span>
                            </div>

                            <div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-item top top-first">
                    <div class="project-title">每日一句</div>
                    <div class="weather-box">
    
    <div>{{ poetryData.content }}</div>

    <div style="display:flex;justify-content:flex-end"><div>--《{{ poetryData.origin }}》-</div>
    <div>{{ poetryData.author }}</div></div>
                    </div>
                   
                </div>

            </el-col>
            <el-col :span="8">
                <div class="col-item img">
                    <img src="@/assets/workspace-img.svg" />
                </div>
                <div class="col-item" style="margin-bottom:10px">
                    <CodeSubmit></CodeSubmit>
                </div>

            </el-col>
        </el-row>
    </div>
</template>
<script setup lang='ts'>

import CodeSubmit from './commonents/CodeSubmit.vue';
import ProjectStatus from './commonents/ProjectStatus.vue';
import SvgIcon from "@/globalComponent/SvgIcon/index.vue";
import { projectType } from "@/types/project";
import { reactive, ref, onBeforeMount, onMounted, nextTick } from "vue";
import { ElMessage } from 'element-plus'
import { getWeather, getPoetry } from '@/request/api/modules/otherThreeSystem'
type cityType = {
    Country: string, Province: string, City: string
}
type weatherType = {
    city: cityType,
    condition: Object
}
//获取天气信息
let weatherData = ref<weatherType>({
    city: {
        Country: "",
        Province: "",
        City: ""
    },
    condition: {}
})

//古诗
let poetryData = ref<any>({})
onBeforeMount(async () => {

    const data = await getWeather()

    if (data.code == 200) {
        //weatherData = data.result
        weatherData.value = data.result
    }
    //获取古诗

    const getPoetry1 = await getPoetry()
    poetryData.value = getPoetry1
})


const iconStyle = reactive({
    width: "40px",
    height: "40px"
});
const colorList = reactive<Array<string>>(['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'])
//项目信息
const projectList = reactive<Array<projectType>>([
    {
        name: "webgis",
        description: "智慧化城市大屏",
        icon: "icon-WebGIS",
        createTime: "2024-06-15",
        startTime: "2024-06-15",
        endTime: "至今",
        status: "0",
        progress: 0,
        github: "https://github.com/jiakaiqiang/webgL.git"
    },
    {
        name: "webgl",
        icon: "icon-webgl",
        description: "webgl项目",
        createTime: "2024-06-15",
        startTime: "2024-06-15",
        endTime: "至今",
        status: "0",
        progress: 0,

        github: "https://github.com/jiakaiqiang/webgL.git"
    },
    {
        name: "智慧校园",
        description: "用threejs实现的智慧校园,用threejs实现的智慧校园,用threejs实现的智慧校园,用threejs实现的智慧校园,用threejs实现的智慧校园,用threejs实现的智慧校园，用threejs实现的智慧校园，用threejs实现的智慧校园用threejs实现的智慧校园，用threejs实现的智慧校园用threejs实现的智慧校园用threejs实现的智慧校园用threejs实现的智慧校园用threejs实现的智慧校园，用threejs实现的智慧校园，用threejs实现的智慧校园",
        icon: "icon-sanweishujujianmo",
        createTime: "2024-07-18",
        startTime: "2024-07-18",
        endTime: "至今",
        status: "0",
        progress: 0,
        github: "https://github.com/jiakaiqiang/three-js.git"
    },
    {
        name: "nest",
        description: "前端模板库的通用后端接口",
        icon: "icon-jiekou",
        createTime: "2023-05-12",
        startTime: "2023-05-12",
        endTime: "至今",
        status: "1",
        progress: 21,
        github: "https://github.com/jiakaiqiang/task-nest.git"
    },
    {
        name: "脚手架",
        icon: "icon-jiaoshoujia",
        description: "自动进行代码拉取,依赖添加,启动项目",
        createTime: "2022-12-25",
        startTime: "2022-12-25",
        endTime: "至今",
        status: "1",
        progress: 80,
        github: "https://github.com/jiakaiqiang/jkq-cli.git"
    },
    {
        name: "wertc",
        icon: "icon-rtc",
        description: "数据通讯和视频播放的项目",
        createTime: "2024-11-18",
        startTime: "2024-11-18",
        endTime: "至今",
        status: "0",
        progress: 0,
        github: "https://github.com/jiakaiqiang/webgL.git"
    }
]);

//项目进度
const handlStatus = reactive({
    0: {
        type: 'info',
        text: '未开始'
    },
    1: {
        type: 'success',
        text: '进行中'
    },
    2: {
        type: 'danger',
        text: '已结束'
    }
})

//跳转到指定的页面

const goProject = (data: projectType) => {
    ElMessage.success(`即将跳转到${data.name}项目`)
    setTimeout(() => {
        window.open(data.github)
    }, 1000)
}
</script>

<style lang='scss' scoped>
.workspace-containter {
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        &:hover {
            background: var(--jjext-color-background);
            cursor: pointer;
        }

        .right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            >div:nth-of-type(1) {
                font-size: 20px;
                font-weight: 600;
                color: var(--el-text-color-regular);
                margin-bottom: 10px;
            }

            >div:nth-of-type(2) {
                font-size: 14px;
                color: var(--el-text-color-secondary);
            }
        }
    }

    .top-first {
        background: transparent !important;
    }

    .project-title {
        font-size: 20px;
        font-weight: 600;
        color: var(--el-text-color-regular);
        background: var(--el-bg-color);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid var(--el-border-color-light);

    }

    .weather-box {
        background-color: #fff;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 10px;

        >div {
            line-height: 30px;
        }

        .weather-box-item {
            span {

                margin-right: 10px
            }
        }
    }

    .project-list {
        background: var(--el-bg-color);
        padding: 10px;
        border-radius: 10px;

        >div {
            line-height: 30px;
        }

        .weather-box-item {
            span {

                margin-right: 10px
            }
        }
    }

    .project-list {
        box-sizing: border-box;

        display: grid;
        grid-template-columns: 33% 33% 33%;
        /*设置列宽网格线*/
        grid-template-rows: auto auto;
        /*设置行高网格线*/
        row-gap: 5px;
        column-gap: .4%;

        .project-list-item {
            width: 100%;
            background: var(--el-bg-color);
            font-size: 14px;
            padding: 8px;
            border-radius: 8px;

            &:hover {
                background: var(--jjext-color-background);
                cursor: pointer;
            }

            .project-list-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .project-list-description {
                word-break: break-all;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;

                height: 50px;
                font-size: 12px;
                margin: 10px 0;
                color: var(--el-text-color-secondary);
            }

            .project-list-time {
                padding: 10px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                color: var(--el-text-color-secondary);
            }
        }

    }

    .col-item {
        background: var(--el-bg-color);
        border-radius: 10px;
    }

    .top {
        margin-bottom: 10px;
    }

    .img {
        padding: 30px 40px;
        margin-bottom: 10px;
    }
}
</style>
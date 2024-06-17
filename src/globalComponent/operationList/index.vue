<template>
  <div class="operation-container">
    <IconButton
      v-for="(item, index) in props.optionList"
      :key="index"
      :title="item.title"
      :icon="ElementIcon[item.icon]"
      @click="handleClick(item)"
    ></IconButton>
    <!-- Your code here -->
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from "vue";
import IconButton from "@/globalComponent/IconButton/index.vue";
import { optionType } from "@/globalComponent/types";
import * as ElementIcon from "@element-plus/icons-vue";

const props = defineProps<{
  optionList: optionType[];
}>();

const emit = defineEmits(["handleClick"]);

const handleClick = (item: any) => {
  emit("handleClick", item.event);
};
</script>

<style lang='scss' >
.operation-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
 .el-button {
    margin-right: 8px;
  }
}
/* Your styles here */
</style>
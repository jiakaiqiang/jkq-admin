<template>
  <div class="person-container">
    <div class="person-info">
      <div class="person-info-item">
        <div class="person-info-item-label">姓名</div>
        <div class="person-info-item-value">张三</div>
      </div>
      <div class="person-info-item">
        <div class="person-info-item-label">年龄</div>
        <div class="person-info-item-value">25</div>
      </div>
      <div class="person-info-item">
        <div class="person-info-item-label">职业</div>
        <div class="person-info-item-value">工程师</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
// 可以添加响应式数据
const personInfo = {
  name: '张三',
  age: 25,
  job: '工程师'
}
</script>

<style scoped lang='scss'>
.person-container {
  padding: 20px;
  
  .person-info {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    &-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      &-label {
        width: 80px;
        color: #666;
        font-size: 14px;
      }

      &-value {
        flex: 1;
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>
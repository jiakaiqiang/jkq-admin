<template>
  <div class="page-form-table">
    <el-form :model="formTableInfo" ref="pageFormTable">
      <el-table
        :data="formTableInfo.data"
        :border="true"
        :show-summary="formTableInfo.showSummary?formTableInfo.data:false"
        :summary-method="summaryMethod"
        class="page-table linkman-table">
        <template  v-for="(item,index) in formTableInfo.fieldList" >
          <el-table-column v-if="item.children&&item.children.length>0" :label="item.label" :key="index">
            <el-table-column
              v-for="(childrenItem,childIndex) in item.children"
              :label="childrenItem.label"
              :width="childrenItem.width"
              :key="childIndex"
              v-slot="scope"
            >
              <!--scope循环的是tableData.data的值  -->
              <el-form-item
                v-if="childrenItem.type == 'input'"
                :prop="'data.' + scope.$index  + '.' + childrenItem.value"
                :rules="[
                { required: childrenItem.required, message: '请输入' + childrenItem.label},
                ]"
              >
                <el-input style="width:100%" v-model="scope.row[childrenItem.value]"
                          :clearable="childrenItem.clearable ? childrenItem.clearable: false"
                          :disabled="childrenItem.disabled ? childrenItem.disabled: false" :placeholder="'请输入'+ childrenItem.label">
                </el-input>

              </el-form-item>
              <el-form-item
                v-if="childrenItem.type == 'slot'"
                :prop="'data.' + scope.$index  + '.' + childrenItem.value"
              >
                <slot :name="'fromTable-' + scope.$index + childrenItem.value" :data="scope.row[childrenItem.value]"></slot>

              </el-form-item>
              <el-form-item
                v-if="childrenItem.type == 'checkBox'"
                :prop="'data.' + scope.$index  + '.' + childrenItem.value"
                :rules="[
                { required: childrenItem.required||false, message: '请选择' + childrenItem.label},
                ]"
              >

                <el-checkbox-group v-model="scope.row[childrenItem.value]">
                  <el-checkbox
                    v-for="childItems in listTypeInfo[childrenItem.list]"
                    :key="childItems.value"
                    :label="childItems.value"
                    :disabled="childItems.disabled ? childItems.disabled: false"
                  >{{childItems.label}}
                  </el-checkbox>

                </el-checkbox-group>

              </el-form-item>
              <el-form-item
                v-if="childrenItem.type == 'select'"
                :prop="'data.' + scope.$index  + '.' + childrenItem.value"
                :rules="[
                { required: childrenItem.required||false, message: '请选择' + childrenItem.label},
                ]"
              >
                <el-select style="width:100%" v-model="scope.row[item.value]"
                           :clearable="childrenItem.clearable ? childrenItem.clearable: false"
                           :disabled="childrenItem.disabled ? childrenItem.disabled: false" :placeholder="'请选择'+ childrenItem.label">
                  <el-option
                    v-for="items in listTypeInfo[childrenItem.list]"
                    :key="items.value"
                    :label="items.label"
                    :value="items.value">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-table-column>
          </el-table-column>
          <el-table-column
            v-else
            :label="item.label"
            :width="item.width"
            v-slot="scope"
          
          >
            <!--scope循环的是tableData.data的值  -->
            <el-form-item
              v-if="item.type == 'input'||item.type=='textarea'"
              :prop="'data.' + scope.$index  + '.' + item.value"
              :rules="[
                { required: item.required, message: '请输入' + item.label},
                ]"
            >
              <el-input style="width:100%" v-model="scope.row[item.value]"
                        :clearable="item.clearable ? item.clearable: false"
                        :type="item.type"
                        :autosize="item.type=='textarea'?item.autosize?item.autosize:{minRows:4,maxRows: 10}:false"
                        :disabled="item.disabled ? item.disabled: false" :placeholder="'请输入'+ item.label">
              </el-input>

            </el-form-item>
            <!--时间-->
            <el-form-item
              v-if="item.type == 'datetimerange'"
              :prop="'data.' + scope.$index  + '.' + item.value"
              :rules="[
                { required: item.required, message: '请输入' + item.label},
                ]"
            >
              <el-date-picker
                v-model="scope.row[item.value]"
                type="datetime"
                range-separator="至"
                start-placeholder="开始日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                clearable
                end-placeholder="结束日期">
              </el-date-picker>

            </el-form-item>
            <el-form-item
              v-if="item.type == 'slot'"
              :prop="'data.' + scope.$index  + '.' + item.value"
            >
              <slot :name="'fromTable-' + scope.$index + item.value" :data="scope.row[item.value]"></slot>

            </el-form-item>
            <el-form-item
              v-if="item.type == 'checkBox'"
              :prop="'data.' + scope.$index  + '.' + item.value"
              :rules="[
                { required: item.required||false, message: '请选择' + item.label},
                ]"
            >

              <el-checkbox-group v-model="scope.row[item.value]">
                <el-checkbox
                  v-for="items in listTypeInfo[item.list]"
                  :key="items.value"
                  :label="items.value"
                  :disabled="item.disabled ? item.disabled: false"
                >{{items.label}}
                </el-checkbox>

              </el-checkbox-group>

            </el-form-item>
            <el-form-item
              v-if="item.type == 'select'"
              :prop="'data.' + scope.$index  + '.' + item.value"
              :rules="[
                { required: item.required||false, message: '请选择' + item.label},
                ]"
            >
              <el-select style="width:100%" v-model="scope.row[item.value]"
                         :clearable="item.clearable ? item.clearable: false"
                         :disabled="item.disabled ? item.disabled: false" :placeholder="'请选择'+ item.label">
                <el-option
                  v-for="items in listTypeInfo[item.list]"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-table-column>
        </template>

        <el-table-column
          label="操作"
          v-if="formTableInfo.handle ? true : false"
          :fixed="formTableInfo.handle.fixed||'right'"
          :width="formTableInfo.handle.width||200">
          <template v-slot="scope">
            <el-button
              v-for="(item,index) in formTableInfo.handle.btList"
              :type="item.type"
              :key="index"
              icon="el-icon-delete"
              :disabled="item.disabled?item.disabled:false"
              @click="handleClick(item.event,scope.$index)">
              <span v-if="item.showText">{{item.label}}</span>
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
        /*
        * formTableInfo的格式
        * data:[] //存放表单绑定的数据
        * fieldList:[]//表单类型的数据 格式如下
        * {label:"表单名称",value:"绑定的值",type:'表单类型',list:'select表单的选择列表'}
        
        */
      formTableInfo: {
        type: Object,
        default: () => {
          return {}
        }
      },
      listTypeInfo: {
        type: Object
      },

    },
    created() {

    },
    methods: {
      summaryMethod(params){
        this.$emit('handleEvent','summary',params)
      },
      handleClick(event, index) {
        this.$emit('handleClick', event, index)
      }
    }
  }
</script>

<style scoped lang='scss'>

</style>

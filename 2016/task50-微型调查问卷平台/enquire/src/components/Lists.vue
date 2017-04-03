<template>
  <div>
    <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="时间"
          prop="date">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template scope="scope">
            <el-button :plain="true">编辑</el-button>
            <el-button :plain="true">删除</el-button>
            <el-button :plain="true">查看</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-button style="margin-top: 5px">删除</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Table, TableColumn, Button, Tooltip } from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Tooltip)

export default {
  name: 'lists',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        title: 'first enquiry here',
        status: '发布中'
      }, {
        date: '2016-05-02',
        title: 'first enquiry here',
        status: '发布中'
      }, {
        date: '2016-05-02',
        title: 'first enquiry here',
        status: '发布中'
      }]
    }
  }
}
</script>

<style lang="scss">

</style>

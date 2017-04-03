<template>
  <div class="create">
    <el-button type="primary" size="large"><i class="el-icon-plus"></i> 新建问卷</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Button } from 'element-ui'

Vue.use(Icon)
Vue.use(Button)

export default {
  name: 'createNew'
}
</script>

<style lang="scss">
.create {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  border: 1px solid #ddd;
  padding: 100px 100px;
  box-shadow: 3px 3px 5px #ddd;
}
</style>

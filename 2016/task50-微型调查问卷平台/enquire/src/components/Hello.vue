<template lang="html">
  <header class="header">
    <div class="title-wrap">
      <h1 class="title" @click.prevent.stop="goToHome"><i class="el-icon-edit"></i> {{ title }}</h1>
      <router-link type="text" :to="{ path: 'lists' }">我的问卷</router-link>
    </div>
  </header>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'element-ui'

Vue.use(Icon)

export default {
  data () {
    return {
      title: '微型问卷调查平台'
    }
  },
  methods: {
    goToHome () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
header {
  width: 100%;
  background-color: #20a0ff;
  .title-wrap {
    width: 90%;
    margin: 0 auto;
    h1 {
      margin: 0;
      padding: 0;
      color: #fff;
      font-size: 24px;
      display: inline-block;
      cursor: pointer;
    }
    a {
      color: #fff;
      margin-left: 20px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>

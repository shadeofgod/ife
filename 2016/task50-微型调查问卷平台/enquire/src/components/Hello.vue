<template lang="html">
  <header class="header">
    <div class="title-wrap">
      <h1 class="title" @click.prevent.stop="goToHome"><i class="el-icon-edit"></i> {{ title }}</h1>
      <router-link type="text" :to="{ path: 'lists' }">我的问卷</router-link>
      <el-button type="primary" @click="gotToNew"  v-if="notMainPage"><i class="el-icon-plus"></i> 新建问卷</el-button>
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
      title: '微型问卷调查平台',
      notMainPage: false
    }
  },
  watch: {
    $route () {
      this.notMainPage = this.$router.currentRoute.path !== '/'
    }
  },
  methods: {
    goToHome () {
      this.$router.push({ path: '/' })
    },
    gotToNew () {
      this.$router.push({ path: '/new_enquire' })
    }
  }
}
</script>

<style lang="scss">
header {
  width: 100%;
  background-color: #20a0ff;
  padding: 5px 0;
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

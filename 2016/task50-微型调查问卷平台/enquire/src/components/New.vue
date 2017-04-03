<template>
  <div class="enq-container">
    <div>
      <h1 ref="title" contenteditable="true" v-model="enq.title">{{ enq.title }}</h1>
    </div>
    <main>
      <div class="prob-type-selector">
        <div :class="toggleQuestionSelector">
          <el-button><i class="el-icon-information"></i> 单选题</el-button>
          <el-button><i class="el-icon-circle-check"></i> 多选题</el-button>
          <el-button><i class="el-icon-document"></i> 文本题</el-button>
        </div>
        <el-button type="text" @click="addNewQuestion"><i :class="toggleIcon"></i> 添加问题</el-button>
      </div>
    </main>
    <footer>
      <span>问卷截止日期: </span>
      <el-date-picker
        v-model="enq.deadline"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button @click="save">保存问卷</el-button>
      <el-button @click="publish">发布问卷</el-button>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, DatePicker, MessageBox, Message } from 'element-ui'

Vue.use(Icon)
Vue.use(DatePicker)

export default {
  name: 'createNew',
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      enq: {
        title: '这里是标题',
        deadline: ''
      },
      toggleQuestionSelector: ''
    }
  },
  computed: {
    toggleIcon () {
      return this.toggleQuestionSelector ? 'el-icon-minus' : 'el-icon-plus'
    }
  },
  methods: {
    addNewQuestion () {
      this.toggleQuestionSelector = this.toggleQuestionSelector ? '' : 'show'
    },
    save () {
      Message.success({
        message: '保存成功！',
        showClose: true
      })
    },
    publish () {
      if (!this.enq.deadline) {
        Message.warning({
          message: '请选择截止日期！',
          showClose: true
        })
        return
      }
      let tips = '是否确认发布该问卷？截止时间为' + this.$util.dateFormat(this.enq.deadline)
      MessageBox.confirm(tips, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Message({
          type: 'success',
          message: '发布成功!',
          showClose: true
        })
      }).catch(() => {
        return
      })
    }
  }
}
</script>

<style lang="scss">
.enq-container {
  margin: 20px;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 3px 3px 5px #ddd;
  h1 {
    text-align: center;
    border-bottom: 2px solid #ddd;
    padding: 10px;
    margin: 0;
    outline: none;
  }
  main {
    border-bottom: 2px solid #ddd;
    text-align: center;
    padding: 30px 10px;
    .prob-type-selector {
      background-color: #ddd;
      padding: 30px 0;
      transition: 0.5s;
      div {
        transition: 0.5s;
        overflow: hidden;
        height: 0;
        &.show {
          height: 36px;
        }
      }
    }
  }
  footer {
    text-align: center;
    padding: 20px;
    button {
      margin-left: 20px;
    }
  }
}
</style>

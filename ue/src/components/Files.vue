<template>
  <el-table :data="files" border stripe style="width: 100%">
    <el-table-column prop="name" label="名称" width="280px"></el-table-column>
    <el-table-column prop="upload_at" label="上传时间" width="200px" :formatter="formatterUploadAt"></el-table-column>
    <el-table-column prop="remark" label="备注"></el-table-column>
    <el-table-column fixed="right" label="操作" width="160px">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button size="mini" type="primary" @click="handleConsole(scope.index,scope.row)">ETD</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Vue from 'vue'
import { Table, TableColumn, Message, MessageBox } from 'element-ui'

Vue.use(Table).use(TableColumn)

import browser from '@/apis/browse'

export default {
  data() {
    return {
      files: null
    }
  },
  methods: {
    formatterUploadAt(row, column, cellValue) {
      const time = new Date(cellValue);
      const year = time.getFullYear(); 
      const month = time.getMonth()+1; 
      const date = time.getDate(); 
      const hour = time.getHours(); 
      const minute = time.getMinutes(); 
      const second = time.getSeconds(); 
      return year + "年" + month + "月" + date + "日" + " " + this.isGreaterTen(hour) + ":" + this.isGreaterTen(minute) + ":" + this.isGreaterTen(second);
    },
    isGreaterTen(time) {
      return time > 9 ? time : '0' + time;
    },
    handleConsole(index, file) {
      this.$router.push({ path: '/console', query: { src: file.path } })
    },
    handleDelete(index, file) {
      MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        browser.remove(file).then(() => {
          this.files.splice(index, 1)
          Message.success({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        Message.success({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getFileList() {
      browser.files().then(files => this.files = files)
    }
  },
  mounted() {
    this.getFileList();
    this.$eventHub.$on('getFileList', () => {
      this.getFileList();
    })
  }
}
</script>
<style>
.el-drawer__body {
  padding: 20px;
}
</style>

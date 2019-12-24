<template>
  <el-table :data="logs" border stripe style="width: 100%">
    <el-table-column prop="dispatcher" label="分发结果" width="280px"></el-table-column>
    <el-table-column prop="dispatch_at" label="发送时间" width="200px" :formatter="formatterUploadAt"></el-table-column>
    <el-table-column prop="strResult" label="结果"></el-table-column>
    <el-table-column label="操作" >
				<template scope="scope">
          <a :href="scope.row.result.outPath" download="" v-if="scope.row.result && scope.row.result.outPath">下载</a>
        </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Vue from 'vue'
import { Table, TableColumn, Message } from 'element-ui'
Vue.use(Table).use(TableColumn)

import browser from '@/apis/browse'

export default {
  name: 'dispatch-logs',
  props: ['src'],
  data() {
    return {
      logs: []
    }
  },
  mounted() {
    this.dispatchList(this.src)
    this.$eventHub.$off('dispatchList')
    this.$eventHub.$on('dispatchList', src => {
      this.dispatchList(src, 'isFromBtn')
    })
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
    dispatchList(src, type) {
      browser.dispatchLogs(src).then(logs => {
        logs.forEach(l => {
          l.strResult = JSON.stringify(l.result)
        })
        this.logs = logs
        if (!type) {
          return
        }
        Message({ message: '分发完成', type: 'success', showClose: true })
      })
    }
  }
}
</script>
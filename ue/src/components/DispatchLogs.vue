<template>
  <el-table :data="logs" border stripe style="width: 100%">
    <el-table-column prop="dispatcher" label="分发结果" width="280px"></el-table-column>
    <el-table-column prop="dispatch_at" label="发送时间" width="200px"></el-table-column>
    <el-table-column prop="strResult" label="结果"></el-table-column>
    <el-table-column label="操作" >
				<template scope="scope">
          <a :href="scope.row.result.outPath" download="" v-if="scope.row.result && scope.row.result.outPath">下载</a>
					<!-- <el-button size="small" type="primary" v-if="scope.row.result.outPath" @click="handleDownload(scope.$index, scope.row)">下载</el-button> -->
        </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Vue from 'vue'
import { Table, TableColumn } from 'element-ui'
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
    this.dispatchList(this.src);
    this.$eventHub.$on('dispatchList', src => {
      this.dispatchList(src);
    })
  },
  methods: {
    handleDownload(index, row) {
      console.log(index, row)
    },
    dispatchList(src) {
      console.log(src)
      browser.dispatchLogs(src).then(logs => {
        logs.forEach(l => {
          l.strResult = JSON.stringify(l.result)
        })
        this.logs = logs
      })
    }
  }
}
</script>
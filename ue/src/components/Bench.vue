<template>
  <div>
    <el-upload class="etd-upload" action="/etd/api/upload" :data="fileInfo" :on-success="handleAvatarSuccess">
      <el-button size="small" type="primary">上传xlsx文件</el-button>
    </el-upload>
    <el-input type="textarea" autosize placeholder="备注" v-model="fileInfo.remark"></el-input>
  </div>
</template>
<script>
import Vue from 'vue'
import { Upload, Button, Input } from 'element-ui'
Vue.use(Upload)
  .use(Button)
  .use(Input)

export default {
  data() {
    return { fileInfo: { remark: '' } }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.$eventHub.$emit('getFileList')
    }
  }
}
</script>
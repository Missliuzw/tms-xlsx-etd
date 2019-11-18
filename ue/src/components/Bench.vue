<template>
  <div>
    <el-upload class="etd-upload" action="/etd/api/upload" :data="fileInfo" :on-success="handleAvatarSuccess" :on-preview="handlePreview">
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
  // created() {
  //   this.$eventHub.$on('download', res => {
  //     console.log(res)
  //   })
  // },
  methods:{
    handleAvatarSuccess() {
      this.$eventHub.$emit('getFileList')
    },
    handlePreview(file) {
      console.log(file)
      const params = JSON.parse(file.url)
      const type = params.url.split('.')[4]
      const arr = ['doc', 'docx', 'xlsx', 'xls', 'ppt', 'pptx'];
      if (arr.includes(type)) {
        document.location.href = params.url
      } else {
        window.open(params.url, 'hello')
      }
    }
  }
}
</script>
 <template>
  <tms-frame class="etd-console" :display="{header:true,footer:true,right:true}">
    <template v-slot:center>
      <tms-flex direction="column" align-items="stretch">
        <tms-flex>
          <router-link to="/home">首页</router-link>
          <el-radio-group v-model="category" v-on:change="tabChange">
            <el-radio-button label="raw">全部</el-radio-button>
            <el-radio-button label="passed">通过</el-radio-button>
            <el-radio-button label="failed">去除</el-radio-button>
          </el-radio-group>
          <router-link :to="'/dispatch?src='+src">分发</router-link>
        </tms-flex>
        <rows :columns="columns" :rows="rows" @updateList="shiftCategory"></rows>
      </tms-flex>
    </template>
    <template v-slot:right>
      <tms-flex direction="column">
        <div>{{file.name}}</div>
        <div>
          <el-checkbox-group v-model="checkedDispatchers">
            <el-checkbox v-for="d in dispatchers" :key="d[0]" :label="d[0]" style="display: block;">{{d[2].description}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <el-button size="mini" type="primary" @click="extract">提取</el-button>
          <el-button size="mini" type="primary" @click="transform">加工</el-button>
        </div>
      </tms-flex>
    </template>
  </tms-frame>
</template>
<script>
import Vue from 'vue'
import { Frame, Flex } from 'tms-vue-ui'
Vue.use(Frame).use(Flex)

import {
  Button,
  RadioGroup,
  RadioButton,
  CheckboxGroup,
  Checkbox,
  Message
} from 'element-ui'
Vue.use(Button)
  .use(RadioGroup)
  .use(RadioButton)
  .use(CheckboxGroup)
  .use(Checkbox)

import Rows from './components/Rows.vue'
import browser from '@/apis/browse'

export default {
  name: 'etd-console',
  components: { Rows },
  data() {
    return {
      file: { name: '' },
      category: 'raw',
      columns: null,
      rows: null,
      dispatchers: [],
      checkedDispatchers: [],
    }
  },
  props: ['src'],
  mounted() {
    browser.fileInfo(this.src).then(file => {
      this.file = file
      browser.columns().then(cols => {
        this.columns = cols
        this.shiftCategory()
      })
    })
    browser.transforms().then(dispatchers => {
      this.dispatchers = dispatchers
    })
  },
  methods: {
    tabChange(currentTab) {
      this.category = currentTab;
      this.shiftCategory();
    },
    shiftCategory(page = 1, size = 10, type) {
      const params = {
        src: this.src,
        category: this.category,
        page: page,
        size: size
      }
      browser.rows(params).then(rows => {
        this.rows = rows
        if (!type) {
          return
        }
        const msg = type === 'extract' ? '提取完成' : type === 'transform' ? '加工完成' : ''
        Message({ message: msg, type: 'success', showClose: true })
      })
    },
    extract() {
      browser.extract(this.src).then(() => {
        this.shiftCategory(undefined, undefined, 'extract')
      })
    },
    transform() {
      browser.transform(this.src, this.checkedDispatchers).then(() => {
        this.shiftCategory(undefined, undefined, 'transform')
      })
    }
  }
}
</script>
<style>
.etd-console .tms-frame__main__center {
  width: calc(75% - 16px);
}
</style>

<template>
  <div v-if="rows && rows.total">
    <el-table :data="rows.rows" border stripe style="width: 100%">
      <el-table-column v-for="c in columns" :key="c.name" :prop="c.name" :label="c.label"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 25, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Pagination
} from 'element-ui'
Vue.use(Pagination)
export default {
  props: { 
    columns: { default: [] }, 
    rows: { default: [] } 
  },
  mounted() {
    if (this.rows && this.rows.total) {
      this.total = this.rows.total
    }
  },
  watch: {
    rows(newVal) {
      this.total = newVal.total
    }
  },
  methods: {
    handleSizeChange(val) {
      let lastSize = this.size
      let newPage = Math.ceil(lastSize * this.page / val)
      this.size = val
      this.$emit('updateList', newPage, this.size)
    },
    handleCurrentChange(val) {
      const maxPage = Math.ceil(this.total / this.size)
      if (val > maxPage) {
        return;
      }
      this.page = val
      this.$emit('updateList', this.page, this.size)
    }
  },
  data() {
    return {
      currentPage: 1,
      page: 1,
      size: 10,
      total: 0
    };
  }
}
</script>
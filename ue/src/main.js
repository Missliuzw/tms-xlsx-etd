import Vue from 'vue'
import Shell from './Shell.vue'
import router from './router.js'
// eslint-disable-next-line no-unused-vars
import { Message } from 'element-ui'
import { TmsAxiosPlugin } from 'tms-vue'
Vue.use(TmsAxiosPlugin)

const rule = Vue.TmsAxios.newInterceptorRule({
  requestParams: new Map([['access_token', localStorage.getItem('access_token') || '']]),
  onRetryAttempt: (res) => {
    if(res.data.code === 20001){
      // access_token过期
      router.push('/login');
    }
  },
  onResultFault: res => {
    return new Promise(resolve => {
      Message({ message: res.data.msg, type: 'error', showClose: true })
      resolve(true)
    })
  }
})
const name = process.env.VUE_APP_TMSAXIOS_NAME
Vue.TmsAxios({
  name,
  rules: [rule]
})

Vue.prototype.$eventHub = new Vue();
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Shell)
}).$mount('#app')

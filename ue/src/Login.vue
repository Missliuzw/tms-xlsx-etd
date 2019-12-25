<template>
  <tms-frame id="app" class="login" center-color="#f0f3f6" left-width="25%" right-width="25%" :display-sm="{header:true,footer:false}">
		<template v-slot:header>
			<p>ETD</p>
		</template>
		<template v-slot:center>
			<div class="login-account">
				<div class="login-account-form">
					<tms-login :data="data" :submit="getTokenSuccess"></tms-login>
				</div>
				<div class="login-account-third"></div>
			</div>
		</template>
	</tms-frame>
</template>
<script>
import Vue from 'vue'
import { Login } from 'tms-vue-ui'
import browser from './apis/browse'
const { fnGetCaptcha, fnGetToken } = browser
Vue.use(Login, { fnGetCaptcha, fnGetToken })
export default {
  data() {
    return {
      data: [
        {
          // 当前双向绑定的属性名
          key: 'uname',
          // 组件类型
          type: 'text',
          placeholder: '用户名'
        },
        {
          key: 'password',
          type: 'password',
          placeholder: '密码'
        },
        {
          key: 'pin',
          type: 'code',
          placeholder: '验证码'
        }
      ]
    }
  },
  methods: {
    getTokenSuccess(token) {
      const name = process.env.VUE_APP_TMSAXIOS_NAME;
      localStorage.setItem('access_token', token)
      // 去掉之前的token
      this.TmsAxios.remove('access_token');
      // 添加token
      this.TmsAxios(name).rules[0].requestParams.set('access_token', token)
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="less" scope>
.login {
  .tms-frame__header {
    margin-top: 40px;
    text-align: center;
    & > p {
      font-size: 18px;
      font-weight: 700;
    }
  }
  .tms-frame__main {
      & > .tms-frame__main__center {
          & > .login-account {
              width: 100%;
              & > .login-account-form {
                  width: 330px;
                  margin: 0 auto;
                  padding: 50px 0;
                  & > .login-btn {
                      width: 100%;
                      margin-bottom: 10px;
                  }
              }
          }
      }
  }
}
</style>
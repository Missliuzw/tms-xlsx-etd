import { TmsAxios } from 'tms-vue'

const name = process.env.VUE_APP_TMSAXIOS_NAME
const api = process.env.VUE_APP_API_HOST

export default {
  columns() {
    return TmsAxios.ins(name)
      .get(`${api}/columns`)
      .then(rst => rst.data.result)
      .catch(err => Promise.reject(err))
  },
  files() {
    return TmsAxios.ins(name)
      .get(`${api}/files`)
      .then(rst => rst.data.result)
      .catch(err => Promise.reject(err))
  },
  fileInfo(src) {
    return TmsAxios.ins(name)
      .get(`${api}/fileInfo?src=${src}`)
      .then(rst => rst.data.result)
      .catch(err => Promise.reject(err))
  },
  rows(src, category) {
    return TmsAxios.ins(name)
      .get(`${api}/rows?src=${src}&category=${category}`)
      .then(rst => rst.data.result)
      .catch(err => Promise.reject(err))
  },
  remove(file) {
    return TmsAxios.ins(name)
      .get(`${api}/remove?src=${file.path}`)
      .then(rst => rst.data.result)
      .catch(err => Promise.reject(err))
  },
  extract(src) {
    return TmsAxios.ins(name)
      .get(`${api}/extract?src=${src}`)
      .then(rst => rst.data.result)
      .catch(err => Promise.reject(err))
  },
  transform(src, transforms) {
    return TmsAxios.ins(name)
      .get(`${api}/transform?src=${src}&transforms=${transforms}`)
      .then(rst => rst.data.result)
      .catch(err => Promise.reject(err))
  },
  transforms() {
    return TmsAxios.ins(name)
      .get(`${api}/transforms`)
      .then(rst => rst.data.result)
      .catch(err => Promise.reject(err))
  },
  dispatchers() {
    return TmsAxios.ins(name)
      .get(`${api}/dispatchers`)
      .then(rst => rst.data.result)
      .catch(err => Promise.reject(err))
  },
  dispatch(src, dispatchers) {
    return TmsAxios.ins(name)
      .get(`${api}/dispatch?src=${src}&dispatcher=${dispatchers}`)
      .then(rst => rst.data.result)
      .catch(() => true)
  },
  dispatchLogs(src) {
    return TmsAxios.ins(name)
      .get(`${api}/dispatchLogs?src=${src}`)
      .then(rst => rst.data.result)
      .catch(() => true)
  },
  fnGetCaptcha() {
    return TmsAxios.ins(name)
    .post(`/etd/ue/auth/captcha`)
    .then(rst => Promise.resolve(rst.data))
    .catch(err => Promise.reject({err, message: err.msg}))
  },
  fnGetToken(params) {
    return TmsAxios.ins(name)
    .post(`/etd/ue/auth/token`, params)
    .then(rst => Promise.resolve(rst.data))
    .catch(err => Promise.reject({err, message: err.msg}))
  }
}

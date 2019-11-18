// const target = 'http://192.168.43.14:3530'
const target = 'http://192.168.102.110:3530'
module.exports = {
  // publicPath: '/etd/api',
  // 基本路径
  publicPath: "",

  // 输出文件目录
  outputDir: "../back/public/etdue",
  devServer: {
    proxy: target
  }
}

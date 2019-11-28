// const target = 'http://192.168.43.14:3530'
const target = 'http://192.168.102.45'
const port = ':3530'
module.exports = {
  // 基本路径
  publicPath: "/etdue/",

  // 输出文件目录
  outputDir: "../back/public/etdue",
  devServer: {
    proxy: {
      // proxy: target
      "/etd/ue/auth": {
        target: `${target}`,
      },
      "/etd/api": {
        target: `${target}${port}`,
      }
    }
  }
}

const target = 'http://192.168.102.110:3530'
module.exports = {
  // publicPath: '/etd/api',
  devServer: {
    proxy: target
  }
}

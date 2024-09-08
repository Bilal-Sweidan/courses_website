const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // proxy: 'http://localhost:8081'
  devServer:{
    port: 8082
  }
})

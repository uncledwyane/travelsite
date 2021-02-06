/**
 * css 浏览器兼容前缀功能
 */

module.exports = {
    loader: 'postcss-loader',
    plugins: [
      require('autoprefixer')()
    ]
  }
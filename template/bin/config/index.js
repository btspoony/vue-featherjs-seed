// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  default: {
    root: path.resolve(__dirname, '../../dist'),
    backend: 'backend',
    frontend: 'frontend'
  },
  build: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'public',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'public',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

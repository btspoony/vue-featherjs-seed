require('./check-versions')()
const config = require('./config')
const appBase = require('../' + config.default.backend + '/src/app-base')
const appWrapper = require('../' + config.default.backend + '/src/app')

const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = {{#if_or unit e2e}}process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : {{/if_or}}require('./webpack.dev.conf')
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const compiler = webpack(webpackConfig)
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  appBase.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
appBase.use(require('connect-history-api-fallback')())

// serve webpack bundle output
appBase.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
appBase.use(hotMiddleware)

// Complete app config
const app = appWrapper( appBase )

// default port where dev server listens for incoming traffic
const port = process.env.PORT || app.get('port')
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  const uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})

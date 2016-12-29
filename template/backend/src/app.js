'use strict'

const serveStatic = require('feathers').static

const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const socketio = require('feathers-socketio')
const bodyParser = require('body-parser')
const middleware = require('./middleware')
const services = require('./services')

module.exports = function (app, option) {
  if (option === undefined) {
    if (!!app && typeof app.use === 'function') {
      option = {}
    } else {
      option = app || {}
      app = require('./app-base')
    }
  }

  if (option.static) {
    app.use('/', serveStatic(app.get('public')))
  }

  app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .configure(hooks())
    .configure(rest())
    .configure(socketio())
    .configure(services)
    .configure(middleware)

  return app
}

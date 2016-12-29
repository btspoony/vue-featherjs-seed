'use strict'

const path = require('path')
const feathers = require('feathers')
const configuration = require('feathers-configuration')
const favicon = require('serve-favicon')
const compress = require('compression')
const cors = require('cors')

const app = feathers()
app.configure(configuration(path.join(__dirname, '..')))

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon(path.join(app.get('public'), 'favicon.ico')))

module.exports = app


'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./taxi-web.cjs.production.min.js')
} else {
  module.exports = require('./taxi-web.cjs.development.js')
}

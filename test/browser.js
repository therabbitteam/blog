var _ = require('lodash')

const Browser = require('zombie')

process.env.NODE_ENV = 'test'
const PORT = _.random(5000, 6000)

Browser.localhost('beta.rabbitlearn.com', PORT)

module.exports.Browser = Browser
module.exports.PORT = PORT

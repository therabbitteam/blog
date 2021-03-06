var _ = require('lodash')

const Browser = require('zombie')
const domain = 'rabbitlearn.com'

process.env.NODE_ENV = 'test'
const PORT = _.random(5000, 6000)

Browser.localhost(domain, PORT)

module.exports.Browser = Browser
module.exports.PORT = PORT
module.exports.domain = domain

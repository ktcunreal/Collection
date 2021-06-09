const api = require('express')()
const bodyParser = require('body-parser')

api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
api.use('/api', require('./api/router'))
api.listen(3000)

module.exports = {
  mysql: require('./mysql/index'),
  mongodb: require('./mongodb/index'),
  rtc: require('./utils/rtc')
}

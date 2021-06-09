module.exports = {
  jwtCipher: 'jwtpassphrase',
  mongodbConf: 'mongodb://db1user:db1pwd@localhost:27017/db1',
  redisConf: {
    auth: 'redisroot'
  },
  mysqlConf: {
    host: '127.0.0.1',
    user: 'db1user',
    password: 'db1password',
    database: 'db1',
    connectionLimit: 10,
    Promise: require('bluebird')
  }
}

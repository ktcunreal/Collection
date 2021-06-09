const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = {
  connection: mongoose.connect(require('../config').mongodbConf, {useMongoClient: true})
    .then(() => {
      console.log('Connected to mongodb server!')
    })
    .catch((err) => {
      console.error(err)
    }),
  USERS: mongoose.model('users', require('./schema').userSchema),
  RANK: mongoose.model('rank', require('./schema').rankSchema),
  QUIZ: mongoose.model('quiz', require('./schema').quizSchema)
}

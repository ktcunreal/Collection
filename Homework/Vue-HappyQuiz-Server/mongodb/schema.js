const Schema = require('mongoose').Schema

const userSchema = new Schema({
  username: String,
  password: String,
  phonenumber: String,
  customsetting: Boolean,
  contactlist: Array
})

const rankSchema = new Schema({
  username: String,
  anwsered: Array
})

const quizSchema = new Schema({
  type: String,
  author: String,
  question: String,
  anwsers: Array,
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = {
  quizSchema: quizSchema,
  rankSchema: rankSchema,
  userSchema: userSchema
}

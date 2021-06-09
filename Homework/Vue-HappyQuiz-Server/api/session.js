const session = require('express').Router()
const jwt = require('jsonwebtoken')
const USERS = require('../mongodb/index').USERS

session.route('/')
  .post((req, res) => {
    USERS.find({
      $and: [{username: req.body.username}, {password: req.body.password}]
    }).limit(1).exec((err, result) => {
      if (err) {
        throw err
      }
      if (result.length < 1) {
        return res.status(404).json({message: 'Error', detail: 'Invalid username or password'})
      } else {
        let token = jwt.sign({id: req.body.username, vid: result[0]._id}, require('../config').jwtCipher)
        return res.json({message: 'Login Complete', token: token})
      }
    })
  })

module.exports = session

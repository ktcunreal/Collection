const temptoken = require('express').Router()
const jwt = require('jsonwebtoken')
const jwtCipher = require('../config').jwtCipher

temptoken.route('/')
  .get((req, res) => {
    let token = jwt.sign({id: 'anonymous', vid: 'anonymous'}, jwtCipher, {expiresIn: 60 * 30})
    return res.send(token)
  })

module.exports = temptoken

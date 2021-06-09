const rank = require('express').Router()
const CheckObjectInArray = require('../utils/index').CheckObjectInArray
const RANK = require('../mongodb/index').RANK
const anonymousForbidden = require('../utils/index').anonymousForbidden

rank.post('/', anonymousForbidden)

rank.route('/')
  .get((req, res) => {
    RANK.find((err, result) => {
      if (err) throw err
      else return res.send(result)
    })
  })
  .post((req, res) => {
    if (req.body.quiz_id && req.body.time) {
      RANK.findOne({username: req.user.id}, (err, result) => {
        if (err) throw err
        if (result) {
          let anwseredlist = result.anwsered
          if (CheckObjectInArray(anwseredlist, 'quiz_id', req.body.quiz_id)) {
            return res.status(403).json({message: 'Error', detail: 'You \'ve already submitted the anwser for this question'})
          }
          let tmp = {}
          tmp.quiz_id = req.body.quiz_id
          tmp.time = req.body.time
          anwseredlist.push(tmp)
          result.anwsered = anwseredlist
          result.save((err) => {
            if (err) throw err
            else return res.json({message: 'Complete'})
          })
        } else {
          let anwseredlist = []
          let tmp = {}
          tmp.quiz_id = req.body.quiz_id
          tmp.time = req.body.time
          anwseredlist.push(tmp)
          let newRank = new RANK({
            username: req.user.id,
            anwsered: anwseredlist
          })
          newRank.save((err) => {
            if (err) throw err
            else return res.json({message: 'Complete'})
          })
        }
      })
    }
  })

module.exports = rank

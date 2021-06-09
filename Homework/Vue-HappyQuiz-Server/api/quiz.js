const quiz = require('express').Router()
const QUIZ = require('../mongodb/index').QUIZ
const checkObjectId = require('../utils/index').checkObjectId
const anonymousForbidden = require('../utils/index').anonymousForbidden

quiz.post('/', anonymousForbidden)
quiz.put('/:_id', anonymousForbidden)
quiz.delete('/:_id', anonymousForbidden)

quiz.route('/')
  .get((req, res) => {
    QUIZ.find((err, result) => {
      if (err) {
        throw err
      } else {
        return res.send(result)
      }
    })
  })
  .post((req, res) => {
    if (req.body.type && req.body.question && req.body.anwsers) {
      let tmp = new QUIZ({
        question: req.body.question,
        anwsers: req.body.anwsers,
        type: req.body.type,
        author: req.user.id
      })
      tmp.save((err) => {
        if (err) {
          throw err
        } else {
          return res.json({message: 'Complete'})
        }
      })
    } else {
      return res.status(403).json({message: 'Error', detail: 'Invalid payload'})
    }
  })

quiz.route('/:_id')
  .get((req, res) => {
    if (checkObjectId(req.params._id)) {
      QUIZ.findById(req.params._id, (err, result) => {
        if (err) throw err
        return res.send(result)
      })
    } else {
      return res.status(404).json({message: 'Error'})
    }
  })
  .put((req, res) => {
    if (!checkObjectId(req.params._id)) {
      return res.status(404).json({message: 'Error'})
    }
    if (req.body.question) {
      QUIZ.findById(req.params._id, (err, result) => {
        if (err) throw err
        if (result) {
          result.question = req.body.question
          result.save((err) => {
            if (err) throw err
            else {
              return res.json({message: 'Complete'})
            }
          })
        }
      })
    }
    if (req.body.anwsers) {
      QUIZ.findById(req.params._id, (err, result) => {
        if (err) throw err
        if (result) {
          let tmp = req.body.anwsers.split(',')
          result.anwsers = tmp
          result.save((err) => {
            if (err) throw err
            else {
              return res.json({message: 'Complete'})
            }
          })
        }
      })
    }
    if (req.body.type) {
      QUIZ.findById(req.params._id, (err, result) => {
        if (err) throw err
        if (result) {
          result.type = req.body.type
          result.save((err) => {
            if (err) throw err
            else {
              return res.json({message: 'Complete'})
            }
          })
        }
      })
    }
  })
  .delete((req, res) => {
    QUIZ.remove({_id: req.params._id}, (err) => {
      if (err) {
        throw err
      } else {
        return res.send({message: 'Complete'})
      }
    })
  })

module.exports = quiz

const user = require('express').Router()
const USERS = require('../mongodb/index').USERS
const rmduplicate = require('../utils').rmduplicate
const checkObjectId = require('../utils/index').checkObjectId
const adminPrivilege = require('../utils/index').adminPrivilege
const UserFilter = require('../utils/index').UserFilter
const anonymousForbidden = require('../utils/index').anonymousForbidden

user.get('/', anonymousForbidden)
user.get('/:uid', UserFilter)
user.put('/:uid', UserFilter)
user.delete('/:uid', adminPrivilege)
user.get('/:uid/contactlist', UserFilter)
user.put('/:uid/contactlist', UserFilter)

user.route('/')
  .get((req, res) => {
    if (req.query.username) {
      USERS.findOne({username: req.query.username}, (err, result) => {
        if (err) {
          throw err
        }
        if (result) {
          return res.send({message: 'Found', username: result.username, uid: result._id})
        } else return res.status(404).json({message: 'Not found'})
      })
    }
  })
  .post((req, res) => {
    if (req.body.username && req.body.password && req.body.phonenumber) {
      USERS.find({
        $or: [{username: req.body.username}, {phonenumber: req.body.phonenumber}]
      }).limit(1).exec((err, result) => {
        if (err) {
          throw err
        }
        if (result.length > 0) {
          if (result[0].username === req.body.username) {
            return res.status(403).json({message: 'Error', detail: 'Username ' + result[0].username + ' is already in use'})
          } else if (result[0].phonenumber === req.body.phonenumber) {
            return res.status(403).json({message: 'Error', detail: 'Phonenumber ' + result[0].phonenumber + ' is already in use'})
          }
        } else {
          let tmp = new USERS({
            username: req.body.username,
            password: req.body.password,
            phonenumber: req.body.phonenumber
          })
          tmp.save((err) => {
            if (err) {
              throw err
            } else return res.json({message: 'Complete'})
          })
        }
      })
    }
  })

user.route('/:uid')
  .get((req, res) => {
    if (!checkObjectId(req.params.uid)) {
      return res.status(404).json({message: 'Error'})
    }
    USERS.findById(req.params.uid, (err, result) => {
      if (err) {
        throw err
      } else return res.send(result)
    })
  })
  .put((req, res) => {
    if (!checkObjectId(req.params.uid)) {
      return res.status(404).json({message: 'Error'})
    }
    USERS.findById(req.params.uid, (err, result) => {
      if (err) {
        throw err
      }
      if (req.body.password) {
        result.password = req.body.password
      }
      if (req.body.phonenumber) {
        result.phonenumber = req.body.phonenumber
      }
      if (req.body.customsetting !== null) {
        result.customsetting = req.body.customsetting
      }
      result.save((err) => {
        if (err) {
          throw err
        } else return res.json({message: 'Complete'})
      })
    })
  })
  .delete((req, res) => {
    USERS.remove({_id: req.params.uid}, (err) => {
      if (err) {
        throw err
      } else return res.json({message: 'Complete'})
    })
  })

user.route('/:uid/contactlist')
  .get((req, res) => {
    if (!checkObjectId(req.params.uid)) {
      return res.status(404).json({message: 'Error'})
    }
    USERS.findById(req.params.uid, (err, result) => {
      if (err) {
        throw err
      } else return res.json({contactlist: result.contactlist})
    })
  })
  .put((req, res) => {
    if (!checkObjectId(req.params.uid)) {
      return res.status(404).json({message: 'Error'})
    }
    USERS.findById(req.params.uid, (err, result) => {
      if (err) {
        throw err
      }
      if (req.body.rm) {
        let tmp = result.contactlist
        let index = tmp.indexOf(req.body.rm)
        if (index > -1) {
          tmp.splice(index, 1)
        }
        result.contactlist = tmp
      } else if (req.body.add) {
        let tmp = result.contactlist
        tmp.push(req.body.add)
        tmp = rmduplicate(tmp)
        result.contactlist = tmp
      }
      result.save((err) => {
        if (err) {
          throw err
        } else return res.json({message: 'Complete'})
      })
    })
  })

module.exports = user

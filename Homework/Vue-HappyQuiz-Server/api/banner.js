const banner = require('express').Router()
const mysql = require('../mysql/index')
const adminPrivilege = require('../utils/index').adminPrivilege

banner.delete('/:id', adminPrivilege)
banner.put('/:id', adminPrivilege)

banner.route('/')
  .post((req, res) => {
    mysql(
      'INSERT INTO BANNERs(img,url) VALUE(?,?)',
      [req.body.img, req.body.url],
      (err) => {
        if (err) {
          return res.status(403).json({message: 'Error'})
        } else {
          return res.json({message: 'Complete'})
        }
      }
    )
  })
  .get((req, res) => {
    mysql(
      'SELECT * FROM BANNERs'
      , (err, result) => {
        if (err) {
          return res.status(403).json({message: 'Error'})
        } else {
          return res.send(result)
        }
      })
  })

banner.route('/:id')
  .put((req, res) => {
    if (req.body.img) {
      mysql(
        'UPDATE BANNERs SET img=? WHERE id=?',
        [req.body.img, req.params.id],
        (err) => {
          if (err) {
            return res.send(err)
          }
        })
    }
    if (req.body.url) {
      mysql(
        'UPDATE BANNERs SET url=? WHERE id=?',
        [req.body.url, req.params.id],
        (err) => {
          if (err) {
            return res.send(err)
          }
        }
      )
    }
    return res.json({message: 'Complete'})
  })
  .delete((req, res) => {
    mysql(
      'DELETE FROM BANNERs WHERE id=?',
      [req.params.id],
      (err) => {
        if (err) {
          return res.status(403).json({message: 'Error'})
        } else {
          return res.json({message: 'Complete'})
        }
      }
    )
  })

module.exports = banner

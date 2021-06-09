const news = require('express').Router()
const mysql = require('../mysql/index')
const adminPrivilege = require('../utils/index').adminPrivilege

news.post('/', adminPrivilege)
news.put('/:id', adminPrivilege)
news.delete('/:id', adminPrivilege)

news.route('/')
  .post((req, res) => {
    mysql(
      'INSERT INTO NEWS(title,`desc`,src,url) VALUE(?,?,?,?)',
      [req.body.title, req.body.desc, req.body.src, req.body.url],
      (err) => {
        if (err) {
          return res.status(403).json(err)
        } else {
          return res.json({message: 'Complete'})
        }
      }
    )
  })
  .get((req, res) => {
    mysql(
      'SELECT * FROM NEWS',
      (err, result) => {
        if (err) {
          return res.status(404).json({message: 'Error'})
        } else {
          return res.send(result)
        }
      })
  })

news.route('/:id')
  .put((req, res) => {
    if (req.body.title) {
      mysql(
        'UPDATE NEWS SET title=? WHERE id=?',
        [req.body.title, req.params.id],
        (err) => {
          if (err) {
            return res.status(403).json({message: 'Error' + err})
          }
        }
      )
    }
    if (req.body.desc) {
      mysql(
        'UPDATE NEWS SET `desc`=? WHERE id=?',
        [req.body.desc, req.params.id],
        (err) => {
          if (err) {
            return res.status(403).json({message: 'Error' + err})
          }
        }
      )
    }
    if (req.body.src) {
      mysql(
        'UPDATE NEWS SET src=? WHERE id=?',
        [req.body.src, req.params.id],
        (err) => {
          if (err) {
            return res.status(403).json({message: 'Error' + err})
          }
        })
    }
    if (req.body.url) {
      mysql(
        'UPDATE NEWS SET url=? WHERE id=?',
        [req.body.url, req.params.id],
        (err) => {
          if (err) {
            return res.status(403).json({message: 'Error' + err})
          }
        })
    }
    return res.json({message: 'Complete'})
  })
  .delete((req, res) => {
    mysql(
      'DELETE FROM NEWS WHERE id=?',
      [req.params.id],
      (err) => {
        if (err) {
          return res.status(403).json({message: 'Error'})
        }
      }
    )
    return res.json({message: 'Complete'})
  })

module.exports = news

const pool = require('mysql2').createPool(require('../config').mysqlConf)

pool.getConnection((poolErr, conn) => {
  if (poolErr) {
    throw poolErr
  }
  conn.execute(
    'select \'connected to mysql server\' as msg',
    (connErr, result) => {
      console.log(result[0].msg)
      conn.release()
      if (connErr) {
        throw connErr
      }
    }
  )
})

module.exports = function (query, opt) {
  if (arguments.length < 3) {
    let callback = opt
    pool.getConnection((poolErr, conn) => {
      conn.execute(
        query,
        (connErr, result) => {
          callback(connErr, result)
          conn.release()
          if (connErr) {
            console.log(connErr)
          }
        }
      )
    })
  } else {
    let [obj, callback] = [arguments[1], arguments[2]]
    pool.getConnection((poolErr, conn) => {
      conn.execute(
        query,
        obj,
        (connErr, result) => {
          callback(connErr, result)
          conn.release()
          if (connErr) {
            console.log(connErr)
          }
        }
      )
    })
  }
}

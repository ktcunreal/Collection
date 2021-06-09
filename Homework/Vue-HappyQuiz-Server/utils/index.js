const getToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const expressJWT = require('express-jwt')({
  secret: require('../config').jwtCipher,
  getToken: getToken
}).unless({
  path: ['/api/temptoken', '/api/login', '/api/reg']
})

const UserFilter = (req, res, next) => {
  if (req.user.id === 'anonymous' || req.originalUrl.split('/')[3] !== req.user.vid) {
    return res.status(403).json({message: '无访问权限'})
  }
  next()
}

const anonymousForbidden = (req, res, next) => {
  if (req.user.id === 'anonymous') {
    return res.status(403).json({message: 'Anonymous access forbidden!'})
  }
  next()
}

const CheckObjectInArray = (array, key, value) => {
  for (let i = 0, n = array.length; i < n; i++) {
    if (array[i][key] === value) {
      return true
    }
  }
  return false
}

const checkObjectId = (objectId) => {
  return !!objectId.match(/^[0-9a-fA-F]{24}$/)
}

const rmduplicate = (arr) => {
  let array = Array.from(new Set(arr))
  return array
}

const adminPrivilege = (req, res, next) => {
  if (req.user.id !== 'admin') {
    return res.status(403).json({message: 'Admin accessable only!'})
  }
  next()
}

module.exports = {
  getToken: getToken,
  expressJWT: expressJWT,
  anonymousForbidden: anonymousForbidden,
  UserFilter: UserFilter,
  CheckObjectInArray: CheckObjectInArray,
  checkObjectId: checkObjectId,
  rmduplicate: rmduplicate,
  adminPrivilege: adminPrivilege
}

import axios from 'axios'
import jwt from 'jsonwebtoken'

export function checkToken () {
  return new Promise((resolve) => {
    if (sessionStorage.getItem('jwt')) {
      resolve(sessionStorage.getItem('jwt'))
    } else {
      axios.get(process.env.apiserver + 'temptoken').then((response) => {
        sessionStorage.setItem('jwt', response.data)
        resolve(response.data)
      })
    }
  })
}

export function decodeJWT (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.cipher, (err, decoded) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}

export const UTCparser = function (UTCDateString) {
  if (!UTCDateString) {
    return '-'
  }
  function formatFunc (str) {
    return str > 9 ? str : '0' + str
  }
  var date2 = new Date(UTCDateString)
  var year = date2.getFullYear()
  var mon = formatFunc(date2.getMonth() + 1)
  var day = formatFunc(date2.getDate())
  var hour = date2.getHours()
  var noon = hour >= 12 ? 'PM' : 'AM'
  hour = hour >= 12 ? hour - 12 : hour
  hour = formatFunc(hour)
  var min = formatFunc(date2.getMinutes())
  var dateStr = year + '-' + mon + '-' + day + ' ' + noon + ' ' + hour + ':' + min
  return dateStr
}

export const CheckObjectInArray = (array, key, value) => {
  for (let i = 0, n = array.length; i < n; i++) {
    if (array[i][key] === value) {
      return true
    }
  }
  return false
}

export const rmduplicate = (arr) => {
  let array = Array.from(new Set(arr))
  return array
}

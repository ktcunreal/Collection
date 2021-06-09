const rtc = require('express')()
const server = require('http').Server(rtc)
const io = require('socket.io')(server)

const redis = require('redis').createClient(6379, 'localhost')
redis.auth(require('../config').redisConf.auth, (err) => {
  if (!err) {
    console.log('Connected to redis server')
  }
})

const listener = io.on('connection', (socket) => {
  socket.join(socket.handshake.query.name)
  socket.on('msg', (msg) => {
    var target = JSON.parse(msg)
    // var target = JSON.parse(msg)
    socket.to(target.to).emit('msg', target.message)
  })
  var source = socket.handshake.query.name
  if (source === 'undefined' || source === 'anonymous' || source === '') {
    return null
  } else {
    console.log(socket.handshake.query.name + ' has connected')
    redis.sadd('onlineUsers', source)
    redis.smembers('onlineUsers', (err, result) => {
      err ? console.log(err) : console.log(result)
      socket.emit(source, result)
      socket.broadcast.emit('updateOnlineUsers', {usr: source, flag: 'online'})
    })
    socket.on('disconnect', () => {
      console.log(source + ' has disconnected')
      redis.srem('onlineUsers', source)
      redis.smembers('onlineUsers', (err, result) => {
        err ? console.log(err) : console.log(result)
        socket.broadcast.emit('updateOnlineUsers', {usr: source, flag: 'offline'})
      })
    })
  }
})
server.listen(4000)
module.exports = listener

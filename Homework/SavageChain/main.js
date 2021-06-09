const router = require('express')()
const http = require('http').Server(router)
const p2pServer = require('socket.io')(http)
const p2pClient = require('socket.io-client')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(':memory:')
const EventHandler = require('events').EventEmitter
const events = new EventHandler()
var blockChain = []
class Block {
  constructor (params) {
    this.index = params.index
    this.previousHash = params.previousHash
    this.timestamp = params.timestamp
    this.data = params.data
    this.hash = params.hash
    this.nonce = params.nonce
    this.difficulty = params.difficulty
  }
  parse () {
    return {
      index: this.index,
      previousHash: this.previousHash,
      timestamp: this.timestamp,
      data: this.data,
      hash: this.hash,
      nonce: this.nonce,
      difficulty: this.difficulty
    }
  }
}
const genesisBlock = () => {
  return new Block({
    index: 0,
    previousHash: 'previousHash',
    timestamp: '0',
    data: 'helloWorld',
    hash: 'b28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a21',
    nonce: 1,
    difficulty: 0
  })
}
const formatChain = (blockchain) => {
  let tmp = ''
  for (let i = 0, n = blockchain.length; i < n; i++) {
    tmp = tmp + '|' + JSON.stringify(blockchain[i].parse())
  }
  return tmp.substr(1)
}
const parseChain = (formattedString) => {
  let tmp = formattedString.split('|')
  let arr = []
  for (let i = 0, n = tmp.length; i < n; i++) {
    let block = new Block(JSON.parse(tmp[i]))
    arr.push(block)
  }
  return arr
}
// Define block
const computeHash = (input) => {
  let hash = require('crypto').createHash('sha256').update(input).digest('hex')
  return hash
}
const mineBlock = (data, difficulty) => {
  let index = blockChain.length
  let previousHash = blockChain[blockChain.length - 1].hash
  let timestamp = new Date().toString()
  let nonce = 1
  let hash = computeHash(index + timestamp + previousHash + data + nonce)
  while (!validateDifficulty(hash, difficulty)) {
    nonce = nonce + 1
    hash = computeHash(index + timestamp + previousHash + data + nonce)
  }
  /* eslint-disable no-new */
  return new Block({
    index: index,
    previousHash: previousHash,
    data: data,
    timestamp: timestamp,
    nonce: nonce,
    hash: hash,
    difficulty: difficulty
  })
}
const validateDifficulty = (hash, difficulty) => {
  for (var i = 0, n = hash.length; i < n; i++) {
    if (hash[i] !== '0') break
  }
  return i >= difficulty
}
const validateBlockChain = (blockchain) => {
  if (JSON.stringify(blockchain[0]) !== JSON.stringify(genesisBlock())) {
    console.log('unrecognized genesis block!')
    return false
  }
  for (let i = 1, n = blockchain.length; i < n; i++) {
    let tmp = computeHash(blockchain[i].index + blockchain[i].timestamp + blockchain[i].previousHash + blockchain[i].data + blockchain[i].nonce)
    if (blockchain[i].index !== blockchain[i - 1].index + 1) {
      console.log('invalid index at ' + i)
      return false
    } else if (blockchain[i].previousHash !== blockchain[i - 1].hash) {
      console.log('invalid previous hash at ' + i)
      return false
    } else if (tmp !== blockchain[i].hash) {
      console.log('invalid hash at ' + i)
      return false
    } else if (!validateDifficulty(blockchain[i].hash, blockchain[i].difficulty)) {
      return false
    } else {
      return true
    }
  }
}
const updateBlockChain = (newChain) => {
  // Drop invalid chain
  if (!validateBlockChain(newChain)) {
    return null
  }
  // Drop shorter chain
  if (newChain.length < blockChain.length) {
    return null
  }
  // Handle chain branches, prevent hostile node casually replace origin content with longer chains
  let tmp = blockChain.length - 1
  if (newChain[tmp].hash === blockChain[tmp].hash) {
    db.run('update Chains set blockchain = ?,priority = priority + 1 where blockchain = ?', [formatChain(newChain), formatChain(blockChain)], (err, result) => {
      err ? console.log(err) : console.log('blockchain db updated')
    })
    blockChain = newChain
  } else {
    console.log('Chain branches at ' + tmp)
    db.get('select blockchain from Chains where blockchain = ?', [formatChain(newChain)], (err, result) => {
      if (err) console.log(err)
      if (!result) {
        db.run('insert into Chains (blockchain) values(?)', [formatChain(newChain)], (err) => {
          err ? console.log(err) : console.log('New branch added')
        })
      } else {
        db.run('update Chains set priority = priority + 1 where blockchain = ?', [formatChain(newChain)], (err, result) => {
          err ? console.log(err) : console.log('Updated branch priority')
        })
      }
    })
    // select longer chain
    db.get('select blockchain from Chains where priority = (select max(priority) from Chains)', (err, result) => {
      if (err) console.log(err)
      blockChain = parseChain(result.blockchain)
    })
  }
}
// Init sqlite
db.exec('create table if not exists Peers(id INTEGER PRIMARY KEY AUTOINCREMENT,addr text unique not null,status int not null default 0)')
db.exec('create table if not exists Chains(id INTEGER PRIMARY KEY AUTOINCREMENT,blockchain text unique not null,priority int not null default 1)')
db.run('insert into Peers (addr) values(?)', ['http://45.76.194.196:8000'], () => console.log('Peers initialized'))
db.get('select blockchain from Chains where priority = (select max(priority) from Chains)', (err, result) => {
  if (err) console.log(err)
  if (!result) {
    db.run('insert into Chains (blockchain) values(?)', [formatChain([genesisBlock()])], (err) => {
      err ? console.log(err) : blockChain.push(genesisBlock()); console.log('DB initialized')
    })
  } else {
    blockChain = parseChain(result.blockchain)
  }
})
// Establish tunnel for devices behind NAT using public DDNS
var tunnel = require('localtunnel')(8000, (err, tunnel) => {
  err ? console.log(err) : console.log('Tunnel established, temporary domain for this host: ' + tunnel.url)
  init(tunnel)
})
tunnel.on('error', () => {
  console.log('Lost conn to ddns server, trying to reconn')
  tunnel = require('localtunnel')(8000, (err, tunnel) => {
    err ? console.log(err) : console.log('Tunnel established, temporary domain for this host: ' + tunnel.url)
    init(tunnel)
  })
})
const init = (tunnel) => {
  // Init p2p server
  p2pServer.on('connection', (socket) => {
    console.log('Incoming connection: ' + socket.handshake.query.addr)
    db.run('insert into Peers (addr) values(?)', [socket.handshake.query.addr], () => { console.log('Updated local list from connection handshake info') })
    socket.on('updatePeerList', (newPeerList) => {
      for (let i = 0, n = newPeerList.length; i < n; i++) {
        db.run('insert into Peers (addr) values(?)', [newPeerList[i].addr], () => { console.log('Updated local list from received list') })
      }
      prepareConn()
    })
    socket.on('updateBlockChain', (newChain) => {
      let tmp = parseChain(newChain)
      console.log(tmp)
      updateBlockChain(tmp)
    })
  })
  // HTTP server
  http.listen(8000, (err) => {
    err ? console.log(err) : console.log('listening on port 8000')
  })
  // P2P client
  const prepareConn = () => {
    db.each('select addr from Peers where status = ?', [0], (err, result) => {
      err ? console.log(err) : console.log('prepare connection: ' + result.addr)
      makeConn(result.addr)
    })
  }
  const sendPeerList = (socket) => {
    db.all('select addr from Peers', (err, result) => {
      err ? console.log(err) : console.log('sending peer list to remote host')
      socket.emit('updatePeerList', result)
    })
  }
  const makeConn = (peerAddr) => {
    if (peerAddr === tunnel.url) {
      console.log('Drop loopback connection')
      return null
    }
    db.run('update Peers set status = ? where addr = ?', [3, peerAddr], (err) => {
      err ? console.log(err) : console.log('connecting to peer: ' + peerAddr + ',set status to pending')
    })
    const socket = p2pClient(peerAddr, {reconnectionAttempts: 2, query: {addr: tunnel.url}})
    socket.on('connect', () => {
      db.run('update Peers set status = ? where addr = ?', [1, peerAddr], (err) => {
        err ? console.log(err) : console.log('connected to: ' + peerAddr)
      })
    })
    events.on('updchain', () => {
      socket.emit('updateBlockChain', formatChain(blockChain))
    })
    // DPD
    socket.on('reconnect_failed', () => {
      db.run('update Peers set status = ? where addr = ?', [2, peerAddr], (err) => {
        err ? console.log(err) : console.log('couldn\'t connect to target ' + peerAddr + ' marked as unavailable')
      })
    })
    sendPeerList(socket)
  }
  prepareConn()
}
// Handle HTTP requests
router.use(require('body-parser').urlencoded({ extended: false }))
router.use(require('body-parser').json())
router.route('/blocks')
  .get((req, res) => {
    return res.send(blockChain)
  })
  .post((req, res) => {
    let tmp = mineBlock(req.body.data, req.body.difficulty)
    blockChain.push(tmp)
    events.emit('updchain')
    return res.send(blockChain)
  })

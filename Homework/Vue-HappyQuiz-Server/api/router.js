const router = require('express').Router()
/**
 Enable middleware
*/
router.use(require('cors')())
router.use(require('../utils/index').expressJWT)

router.route('/')
  .get((req, res) => {
    return res.json({message: 'API Server is running!'})
  })
router.use('/users', require('./users'))
router.use('/news', require('./news'))
router.use('/session', require('./session'))
router.use('/banner', require('./banner'))
router.use('/temptoken', require('./temptoken'))
router.use('/quiz', require('./quiz'))
router.use('/rank', require('./rank'))

module.exports = router

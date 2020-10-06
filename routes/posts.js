const router = require('express').Router()
const verify = require('./oAuth/verifyToken')

// router.get('/api/user/login/_oAuth', async(req, res) => {
router.get('/', verify, async(req, res) => {
    res.json({
        status: {
            errorCode: '0',
            message: 'Successful data Submission done.'
        }
    })
})

module.exports = router
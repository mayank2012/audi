const router = require('express').Router()

// router.get('/api/user/login/_oAuth', async(req, res) => {
router.get('/', async(req, res) => {
    res.json({
        status: {
            errorCode: '0',
            message: 'Successful data Submission done.',
            discription: 'Go on for the API Documentation mentioned at https://explore.postman.com/templates/13195/smauthserver'
        }
    })
})

module.exports = router
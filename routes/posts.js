const router = require('express').Router()
const verify = require('./verifyToken')

// router.get('/api/user/login/_oAuth', async(req, res) => {
router.get('/', verify, async(req, res) => {
    res.json({
        posts: {
            title: 'my lul posts',
            desc: "it's the shit i dont wanna work on"
        }
    })
})

module.exports = router
const router = require('express').Router()
import verify from './oAuth/verifyToken'

router.get('/', verify, async(req, res) => {
    res.json({
        status: {
            errorCode: '0',
            message: 'Successful data Submission done.'
        }
    })
})

export default router
import express from 'express'
import verify from './oAuth/verifyToken.js'

const router = express.Router()

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: List all the posts
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Successful
 *         content: application/json
*/
router.get('/', verify, async(req, res) => {
    res.json({
        status: {
            errorCode: '0',
            message: 'Successful data Submission done.'
        }
    })
})

export default router
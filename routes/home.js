import express from 'express'
const router = express.Router()

/**
 * @swagger
 * /:
 *   get:
 *     summary: healthcheck
 *     responses:
 *       '200':
 *         description: Successful
 *         content: application/json
*/
router.get('/', async(req, res) => {
    res.json({
        status: {
            errorCode: '0',
            message: 'Successfully up and Running.',
            discription: 'Go on for the API Documentation mentioned at https://explore.postman.com/templates/13195/smauthserver  or reach at <Host-Url>/api-docs/'
        }
    })
})

export default router
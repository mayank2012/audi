const router = require('express').Router()
const Client = require('../../model/client/client')
const jwt_auth = require('jsonwebtoken')
const { route } = require('../posts')

router.get('/client/:userType', async(req, res) => {
    if (req.params.userType === "investor") {
        res.status(201).send('Ok')
    } else if (req.params.userType === "company") {
        res.status(202).send('Ok')
    } else if (req.params.userType === "individual") {
        res.status(202).send('Ok')
    }
    res.status(404).send('Not Found')
})

module.exports = router
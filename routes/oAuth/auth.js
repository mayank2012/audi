const router = require('express').Router()
const User = require('../../model/User/User')
const jwt_auth = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../../model/validationService/authValidation')

router.post('/register', async (req, res) => {
    // Data Validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Check if User Details already exists
    const emailDuplicationCheck = await User.findOne({email: req.body.email})
    if (emailDuplicationCheck) return res.status(400).send('EMail already Exists')

    // Password Hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create New User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send({user_id: user._id})
        // console.log(savedUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req, res) => {
        // Data Validation
        const { error } = loginValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        // Check if User Details exists
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(400).send('EMail does not Exists')

        // Password Validation
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send("Password doesn't match")

        // Create and Assign User JWT Token
        const userToken = jwt_auth.sign({_id: user._id}, process.env.TOKEN_SECRET)

        res.status(200).send({
            _id: user._id,
            token: userToken,
            message: 'Holla! Successful Login...!!'
        })
})

module.exports = router
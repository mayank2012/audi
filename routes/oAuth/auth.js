const router = require('express').Router()
import User, { findOne } from '../../model/User/User'
import { sign } from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcryptjs'
import { registerValidation, loginValidation } from '../../model/validationService/authValidation'

router.post('/register', async (req, res) => {
    // Data Validation
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Check if User Details already exists
    const emailDuplicationCheck = await findOne({email: req.body.email})
    if (emailDuplicationCheck) return res.status(400).send('EMail already Exists')

    // Password Hashing
    const salt = await genSalt(10)
    const hashedPassword = await hash(req.body.password, salt)

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
        const user = await findOne({email: req.body.email})
        if (!user) return res.status(400).send('EMail does not Exists')

        // Password Validation
        const validPassword = await compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send("Password doesn't match")

        // Create and Assign User JWT Token
        const userToken = sign({_id: user._id}, process.env.TOKEN_SECRET)

        res.status(200).send({
            _id: user._id,
            token: userToken,
            message: 'Holla! Successful Login...!!'
        })
})

export default router
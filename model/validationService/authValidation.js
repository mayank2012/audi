const dataValidate = require('@hapi/joi')

const registerValidation = data => {
    const validationSchema = dataValidate.object({
        name: dataValidate.string().min(6).required(),
        email: dataValidate.string().min(4).required().email(),
        password: dataValidate.string().min(6).required()
    })
    
    return validationSchema.validate(data)
}

const loginValidation = data => {
    const validationSchema = dataValidate.object({
        email: dataValidate.string().min(4).required().email(),
        password: dataValidate.string().min(6).required()
    })
    
    return validationSchema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
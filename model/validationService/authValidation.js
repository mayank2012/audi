import auth from '@hapi/joi'


const registerValidation = data => {
    const validationSchema = auth.object({
        name: auth.string().min(6).required(),
        email: auth.string().min(4).required().email(),
        password: auth.string().min(6).required()
    })
    
    return validationSchema.validate(data)
}

const loginValidation = data => {
    const validationSchema = auth.object({
        email: auth.string().min(4).required().email(),
        password: auth.string().min(6).required()
    })
    
    return validationSchema.validate(data)
}

const _registerValidation = registerValidation
export { _registerValidation as registerValidation }
const _loginValidation = loginValidation
export { _loginValidation as loginValidation }
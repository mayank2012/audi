import { object, string } from '@hapi/joi'


const registerValidation = data => {
    const validationSchema = object({
        name: string().min(6).required(),
        email: string().min(4).required().email(),
        password: string().min(6).required()
    })
    
    return validationSchema.validate(data)
}

const loginValidation = data => {
    const validationSchema = object({
        email: string().min(4).required().email(),
        password: string().min(6).required()
    })
    
    return validationSchema.validate(data)
}

const _registerValidation = registerValidation
export { _registerValidation as registerValidation }
const _loginValidation = loginValidation
export { _loginValidation as loginValidation }
import { object, string } from '@hapi/joi'

const companyValidation = data => {
    const clientValidationSchema = object({
        companyName: string().required(),
        companyID: string().required(),
        ownerName: string().required(),
        companyOfficialEmailId: string().required()
    })
    return clientValidationSchema.validate(data)
}

const _companyValidation = companyValidation
export { _companyValidation as companyValidation }
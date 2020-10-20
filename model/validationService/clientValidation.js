import hjoi from '@hapi/joi'

const companyValidation = data => {
    const clientValidationSchema = hjoi.object({
        companyName: hjoi.string().required(),
        companyID: hjoi.string().required(),
        ownerName: hjoi.string().required(),
        companyOfficialEmailId: hjoi.string().required()
    })
    return clientValidationSchema.validate(data)
}

const _companyValidation = companyValidation
export { _companyValidation as companyValidation }
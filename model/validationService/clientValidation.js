const dataValidation = require('@hapi/joi')

const companyValidation = data => {
    const clientValidationSchema = dataValidation.object({
        companyName: dataValidation.string().required(),
        ownerName: dataValidation.string().required(),
        companyOfficialEmailId: dataValidation.string().required()
    })
    return clientValidationSchema.validate(data)
}

module.exports.companyValidation = companyValidation
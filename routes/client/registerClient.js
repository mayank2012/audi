const router = require('express').Router()
const Client = require('../../model/client/clientsInfo')
const uuid = require('uuid')
const jwt_auth = require('jsonwebtoken')
const { route } = require('../posts')
const { companyValidation } = require('../../model/validationService/clientValidation')

function generateUUID() {
    return `${process.env.UUID_STRING}`.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }

router.post('/client/:userType', async(req, res) => {
    if (req.params.userType === "investor") {
        res.status(201).send('Ok')
    } else if (req.params.userType === "company") {
        const { error } = companyValidation(req.body)
        if (error) return res.status(400).send(error)

        const duplicateCompanyName = await Client.findOne({companyName: req.body.companyName})
        if (duplicateCompanyName) {
            const companyUpdates = new Client({
                ownerName: req.body.ownerName,
                timestamp: Date.now()
            })

            try {
                // await MyModel.updateMany({}, { $set: { name: 'foo' } });
                const updateCompanyDetails = await companyUpdates.replaceOne({ownerName: req.body.ownerName})
                // console.log(updateCompanyDetails)
                return res.status(202).send(updateCompanyDetails)
            } catch (err) {
                res.status(400).send({err})
            }
            // return res.status(202).send('Company Data updated')
        } else {
            const company = new Client({
                companyName: req.body.companyName,
                companyID: generateUUID(),
                ownerName: req.body.ownerName,
                companyOfficialEmailId: req.body.companyOfficialEmailId,
                timestamp: Date.now()
            })

            try {
                const savedCompany = await company.save()
                res.status(201).send(company)
            } catch (error){
                res.status(400).send(error)
            }
        }
    } else if (req.params.userType === "individual") {
        res.status(202).send('Ok')
    }
    // res.status(404).send('Not Found')
})

module.exports = router
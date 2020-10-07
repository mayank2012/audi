async function clientCompany() {
    const { error } = companyValidation(req.body)
    if (error) return res.status(400).send(error)

    const duplicateCompanyName = await Client.findOne({companyName: req.body.companyName})
    if (duplicateCompanyName) {
        const companyUpdates = new Client({
            ownerName: req.body.ownerName,
            timestamp: Date.now()
        })

        try {
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
}

// export { clientCompany }
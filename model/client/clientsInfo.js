import mongoose from 'mongoose'

const clientSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyID: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    ownerMailId: {
        type: String,
        // required: true
    },
    ownerMobileNo: {
        type: String,
        // required: true
    },
    ownerOtherNo: {
        type: String,
        // required: false
    },
    companyContactNo: {
        type: String,
        // required: true
    },
    companyOfficialEmailId: {
        type: String,
        required: true
    },
    companyAddressLine1: {
        type: String,
        // required: true
    },
    companyAddressLine2: {
        type: String,
        // required: false
    },
    companyAddressCity: {
        type: String,
        // required: true
    },
    companyAddressState: {
        type: String,
        // required: true
    },
    companyAddressPIN: {
        type: String,
        // required: true
    },
    companyAddressCountry: {
        type: String,
        // required: true
    },
    listCompanyDirectors: {
        type: String,
        // required: true
    },
    listCurrentInvestors: {
        type: String,
        // required: true
    },
    listCurrentMentors: {
        type: String,
        // required: false
    },
    aboutCompany: {
        type: String,
        // required: true
    },
    companyTargetMarket: {
        type: String,
        // required: true
    },
    companyTargetMarketRevenue: {
        type: String,
        // required: true
    },
    companyCurrentPartners: {
        type: String,
        // required: true
    },
    companyCurrentShareHolders: {
        type: String,
        // required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }

})

export default mongoose.model('Client', clientSchema)
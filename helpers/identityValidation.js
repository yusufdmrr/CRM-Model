const { createCustomError, errorRoute } = require('../errors/custom-error')


async function identityValidation(inputObject, next) {
    try {

        let returnedError = {
            authority: false,
            existAccount: false,
            existProduct: false,
            existShortName: false
        }

        let returnObject = {}

        const filteredObj = Object.fromEntries(Object.entries(inputObject).filter(([key, value]) => value !== undefined));

        for (const inputKey of Object.keys(filteredObj)) {
            let determinedSchema
            let determinedValue

            if (inputKey === 'userId') {
                determinedSchema = AuthoritySchema;
                determinedValue = "authority"
            } 

            let query = determinedSchema === TransactionTypeSchema ? "shortName" : "_id"

            let dbResponse
            if (inputKey === 'accountId') {
                for (const sch of determinedSchema) {
                    let finded = await sch.findOne({ [query]: filteredObj[inputKey], isActive: true })
                    if (finded !== null) {
                        finded.databaseModel = sch.modelName
                        dbResponse = finded
                    }
                }
            } else {
                dbResponse = await determinedSchema.findOne({ [query]: filteredObj[inputKey], isActive: true })
            }

            if (!dbResponse) {
                returnedError[determinedValue] = true
            } else {
                returnObject[determinedValue] = dbResponse

            }
        }

        if (Object.values(returnedError).some(value => value === true)) {
            return { returnedError }
        } else {
            return returnObject
        }



    } catch (error) {
        console.log(error);
    }
}

module.exports = { identityValidation }


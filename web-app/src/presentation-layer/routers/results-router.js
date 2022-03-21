const express = require('express')

module.exports = function ({readingsManager}) {

    const router = express.Router()

    router.get('/', async function(request, response) {
        
        resultsArray = await readingsManager.getAllReadings()

        errorDetails = resultsArray[1] == 'internalError' ? resultsArray[2] : null
        errorCode = resultsArray[0] == false ? resultsArray[1] : null

        const model = {
            result: resultsArray[1],
            errorsFound: !resultsArray[0],
            errorCode:  errorCode,
            errorDetails: errorDetails,
        }

        response.render('viewResults.hbs', model)
    })
    
    return router
}
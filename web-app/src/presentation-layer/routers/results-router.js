const express = require('express')
const path = require('path')

module.exports = function ({readingsManager, filesystemManager}) {

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

    router.post('/csv/download', async function(request, response) {

        readings = await readingsManager.getAllValidReadingsAsCvsFormat()

        if (readings[0]) {

            folderPath = path.join('src', 'presentation-layer', 'public', 'results')
            fileName = 'readings'
            fileType = 'csv'
            resultsArray = await filesystemManager.writeFile(folderPath, readings[1], fileName, fileType)

        } else {
            resultsArray = readings
        }


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
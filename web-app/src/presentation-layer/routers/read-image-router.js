const { response } = require('express')
const express = require('express')

module.exports = function({filesystemManager, readingsManager}) {
    
    const router = express.Router()

    router.get('/', function(request, response) {

        folders = filesystemManager.getAvailableFolders()

        const model = {
            folders: folders
        }

        response.render('readImageFolder.hbs', model)
    })


    router.post('/', async function(request, response) {

        folder = request.body.folder

        
        path = 'src/presentation-layer/public/meter-images/' + folder
        console.log(path)

        readings = await readingsManager.createReadingsFromImagesInFolder(path)

        const model = {
            result: readings,
            newReading: true
        }

        response.render('viewResults.hbs', model)

    })

    return router

}
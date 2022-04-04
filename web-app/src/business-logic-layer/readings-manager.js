const path = require('path')

module.exports = function ({readingsRepo, filesystemRepo, tesseract}) {

    const exports = {}


    /**
     * Inserts a new OCR reading object into the data source.
     * @param {object} reading 
     * @returns {Promise<Array>}
     */
    exports.createReading = async function(reading) {
        return await readingsRepo.createReading(reading)
    }


    /**
     * Gets the reading with the supplied ID from the data source.
     * @param {number} id 
     * @returns {Promise<Array>}
     */
    exports.getReading = async function(id) {
        return await readingsRepo.getReading(id)
    }


    /**
     * Gets all readings that are stored in the data source.
     * @returns {Promise<Array>}
     */
    exports.getAllReadings = async function() {
        return await readingsRepo.getAllReadings()
    }


    /**
     * Updates the 'correct_value' field for the specified reading.
     * @param {number} id 
     * @param {string} value 
     * @returns {Promise<Array>}
     */
    exports.setCorrectValue = async function(id, value) {
        return await readingsRepo.setCorrectValue(id, value)
    }


    /**
     * Performs OCR scanning of all images in the specified folder, including subfolders,
     * and stores the results in the data source.
     * @param {string} folderPath 
     * @returns {Array<object>} Array containing the values saved to the db.
     */
    exports.createReadingsFromImagesInFolder = async function(folderPath) {
        
        folderArray = filesystemRepo.getAvailableFolders(folderPath)

        readings = []
        for (const folder of folderArray){

            currentFolderPath = folderPath+'/'+folder
            files = filesystemRepo.getFilesFromFolder(currentFolderPath)
            
            for (const file of files){
                    
                ocrResult = await tesseract.getImageRecognition(currentFolderPath, file)

                imageInfo = getImageInfoFromName(file)

                reading = {
                    ocr_result: ocrResult,
                    filename: file,
                    name: imageInfo.name,
                    is_base_image: imageInfo.baseImage,
                    color_depth: imageInfo.colorDepth,
                    ppt: imageInfo.ppt
                }

                readings.push(reading)
            }
        }

        for (const reading of readings){
            exports.createReading(reading)
        }
        return readings
    }

    return exports
}

function getImageInfoFromName(filename){

    fileExtension = filename.split('.').pop()

    imageInfo = {
        name: null,
        baseImage: null,
        colorDepth: null,
        ppt: null
    }

    if (fileExtension == 'bmp') {

        if(filename.includes('100ppt')){
            imageInfo.baseImage = true
        }else{
            imageInfo.baseImage = false
        }

        fileNameArr = filename.split('_')

        imageInfo.name = fileNameArr[0]
        imageInfo.colorDepth = fileNameArr[1].replace('bit', '')
        imageInfo.ppt = fileNameArr[2].replace('ppt.bmp', '')

    }

    return imageInfo
}
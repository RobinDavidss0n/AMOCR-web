const path = require('path')

module.exports = function ({ readingsRepo, filesystemRepo, tesseract, csv }) {

    const exports = {}


    /**
     * Inserts a new OCR reading object into the data source.
     * @param {object} reading 
     * @returns {Promise<Array>}
     */
    exports.createReading = async function (reading) {
        return await readingsRepo.createReading(reading)
    }


    /**
     * Gets the reading with the supplied ID from the data source.
     * @param {number} id 
     * @returns {Promise<Array>}
     */
    exports.getReading = async function (id) {
        return await readingsRepo.getReading(id)
    }


    /**
     * Gets all readings that are stored in the data source.
     * @returns {Promise<Array>}
     */
    exports.getAllReadings = async function () {
        return await readingsRepo.getAllReadings()
    }

    /**
     * Gets all valid readings that are stored in the data source.
     * @returns {Promise<Array>}
     */
    exports.getAllValidReadings = async function () {
        return await readingsRepo.getAllReadings()
    }

    /**
     * Updates the 'correct_value' field for the specified reading.
     * @param {number} id 
     * @param {string} value 
     * @returns {Promise<Array>}
     */
    exports.setCorrectValue = async function (id, value) {
        return await readingsRepo.setCorrectValue(id, value)
    }

    /**
     * Performs OCR scanning of all images in the specified folder, including subfolders,
     * and stores the results in the data source.
     * @param {string} folderPath 
     * @returns {Array<object>} Array containing the values saved to the db.
     */
    exports.createReadingsFromImagesInFolder = async function (folderPath) {

        folderArray = filesystemRepo.getAvailableFolders(folderPath)

        if (folderArray.length == 0) {
            folderArray.push('')
        }

        readings = []
        for (const folder of folderArray) {

            currentFolderPath = folderPath + '/' + folder
            files = filesystemRepo.getFilesFromFolder(currentFolderPath)

            for (const file of files) {
                ocrResult = await tesseract.getImageRecognition(currentFolderPath, file)

                imageInfo = getImageInfoFromName(file)

                reading = {
                    ocr_result: ocrResult,
                    filename: file,
                    correct_value: imageInfo.correctValue,
                    original_name: imageInfo.originalName,
                    is_base_image: imageInfo.baseImage,
                    color_depth: imageInfo.colorDepth,
                    ppt: imageInfo.ppt
                }

                readings.push(reading)
            }
        }

        for (const reading of readings) {
            exports.createReading(reading)
        }
        return readings
    }

    function getImageInfoFromName(filename) {

        fileExtension = filename.split('.').pop()

        imageInfo = {
            originalName: null,
            correctValue: null,
            baseImage: null,
            colorDepth: null,
            ppt: null
        }

        if (fileExtension == 'bmp') {

            if (filename.includes('100ppt')) {
                imageInfo.baseImage = true
            } else {
                imageInfo.baseImage = false
            }

            try {
                fileNameArr = filename.split('_')
                imageInfo.originalName = fileNameArr[0]
                imageInfo.correctValue = fileNameArr[1]
                imageInfo.colorDepth = fileNameArr[2].replace('bit', '')
                imageInfo.ppt = fileNameArr[3].replace('ppt.bmp', '')

            } catch (e) {
                console.error('\n Wrong fileName format:')
                console.error(e)
                console.error('\n')
                imageInfo = {
                    correctValue: 'ERROR FILENAME-FORMAT',
                    baseImage: false,
                }
            }

        }

        return imageInfo
    }


    /**
     * Returns all valid readings as a cvs formated string.
     * @returns {Promise<Array>}
     */
    exports.getAllValidReadingsAsCvsFormat = async function () {
        readings = await readingsRepo.getAllValidReadings()

        if(readings[0]){
            
            return new Promise(resolve => {
                resolve([true, csv.getCsvString(readings[1])])
            })

        }else{
            return readings
        }
    }

    return exports
}

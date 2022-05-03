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
     * @param {string} basePath 
     * @returns {Array<object>} Array containing the values saved to the db.
     */
    exports.createReadingsFromImagesInFolder = async function (basePath) {

        firstLayerFolders = filesystemRepo.getAvailableFolders(basePath).map(folderName => basePath + "/" + folderName)
        secondLayerFolders = []
        
        for (const folder of firstLayerFolders) {
            secondLayerFolders.push(...filesystemRepo.getAvailableFolders(folder).map(folderName => folder + "/" + folderName))
        }

        if (secondLayerFolders.length == 0) {
            secondLayerFolders.push('')
        }

        readings = []
        for (const folder of secondLayerFolders) {

            console.log(folder)

            //currentFolderPath = basePath + "/" + folder
            files = filesystemRepo.getFilesFromFolder(folder)

            for (const file of files) {

                fileExtension = file.split('.').pop()

                if (fileExtension == "bmp" || fileExtension == "png") {

                    // ocrResult = await tesseract.getImageRecognition(folder, file)
                    // console.log(ocrResult)
                    imageInfo = getImageInfoFromName(file)
                    correctDigits = getCorrectDigits(imageInfo.correctValue, imageInfo.ocrResult)
                    if (correctDigits == 8) {
                        allCorrect = true
                    }else{
                        allCorrect = false
                    }
                    
                    reading = {
                        filename: file,
                        ocr_result: imageInfo.ocrResult,
                        correct_value: imageInfo.correctValue,
                        correct_digits: correctDigits,
                        all_correct: allCorrect,
                        ocr_result: imageInfo.ocrResult,
                        original_name: imageInfo.originalName,
                        is_base_image: imageInfo.baseImage,
                        color_depth: imageInfo.colorDepth,
                        ppt: imageInfo.ppt,
                        bin_size: imageInfo.binSize,
                        zip_size: imageInfo.zipSize,
                        png_size: imageInfo.pngSize
                    }
    
                    readings.push(reading)
                }
            }
        }

        for (const reading of readings) {
            exports.createReading(reading)
        }
        return readings
    }

    function getCorrectDigits(correctValue, ocrResult) {

        correctValueArr = Array.from(correctValue)
        ocrResultArr = Array.from(ocrResult)

        correctAmount = 0

        for (let index = 0; index < correctValueArr.length; index++) {

            if (correctValueArr[index] == ocrResultArr[index]) {
                correctAmount += 1
            }
        }

        return correctAmount
    }

    function getImageInfoFromName(filename) {

        fileExtension = filename.split('.').pop()

        imageInfo = {
            originalName: null,
            correctValue: null,
            ocrResult: null,
            baseImage: null,
            colorDepth: null,
            ppt: null,
            binSize: null,
            zipSize: null,
            pngSize: null
        }

        if (fileExtension == 'bmp' || fileExtension == 'png') {

            if (filename.includes('100ppt')) {
                imageInfo.baseImage = true
            } else {
                imageInfo.baseImage = false
            }

            try {
                fileNameArr = filename.split('_')
                imageInfo.originalName = fileNameArr[0]
                imageInfo.correctValue = fileNameArr[1]
                imageInfo.ocrResult = fileNameArr[2]
                imageInfo.colorDepth = fileNameArr[3].replace('bit', '')
                imageInfo.ppt = fileNameArr[4].replace('ppt', '')
                imageInfo.binSize = fileNameArr[5]
                imageInfo.zipSize = fileNameArr[6]
                imageInfo.pngSize = fileNameArr[7].replace('.png', '')
                console.log(imageInfo.pngSize)

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
     * Returns all valid readings as a csv formated string.
     * @returns {Promise<Array>}
     */
    exports.getAllValidReadingsAsCvsFormat = async function () {
        readings = await readingsRepo.getAllValidReadings()

        if (readings[0]) {
            
            return new Promise(resolve => {
                resolve([true, csv.getCsvString(readings[1])])
            })

        } else {
            return readings
        }
    }

    return exports
}

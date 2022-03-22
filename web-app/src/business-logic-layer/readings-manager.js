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
     * Performs OCR scanning of all images in the specified folder
     * and stores the results in the data source.
     * @param {string} folderPath 
     * @returns {Array<object>} Array containing the values saved to the db.
     */
    exports.createReadingsFromImagesInFolder = async function(folderPath) {
        
        fileArray = filesystemRepo.getFilesFromFolder(folderPath)
        pathArray = folderPath.split('/')
        folder = pathArray[pathArray.length - 1]

        readings = []

        for (const file of fileArray) {
            
            ocrResult = await tesseract.getImageRecognition(folder, file)

            reading = {
                ocr_result: ocrResult,
                filename: file
            }

            readings.push(reading)

            exports.createReading(reading)
        }

        return readings
    }

    return exports
}
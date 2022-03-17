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



    exports.createReadingsFromImagesInFolder = async function(folderPath) {
        
        fileArray = filesystemRepo.getFilesFromFolder(folderPath)

        for (const file of fileArray) {
            
            ocrResult = await tesseract.getImageRecognition(file)

            reading = {
                result: ocrResult,
                filename: file
            }

            exports.createReading(reading)
        }
    }

    return exports
}
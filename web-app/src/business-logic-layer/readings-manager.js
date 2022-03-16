module.exports = function ({readingsRepo}) {

    const exports = {}


    /**
     * Inserts a new OCR reading object into the database.
     * Returns id of the new reading. Possible error(s): 'internalError'.
     * @param {object} reading 
     * @param {any} callback 
     */
    exports.createReading = async function(reading) {
        returnValue = await readingsRepo.createReading(reading) // true/false
        return returnValue[0]

    }

    return exports
}
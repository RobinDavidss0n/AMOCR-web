module.exports = function ({readingsRepo}) {

    const exports = {}


    /**
     * Inserts a new OCR reading object into the database.
     * Returns id of the new reading. Possible error(s): 'internalError'.
     * @param {object} reading 
     * @param {any} callback 
     */
    exports.createReading = function(reading, callback) {
        readingsRepo.createReading(reading, callback)
    }

    return exports
}
const db = require('./db')

module.exports = function() {
    const exports = {}

    /**
     * Inserts a new reading and image file reference into the database.
     * Returns id of the created reading, or 'internalError' if failed.
     * @param {object} reading 
     * @param {any} callback 
     */
    exports.createReading = function(reading, callback) {

        const query = `
        INSERT INTO readings (ocr_result, filename, created_on) 
        VALUES ($1, $2, current_timestamp)
        RETURNING ID`
        
        const values = [reading.result, reading.filename]

        db.query(query, values, function(error, result) {
            if (error) {
                callback(['internalError'], null)
            } else {
                callback([], result)
            }
        })
    }

    return exports
}
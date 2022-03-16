const db = require('./db')

module.exports = function() {
    
    const exports = {}


    /**
     * Inserts a new reading and image file reference into the data source.
     * @param {object} reading
     * @returns {Promise<Array>} Success: [true, new_reading_id] || Fail: [false, 'internalError', error.stack]
     */
    exports.createReading = function(reading) {
        const query = `
        INSERT INTO readings (ocr_result, filename, created_on) 
        VALUES ($1, $2, current_timestamp)
        RETURNING ID`
        
        const values = [reading.result, reading.filename]

        return new Promise(resolve => {
            db.query(query, values, function(error, result) {
                if (error) {
                    resolve([false, 'internalError', error.stack])
                } else {
                    resolve([true, result])
                }
            })
        })
    }
    

    /**
     * Gets the reading with the specified id from the data source.
     * @param {number} id 
     * @returns {Promise<Array>} Success: [true, {reading}] || Fail: [false, 'itemNotFound', error.stack]
     */
    exports.getReading = function(id) {
        const query = `SELECT * FROM readings WHERE id = $1`

        return new Promise(resolve => {
            db.query(query, id, function(error, result) {
                if (error) {
                    resolve([false, 'itemNotFound', error.stack])
                } else {
                    resolve([true, result])
                }
            })
        })
    }


    /**
     * Gets all readings that are stored in the data source.
     * @returns {Promise<Array>} Success: [true, [readings]] || Fail: [false, 'internalError', error.stack]
     */
    exports.getAllReadings = function() {
        const query = `SELECT * FROM readings`
        
        return new Promise(resolve => {
            db.query(query, function(error, result) {
                if (error) {
                    resolve([false, 'internalError', error.stack])
                } else {
                    resolve([true, result])
                }
            })
        })
    }


    /**
     * Updates the 'correct_value' field with the supplied value for
     * the reading with the specified id.
     * Returns the id, or 'internalError' if failed.
     * @param {number} id
     * @param {number} value 
     * @returns {Promise<Array>} Success: [true, updated_reading_id] || Fail: [false, 'internalError', error.stack]
     */
    exports.setCorrectValue = function(id, value) {
        const query = `
        UPDATE readings SET correct_value = $2 WHERE id = $1
        RETURNING id`

        const values = [id, value]
        
        return new Promise(resolve => {
            db.query(query, values, function(error, result) {
                if (error) {
                    resolve([false, 'internalError', error.stack])
                } else {
                    resolve([true, result])
                }
            })
        })
    }
    

    return exports
}
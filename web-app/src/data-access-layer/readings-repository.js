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
        INSERT INTO readings 
        (
        ocr_result, correct_value, correct_digits, all_correct, filename, original_name, 
        ppt, color_depth, bin_size, zip_size, png_size, ocr_result_upscale, 
        correct_digits_upscale, all_correct_upscale, is_base_image, created_on
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, current_timestamp)
        RETURNING ID`
    
        const values = [
            reading.ocr_result,
            reading.correct_value,
            reading.correct_digits,
            reading.all_correct,
            reading.filename, 
            reading.original_name,
            reading.ppt,
            reading.color_depth, 
            reading.bin_size,
            reading.zip_size,
            reading.png_size,
            reading.ocr_result_upscale,
            reading.correct_digits_upscale,
            reading.all_correct_upscale,
            reading.is_base_image
        ]

        return new Promise(resolve => {
            db.query(query, values, function(error, result) {
                if (error || !result.rowCount) {
                    resolve([false, 'internalError', error?.stack])
                } else {
                    resolve([true, result.rows[0].id])
                }
            })
        })
    }
    

    /**
     * Gets the reading with the specified id from the data source.
     * @param {number} id 
     * @returns {Promise<Array>} 
     * Success: [true, {reading}] || Fail: [false, 'internalError', error.stack] || [false, 'itemNotFound']
     */
    exports.getReading = function(id) {
        const query = `SELECT * FROM readings WHERE id = $1`
        const value = [id]

        return new Promise(resolve => {
            db.query(query, value, function(error, result) {
                if (error) {
                    resolve([false, 'internalError', error?.stack])
                } else if (!result.rowCount) {
                    resolve([false, 'itemNotFound'])
                } else {
                    resolve([true, result.rows[0]])
                }
            })
        })
    }


    /**
     * Gets all readings that are stored in the data source.
     * @returns {Promise<Array>} 
     * Success: [true, [readings]] || Fail: [false, 'internalError', error.stack] || [false, 'itemNotFound']
     */
    exports.getAllReadings = function() {
        const query = `SELECT * FROM readings`
        
        return new Promise(resolve => {
            db.query(query, function(error, result) {
                if (error) {
                    resolve([false, 'internalError', error?.stack])
                } else if (!result.rowCount) {
                    resolve([false, 'itemNotFound'])
                } else {
                    resolve([true, result.rows])
                }
            })
        })
    }

        /**
     * Gets all valid readings that are stored in the data source.
     * @returns {Promise<Array>} 
     * Success: [true, [readings]] || Fail: [false, 'internalError', error.stack] || [false, 'itemNotFound']
     */
         exports.getAllValidReadings = function() {
            const query = `
            SELECT 
            original_name, color_depth, ppt, 
            correct_value, 
            ocr_result, correct_digits, all_correct, 
            ocr_result_upscale, correct_digits_upscale, all_correct_upscale,
            bin_size, zip_size, png_size, is_base_image
            FROM readings
            WHERE correct_value NOT IN ('ERROR FILENAME-FORMAT')
            `
            
            return new Promise(resolve => {
                db.query(query, function(error, result) {
                    if (error) {
                        resolve([false, 'internalError', error?.stack])
                    } else if (!result.rowCount) {
                        resolve([false, 'itemNotFound'])
                    } else {
                        resolve([true, result.rows])
                    }
                })
            })
        }


    /**
     * Updates the 'correct_value' field with the supplied value for
     * the reading with the specified id.
     * Returns the id, or 'internalError' if failed.
     * @param {number} id
     * @param {string} value 
     * @returns {Promise<Array>} Success: [true, updated_reading_id] || Fail: [false, 'internalError', error.stack]
     */
    exports.setCorrectValue = function(id, value) {
        const query = `
        UPDATE readings
        SET correct_value = $2
        WHERE id = $1
        RETURNING id
        `

        const values = [id, value]
        
        return new Promise(resolve => {
            db.query(query, values, function(error, result) {
                if (error || !result.rowCount) {
                    resolve([false, 'internalError', error?.stack])
                } else {
                    resolve([true, result.rows[0].id])
                }
            })
        })
    }
    

    return exports
}
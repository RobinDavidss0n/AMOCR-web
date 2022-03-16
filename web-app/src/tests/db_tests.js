module.exports = function ({readingsManager}) {

    const exports = {}

    exports.runAllTests = function() {
        exports.testCreateReading()
    }

    /**
     * Tries to create new reading objects in the database.
     * Both valid and invalid attempts are made and checked.
     */
    exports.testCreateReading = async function() {

        const filename1 = Math.random().toString().substring(2, 8) + '.bmp'
        const filename2 = filename1
        const filename3 = Math.random().toString().substring(2,8) + '.bmp'

        // SETUP TEST CASES:
        const reading1 = { //Should succeed
            result: '12345',
            filename: filename1
        }

        const reading2 = { // Should fail (filename not unique)
            result: '52486',
            filename: filename2
        }

        const reading3 = { //Should succeed
            result: '86127',
            filename: filename3
        }

        const reading4 = { //Should fail (no filename provided)
            result: '72127',
            filename: null
        }

        // RUN TESTS:
        test1Success = await readingsManager.createReading(reading1) == true //should succeed
        test2Success = await readingsManager.createReading(reading2) == false //should fail
        test3Success = await readingsManager.createReading(reading3) == true //should succeed
        test4Success = await readingsManager.createReading(reading4) == false //should fail

        if (!test1Success || !test2Success || !test3Success || !test4Success) {
            console.log('Create Reading test failed.')
        } else {
            console.log('Passed the Create Reading test!')
        }
            
    }
    return exports
}
module.exports = function ({readingsManager}) {

    const exports = {}

    /**
     * Runs all tests that are defined for performing CRUD operations on the 'readings' resource.
     */
    exports.runAllTests = async function() {
        
        var passedAllTests = true
        
        // Run tests:
        const createReadingTestSuccess = await exports.testCreateReading()
        const getReadingTestSuccess = await exports.testGetReading()
        const getAllReadingsSuccess = await exports.testGetAllReadings()
        const setCorrectValueSuccess = await exports.testSetCorrectValue()
        
        // Evaluate test results:
        if (!createReadingTestSuccess) {
            passedAllTests = false
            console.log('Create Reading test failed.')
        }
        if (!getReadingTestSuccess) {
            passedAllTests = false
            console.log('Get Reading test failed.')
        }
        if (!getAllReadingsSuccess) {
            passedAllTests = false
            console.log('Get All Readings test failed.')
        }
        if (!setCorrectValueSuccess) {
            passedAllTests = false
            console.log('Set Correct Value test failed.')
        }


        if (passedAllTests) {
            console.log('All tests passed successfully!')
        }        
    }


    /**
     * Tests the createReading function with both valid and invalid attempts.
     * @returns {Promise<boolean>}
     */
    exports.testCreateReading = async function() {

        // Create random strings for filenames:
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

        // Run tests:
        test1Result = await readingsManager.createReading(reading1)
        test2Result = await readingsManager.createReading(reading2)
        test3Result = await readingsManager.createReading(reading3)
        test4Result = await readingsManager.createReading(reading4)
    
        // Validate results:
        test1Success = test1Result[0] == true
        test2Success = (test2Result[0] == false && test2Result[1] == 'internalError')
        test3Success = test3Result[0] == true
        test4Success = (test4Result[0] == false && test4Result[1] == 'internalError')

        return (test1Success && test2Success && test3Success && test4Success)            
    }


    /**
     * Tests the getReading function
     * @returns {Promise<boolean>}
     */
    exports.testGetReading = async function() {

        validID = 1
        invalidID = -1

        test1Result = await readingsManager.getReading(validID)
        test2Result = await readingsManager.getReading(invalidID)

        //Validate results:
        test1Success = test1Result[0] == true
        test2Success = (test2Result[0] == false && (test2Result[1] == 'internalError' || test2Result[1] == 'itemNotFound') )

        return (test1Success && test2Success)
    }


    /**
     * Tests the getAllReadings function
     * @returns {Promise<boolean>}
     */
    exports.testGetAllReadings = async function() {
        
        result = await readingsManager.getAllReadings()
        testSuccess = false

        switch (result[1]) {
            case 'internalError':
                testSuccess = (result[0] == false && Array.isArray(result[2]))
                break;

            case 'itemNotFound':
                testSuccess = (result[0] == false)
                break;

            default:
                testSuccess = (result[0] == true && Array.isArray(result[1]))
        }

        return testSuccess
    }

    /**
     * Tests the setCorrectValue function with valid and invalid inputs.
     * @returns {Promise<boolean>}
     */
    exports.testSetCorrectValue = async function() {

        // Define ids and values (assumes that createReadingTest passed):
        existingId1 = 1, nonExistentId1 = -1, existingId2 = 3
        value1 = '12345', value2 = '85247', value3 = '68547'

        // RUN TESTS:
        test1Result = await readingsManager.setCorrectValue(existingId1, value1) //== true //should succeed
        test2Result = await readingsManager.setCorrectValue(nonExistentId1, value2) //== false //should fail
        test3Result = await readingsManager.setCorrectValue(existingId2, value3) //== true //should succeed

        test1Success = (test1Result[0] == true)
        test2Success = (test2Result[0] == false && test2Result[1] == 'internalError')
        test3Success = (test3Result[0] == true)

        return (test1Success && test2Success && test3Success)
    }

    //TODO: test the getReading function
    return exports
}
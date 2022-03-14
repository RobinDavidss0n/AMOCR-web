module.exports = function ({readingsManager, readingsRepo}) {

    const exports = {}

    exports.runAllTests = function() {
        exports.testCreateReading()
    }

    exports.testCreateReading = function() {

        var numberOfErrors = 0

        const filename1 = Math.random().toString().substring(2, 8) + '.bmp'
        const filename2 = filename1
        const filename3 = Math.random().toString().substring(2,8) + '.bmp'

        // SETUP TEST CASES:
        const reading1 = { //Should work
            result: '12345',
            filename: filename1
        }

        const reading2 = { // Should not work (filename not unique)
            result: '52486',
            filename: filename2
        }

        const reading3 = { //Should work
            result: '86127',
            filename: filename3
        }

        // RUN TESTS:
        readingsRepo.createReading(reading1, function(error, result) {
            if (error.length) {
                numberOfErrors += 1
            }

            readingsManager.createReading(reading2, function(error, result) {
                if (!error.length) {
                    numberOfErrors += 1
                }

                readingsManager.createReading(reading3, function(error, result) {
                    if (error.length) {
                        numberOfErrors += 1
                    }

                    if (numberOfErrors > 0) {
                        console.log('Create Reading test failed.')
                    } else {
                        console.log('Passed the Create Reading test!')
                    }
                })
            })
        })
    }
    return exports
}
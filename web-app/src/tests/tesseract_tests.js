module.exports = function ({tesseract}) {

    const exports = {}

    /**
     * Performs OCR on an image with known value/result
     * and validates that it has been recognized correctly.
     */
    exports.testRecognizeTestImage = async function() {

        result = await tesseract.getImageRecognition()
        trimmedResult = result.trim()
        
        success = trimmedResult == '00152'

        if (success) {
            console.log('Tesseract test succeeded!')
        } else {
            console.log('Tesseract test failed.')
        }
    }

    return exports

}
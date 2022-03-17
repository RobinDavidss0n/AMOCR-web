module.exports = function({filesystemRepo}) {

    const exports = {}

    /**
     * Tests the getFilesFromFolder function.
     */
    exports.testGetFilesFromFolder = function() {

        testFolder = 'src/presentation-layer/public/meter-images/'
        fileArray = filesystemRepo.getFilesFromFolder(testFolder)

        console.log(fileArray)
    }


    return exports
}
module.exports = function({filesystemRepo}) {

    const exports = {}
    const meterImagesPath = 'src/presentation-layer/public/meter-images/'


    /**
     * Returns an array with the names of all subfolders within the meter-images folder.
     * @returns {Array<string>}
     */
    exports.getAvailableFolders = function() {
            
            return filesystemRepo.getAvailableFolders(meterImagesPath)
    }

    /**
     * Write a file to given path.
     * Returns an array with content depending on the result of the write.
     * @param {string} folderPath
     * @param {string} data
     * @param {string} fileName
     * @param {string} fileType
     * @returns {Promise<Array>} Success: [true, null, null] || Fail: [false, 'internalError', error.stack]
     */
    exports.writeFile = function (folderPath, data, fileName, fileType) {

        return filesystemRepo.writeFile(folderPath, data, fileName, fileType)

    }

    return exports

}
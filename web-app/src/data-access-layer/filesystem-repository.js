const fs = require('fs')

module.exports = function () {

    const exports = {}

    /**
     * Returns an array with the names of all files in the specified directory.
     * Will not return directories.
     * @param {string} folderPath
     * @returns {Array<string>} 
     */
    exports.getFilesFromFolder = function (folderPath) {

        return fs.readdirSync(folderPath, { withFileTypes: true })
            .filter(dirent => dirent.isFile())
            .map(dirent => dirent.name)
    }

    /**
     * Returns an array with the names of all folders in the specified directory.
     * @param {string} folderPath
     * @returns {Array<string>} 
     */
    exports.getAvailableFolders = function (folderPath) {

        return fs.readdirSync(folderPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
    }

    /**
     * Write a file to given path.
     * Returns an array with content depending on the result of the write.
     * @param {string} folderPath
     * @param {string} data
     * @param {string} fileName
     * @param {string} fileType
     * @returns {Promise<Array>} Success: [true] || Fail: [false, 'internalError', error.stack]
     */
    exports.writeFile = function (folderPath, data, fileName, fileType) {

        file = folderPath + fileName + '.' + fileType

        return new Promise(resolve => {
            fs.writeFile(file, data, { flag: 'ax' }, function (error) {
                if (error) {
                    console.log(error)
                    resolve([false, 'internalError', error.stack])
                } else {
                    resolve([true, null, null])
                }
            })
        })



}


return exports
}
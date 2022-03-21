const fs = require('fs')
const path = require('path')

module.exports = function() {

    const exports = {}

    /**
     * Returns an array with the names of all files in the specified directory.
     * @param {string} folderPath
     * @returns {Array<string>} 
     */
    exports.getFilesFromFolder = function(folderPath) {

        return fs.readdirSync(folderPath)
    }
    

    /**
     * Returns an array with the names of all folders in the specified directory.
     * @param {string} folderPath
     * @returns {Array<string>} 
     */
    exports.getAvailableFolders = function(folderPath) {
        
        return fs.readdirSync(folderPath, { withFileTypes: true } )
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name)
    }


    return exports
}
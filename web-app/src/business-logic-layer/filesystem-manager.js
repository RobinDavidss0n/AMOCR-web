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

    return exports

}


module.exports = function ({ }) {

    const exports = {}


    /**
     * Take an array with json objects and 
     * returns a string in cvs format.
     * @param {Array} filename
     * @returns {string}
     */
    exports.getCsvString = function (rows) {
        var csvFile = '';
        Object.keys(rows[0]).forEach(key =>{
            csvFile += key+','
        })
        csvFile = csvFile.slice(0, -1)
        csvFile += '\n'
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }
        
        console.log(csvFile)
        return csvFile;
    }

    function processRow(row) {
        var finalVal = '';
        i = 0;
        Object.entries(row).forEach(([_, row]) => {
            
            var innerValue = row === null ? '' : row.toString()
            // if (row instanceof Date) {
            //     innerValue = row.toLocaleString()
            // }

            var result = innerValue.replace(/"/g, '""')
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"'

            if (i > 0){
                finalVal += ','
            }

            finalVal += result
            i += 1

        })

        return finalVal + '\n'
    };



    return exports
}
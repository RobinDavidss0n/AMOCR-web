const  {createWorker}  = require('tesseract.js')
const path = require('path')

module.exports = function({}) {
    
    const exports = {}
    

    /**
     * Attempts to perform OCR on the specified image. If filename is empty, OCR will be
     * performed on a local test image.
     * @param {string} filename
     * @returns {string}
     */
    exports.getImageRecognition = async function(path='', filename='_testImage.jpeg') {

        image = path+'/'+filename
        language = 'eng'

        console.log(image)
        
        const rectangle = { left: 1, top: 1, width: 2, height: 2 }
        const worker = createWorker({
            //logger: m => console.log(m),
          });

        return await new Promise(resolve => {
            (async () => {
                await worker.load();
                await worker.loadLanguage(language);
                await worker.initialize(language);
                await worker.setParameters({
                    tessedit_char_whitelist: '0123456789',
                });                
                const { data: { text } } = await worker.recognize(image /*, { rectangle }*/);
                //console.log(text);
                await worker.terminate();
                resolve(text)
            })()}
        )
    }

    return exports
}
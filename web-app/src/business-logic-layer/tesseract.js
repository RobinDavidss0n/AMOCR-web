const  {createWorker}  = require('tesseract.js')
const path = require('path')

module.exports = function({}) {
    
    const exports = {}
    

    /**
     * Attempts to read the test image and logs the result to the console.
     */
    exports.recognizeTestImage = function() {

        image = path.resolve('src/presentation-layer/public/meter-images/_testImage.jpeg')
        language = 'eng'
        
        const rectangle = { left: 180, top: 128, width: 385, height: 134 }
        const worker = createWorker({
            logger: m => console.log(m),
          });

        (async () => {
            await worker.load();
            await worker.loadLanguage(language);
            await worker.initialize(language);
            await worker.setParameters({
                tessedit_char_whitelist: '0123456789',
              });
            const { data: { text } } = await worker.recognize(image, { rectangle });
            console.log(text);
            await worker.terminate();
        })();
    }

    return exports
}
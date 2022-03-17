
// Toggle true/false to run or not run tests:
const willRunGeneralTests = false
const willRunTesseractTests = false
const willRunFilesystemTests = false

const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')


module.exports = function({dbTests, tesseractTests, fsTests}){

    const app = express()
    
    /********************************* Setup extensions *********************************/
    app.use(bodyParser.urlencoded({
        extended: false
    }))

    
    /************************ Setup views and layout directories ************************/
    app.set('views', path.join(__dirname, 'views'))
    
    app.engine('hbs', expressHandlebars({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutDir: path.join(__dirname, 'layouts')
    }))
    
    
    /***************************** Setup static directories *****************************/
    app.use(express.static(path.join(__dirname, 'public')))


    /************************************ Run tests *************************************/
    if (willRunGeneralTests) {
        console.log('Running general tests...\n')
        dbTests.runAllTests()
    }

    if (willRunTesseractTests) {
        console.log('Running Tesseract tests...\n')
        tesseractTests.testRecognizeTestImage()
    }

    if (willRunFilesystemTests) {
        console.log('Running File System tests...')
        fsTests.testGetFilesFromFolder()
    }

    //dbTests.testCreateReadingsFromFolder()


    /************************************************************************************/
    
    
    return app
}

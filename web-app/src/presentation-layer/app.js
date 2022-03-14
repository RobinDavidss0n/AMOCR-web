const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')

// Toggle true/false to run or not run tests:
const willRunTests = false


module.exports = function({dbTests}){

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
    if (willRunTests) {
        console.log('Running tests...\n')
        dbTests.runAllTests()
    }

    return app
}

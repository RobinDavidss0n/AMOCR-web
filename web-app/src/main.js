const awilix = require('awilix')
const container = awilix.createContainer()


// Setup DI container:
container.register({
    /********************************************** TESTS **********************************************/
    dbTests:                awilix.asFunction(require('./tests/db_tests')),
    tesseractTests:         awilix.asFunction(require('./tests/tesseract_tests')),
    fsTests:                awilix.asFunction(require('./tests/fs_tests')),
    
    /******************************************* DATA ACCESS *******************************************/
    readingsRepo:           awilix.asFunction(require('./data-access-layer/readings-repository')),
    filesystemRepo:         awilix.asFunction(require('./data-access-layer/filesystem-repository')),

    /***************************************** BUSINESS LOGIC ******************************************/
    readingsManager:        awilix.asFunction(require('./business-logic-layer/readings-manager')),
    tesseract:              awilix.asFunction(require('./business-logic-layer/tesseract')),

    /******************************************* PRESENTATION ******************************************/
    homeRouter:             awilix.asFunction(require('./presentation-layer/routers/home-router')),
    resultsRouter:          awilix.asFunction(require('./presentation-layer/routers/results-router')),

    /******************************************** APPLICATION ******************************************/
    app:                    awilix.asFunction(require('./presentation-layer/app'))
})


// Initiate web application:
const app = container.resolve('app')


// Listen for incoming HTTP requests:
app.listen(8080, function() {
    console.log('Web application listening on port 3030.')
})

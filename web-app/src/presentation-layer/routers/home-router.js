const express = require('express')

module.exports = function ({}) {

    const router = express.Router()

    router.get('/', function (request, response) {
        
        response.render('home.hbs')
      
    })
    
    return router
}
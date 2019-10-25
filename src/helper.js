"use strict"

const axios = require('axios');

/**
 * Server Error Handler
 */
const errorHandler = (error, res) => {
    if (error.response) {
        res.status(error.response.status)
        res.send({ message: error.message})
    } else if (error.request) {
        console.log('Empty response')
        res.status(503)
        res.send({ message: error.message})
    } else {
        console.log('Error Message:', error.message)
        res.status(500)
        res.send({ message: error.message})
    }
}

/**
 * Get data from a remote server
 */
exports.getRequest = (url, req, res) => {
    
    // HTTP GET Request
    axios.get(url)
        
        // Handle Success
        .then(response => res.status(response.status).send(response.data))
        
        // Handle Errors
        .catch(error => errorHandler(error, res))

        // Always log
        .finally(() => console.log(`=====> ${req.method} ${req.path} to ${req.ip}`))
}

"use strict"

// Load .env file
require('dotenv').config()

const express = require('express')
const app     = express()
const helper  = require('./helper.js');

const protocol  = process.env.PROTOCOL = process.env.PROTOCOL || 'http'
const host      = process.env.HOST = process.env.HOST || 'localhost'
const port      = process.env.PORT = process.env.PORT || 5001
const env       = process.env.NODE_ENV || 'dev'
const dev       = env !== 'production'

/**
 * Middleware adds default headers
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 'max-age=60');
    next();
});

// Routes must be defined before serving assets as order matters

// HTTP GET Price API
app.get('/api/priceData', (req, res) => helper.getRequest('https://api.coindesk.com/v1/bpi/currentprice.json', req, res))

// HTTP GET Chart Data API
app.get('/api/chartData', (req, res) => helper.getRequest('https://api.coindesk.com/v1/bpi/historical/close.json', req, res))

// HTTP GET Echo
app.get('/api/echo/:input', (req, res) => res.status(202).send({ input: req.params.input }))

// Server dist folder as static root
app.use(express.static('dist'))

// Listen for incoming requests
app.listen(port, () => {
    console.info(dev ? `Node Environment: ${env}` : `Production Mode`)
    console.info(`Server started at ${protocol}://${host}:${port}`)
})

const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')


// Database - como a API de Promise do mongoose esta depreciada, entao esta sendo feito uma atribuicao da API de promise do Node
mongoose.Promise = global.Promise
mongoose.connect('mongodb://bd/mydb', { useNewUrlParser: true, useUnifiedTopology: true })

// test
server.get('/', (req, res, next) => res.send('Backend'))

// middlewares
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({ new: true, runValidators: true })

// Routes
Client.register(server, '/clients')

// server start
server.listen(3000)
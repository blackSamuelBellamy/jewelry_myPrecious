const express = require('express')
const indexController = require('../controller/index.Controller')
const app = express()

app.get('/', indexController.welcome)
app.get('/joya/:id', indexController.listarJoya)
app.get('/joyas', indexController.listar)
app.get('/joyas/filtros', indexController.filtrar)
app.get('*', indexController.notFound)

module.exports = app
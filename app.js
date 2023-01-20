const express = require('express')
const cors = require('cors')
const message = require('./src/components/message')
const mostrar = require('./src/routes/indexRoutes')
const app = express()
const PORT = 3000

app.use(cors())

app.use('/', mostrar)

app.listen(PORT, message(PORT))
const express = require('express')
const setupDB = require('./config/database')
const router = require('./config/routes')
const app = express()
const port = 3045


app.use(express.json())
app.use('/',router)

setupDB()

app.listen(port, () => {
    console.log('listening on port', port)
})
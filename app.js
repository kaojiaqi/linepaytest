const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',express.static(__dirname + "/public/views"))


app.listen(process.env.port || 3000);
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/',express.static(__dirname + "/public/views"))

app.get('/test',(req,res) => {
    res.send("test")
})

app.listen(process.env.PORT || 3000);
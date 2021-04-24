require('dotenv').config()
var express = require('express')
var app = express()
var port = 3000
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})


app.listen(process.env.PORT, () => {
    console.log(`Loading api listening at http://localhost:${port}`)
  })
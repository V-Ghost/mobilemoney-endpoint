require('dotenv').config()
const axios = require('axios');
var express = require('express')
var app = express()
var port = 3000
let config = {
  headers: {
    Authorization: 'Bearer sk_test_fda84a0251f0521e87cea8b0a675ccd4d6c74269',
    'Content-Type': 'application/json'
  }
}

let params = JSON.stringify({
  "email": "vukaniabryan@email.com",
  "amount": "20000",
  
})
// respond with "hello world" when a GET request sis made to the homepage
app.get('/', function (req, res) {
  return res.send(process.env.PORT)
  // axios.post('https://api.paystack.co/transaction/initialize', params, config)
  // .then(feedback => {
  //   // console.log(`statusCode: ${res.statusCode}`)
  //   console.log(feedback.data)
  //   res.send("streets be cold")
  // })
  // .catch(error => {
  //   console.log(error)
  //   res.send("error")
  // })
})

app.post('/callback', (req, res) => {
  console.log(req.body)
  return res.end()
})


app.listen(process.env.PORT, () => {
    console.log(`Loading api listening at http://localhost:${port}`)
  })
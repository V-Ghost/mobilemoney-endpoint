require('dotenv').config()
const axios = require('axios');
var express = require('express');
var app = express();
var port = 3000;
var fs = require("firebase-admin");



const serviceAccount = require('./admin-key/shuttler-23bfb-1a6fc3c068f5.json');

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount)
});
const db = fs.firestore();
const shuttlesdb = db.collection('shuttles');
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
app.get('/:tagId',async function  (req, res)  {
  console.log(req.params);
  await shuttlesdb.doc("shuttle").set(req.params);
  return res.send(req.params);
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
  console.log(req.params)
  return res.end()
})


app.listen(process.env.PORT, () => {
    console.log(`Loading api listening at http://localhost:${port}`)
  })
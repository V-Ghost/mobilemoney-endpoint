require('dotenv').config()
const axios = require('axios');
var express = require('express');
var app = express();
var port = 3000;
var fs = require("firebase-admin");
const path = require('path');


const serviceAccount = require('./admin-key/shuttler-23bfb-1a6fc3c068f5.json');
  function print(text){
   console.log(text);
  }
fs.initializeApp({
  credential: fs.credential.cert(serviceAccount)
});
const db = fs.firestore();
const shuttlesdb = db.collection('shuttles');
const triggerdb = db.collection('triggers');
let config = {
  headers: {
    Authorization: 'Bearer sk_test_fda84a0251f0521e87cea8b0a675ccd4d6c74269',
    'Content-Type': 'application/json'
  }
}
var defaultAuth = fs.auth();
// let params = JSON.stringify({
//   "email": "vukaniabryan@email.com",
//   "amount": "20000",
  
// })
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});
app.get('/tag/:tagId',async function  (req, res)  {
  var userId ;
  
  var result = await db.collection("shuttleUsers").where('tagId', '==', req.params.tagId).get();

  if(result.docs.length > 0){
    result.docs.forEach(element => {
      print(element.id)
      userId = element.id;
    });
    var bookedTrips = await db.collection("trips").where('status', '==', 'booked').where('user','==',userId).get();
    var ongoingTrips = await db.collection("trips").where('status', '==', 'ongoing').where('user','==',userId).get();
  console.log(bookedTrips.empty)
    var tripId ;
    if(bookedTrips.docs.length>0){
      
      bookedTrips.docs.forEach(element =>{
      tripId = element.id;
      });
      await db.collection("trips").doc(tripId).update({
        "status": 'ongoing',
      });

      

    }

    if(ongoingTrips.docs.length>0){
      ongoingTrips.docs.forEach(element =>{
      tripId = element.id;
      });
      await db.collection("trips").doc(tripId).update({
        "status": 'expired',
      });

      

    }
  }
 
  
 
  return res.send(req.params);
 
})

app.get('/callback', (req, res) => {
  console.log(req.params)
  return res.send("jioi")
})

app.get('/momo', (req, res) => {
  console.log(__dirname);
 return res.sendFile(path.join(__dirname, '/index.html'));
})


app.get('/employee/:username/password/:password', (req, res) => {
  console.log(req.params.username)
  defaultAuth
  .createUser({
     email: req.params.username+'@rfftgyhj.com',
    password: req.params.password
  })
  .then(async function(userRecord) {

    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
    await db.collection("employees").doc(userRecord.uid).set({
     "name": req.params.username
    });

    return res.sendStatus(200);
  })
  .catch((error) => {
   
    console.log('Error creating new user:', error);
    return res.send(error.message)
  });
 
})

app.get('/trigger/:busId', async function (req, res) {
  var trigger = await triggerdb.doc(req.params.busId).get();
  
  
  return res.send(trigger.data()["trigger"]);
})


app.listen(process.env.PORT, () => {
    console.log(`Loading api listening at http://localhost:${port}`)
  })
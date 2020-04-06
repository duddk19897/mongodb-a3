const path = require('path');
const express = require('express');
const ejs = require('ejs');
const gallery = require('./gallery');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

const Pictures = require ('./models/Pictures.js')

app.locals.gallery = gallery
app.set('view engine','ejs');

app.get('/',function(req, res){
    res.render('index',{title:'main page'});
});
app.get('/gallery',function(req, res){
  res.render('gallerysm',{title:'gallery'});
});


app.get('/gallery/:id',function(req, res){
  app.locals.photoid = req.params.id;
  res.render('gallery',{title:'gallery'});
});


/*******************************/
/* Mongoose/MongoDB Connection */
/*******************************/

// Set up a pending connection to the database
// See: https://mongoosejs.com/docs/
const dbURI = process.env.MONGODB_URL;
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Connect to database. Mongoose handles the asynchronous aspects internally so we don't have to.
var db = mongoose.connection;

// Set a callback in case there's an error.
db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});
// Set a callback to let us know we're successfully connected
db.once('open', function() {
  console.log('Connected to DB...');
});

/*************************/
/* /definitions Endpoint */
/*************************/

app.get('/definitions', function(request, response){
  // Set global nav class for current tab
  response.locals.currentDefinitions = 'current';

  // Use Mongoose static model (i.e. one that is not instatiated) to pull definitions list from Atlas
  Definition.find(function(error, result) { 
    response.render('definitions',{definitions: result});
  });
});

app.get('/definitions/:slug', function(request,response){
  // Use Mongoose static model (i.e. one that is not instatiated) to pull one definition that matches the slug parameter
  Definition.findOne({slug: request.params.slug},function(error, result) { 
    if(error){
      return console.log(error);
    }
    response.render('definition',result);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});




  //css styling // 
  app.use(express.static(path.join(__dirname, 'public')));
  

  //error page setup// 
  app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
  });
  
  //local:hose:3000// 
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
  });


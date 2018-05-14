'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT;
// need to require mongodb

app.use('/public', express.static(process.cwd() + '/public'));

// serves static file by default containing instructions to use this microservice
app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// need route for shortened URLs




// timestamp microservice
// going to need regex to account for URL after the path I think
app.route('/new-url/')
  .get(function(req, res) {
    let originalURL = 'https://www.test.com';
    let shortURL = 'https://ms1-url-micro.glitch.me/1234';

    res.json({ original_url: originalURL, short_url: shortURL });
  });

// respond not found for all invalid routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// error handling for middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});


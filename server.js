'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT;
const datastore = require('./datastore.js'); // mongodb datastore
const validUrl = require('valid-url'); // to check for url validity

app.use('/public', express.static(process.cwd() + '/public'));

// serves static file by default containing instructions to use this microservice
app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// retrieve stored url and redirect user
app.route('/:urlCode')
  .get(function(req, res) {
    let urlCode = req.params.urlCode;
    // if short code doesn't exist, return error
    if (!datastore.getCode(urlCode)) {
      res.status(404);
      res.type('txt').send('Record Not Found');
    }
    // else redirect to stored url
    else {
      let redirectToUrl = datastore.getCode(urlCode).original_url;
      res.redirect(redirectToUrl);
    }
  });

// create shortened url
app.route('/api/url/*')
  .get(function(req, res) {
    let originalURL = req.params[0];
    let shortURL = 'https://ms1-url-micro.glitch.me/';
    // if invalid URI submitted, return json error
    if (!validUrl.isWebUri(originalURL)){
        shortURL = 'Not a valid URI';
    }
    // if submitted URI is already in the database, return existing value
    else if (datastore.getOriginal(originalURL)) {
      shortURL += datastore.getOriginal(originalURL).code;
    }
    // else create and store random 8 character string (a-z)(0-9)
    else {
      datastore.createUrl(originalURL, shortURL);
      shortURL += datastore.getOriginal(originalURL).code;
    }
    // return json response
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


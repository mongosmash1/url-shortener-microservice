'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT;
const datastore = require('./datastore.js'); // mongodb datastore
const validUrl = require('valid-url'); // to check for url validity

var mongoResults = function(err, res) {
  console.log(res);
  let results = res;
  return results;
}

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
    // redirects to stored url if it exists
    datastore.get('urlCode', urlCode, function(err, doc) {
      if (err) throw err;
      if (!doc) {
        res.status(404);
        res.type('txt').send('No record found for that shortened URL');
      } else {
      let redirectToUrl = doc.urlTarget;
      res.redirect(redirectToUrl);
      }
    });
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
    // check if submitted URL is already in the database
    datastore.get('urlTarget', originalURL, function(err, doc) {
      if (err) throw err;
      if (doc) {
        originalURL = doc.urlTarget;
        shortURL += doc.urlCode;
        res.json({ original_url: originalURL, short_url: shortURL });
      } else {
        datastore.put(originalURL);
        datastore.get('urlTarget', originalURL, function(err, doc) {
          if (err) throw err;
          if (doc) {
            originalURL = doc.urlTarget;
            shortURL += doc.urlCode;
            res.json({ original_url: originalURL, short_url: shortURL });
          }
        });
      }
    });
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


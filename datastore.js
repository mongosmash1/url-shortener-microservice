"use strict";

const mongo = require('mongodb').MongoClient;
// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const crypto = require('crypto');

//
// document schema is { _id, original_url, code, short_url }
//


exports.getOriginal = function () {
  mongo.connect(MONGODB_URI, function(err, client) {
    if (err) throw err;
    const db = client.db(process.env.DB);
    const url = db.collection(process.env.COLLECTION);
    // this find needs some work, not sure toArry is necessary, JSON would be better
    url.find({}).toArray(function (err, url){
      if (err) throw err;
      return url;
      client.close;
    });
  });
}

exports.getCode = function () {
  mongo.connect(MONGODB_URI, function(err, client) {
    if (err) throw err;
    const db = client.db(process.env.DB);
    const url = db.collection(process.env.COLLECTION);
    // this find needs some work, not sure toArry is necessary, JSON would be better
    url.find({}).toArray(function (err, url){
      if (err) throw err;
      return url;
      client.close;
    });
  });
}

exports.createUrl = function (orig, short) {
  mongo.connect(MONGODB_URI, function(err, client) {
    if (err) throw err;
    const db = client.db(process.env.DB);
    const url = db.collection(process.env.COLLECTION);
    let original_url = orig;
    let short_url = short;
    let code = generateCode(8);
    // but if newly randomized code already exists, create a new code
    // create document only
  });
}

function generateCode(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')  // convert to hexadecimal format
        .slice(0,length); // return required number of characters
}
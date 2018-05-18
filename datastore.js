"use strict";

const mongo = require('mongodb').MongoClient;
// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
const MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
const crypto = require('crypto');

//
// document schema = {
//   urlCode, (8 digit alphanumeric code)
//   urlTarget (url of website that code redirects to)
// }
//


exports.get = function (key, value, callback) {
  mongo.connect(MONGODB_URI, function(err, client) {
    if (err) throw err;
    const db = client.db(process.env.DB);
    const url = db.collection(process.env.COLLECTION);
    var query = {};
    query[key] = value;
    url.find(query).project({ _id: 0, urlCode: 1, urlTarget: 1 }).toArray(function (err, docs){
      if (err) {
        client.close;
        callback(err);
      } else {
        let results = docs[0];
        callback(null, results);
        client.close;
      }
    });
  });
}

exports.put = function (urlTarget) {
  mongo.connect(MONGODB_URI, function(err, client) {
    if (err) throw err;
    const db = client.db(process.env.DB);
    const url = db.collection(process.env.COLLECTION);
    // at some point should add logic to check if 8 digit code is unique in the database
    let urlCode = generateCode(8);
    // create document only
    var doc = { 'urlCode': urlCode, 'urlTarget': urlTarget };
    url.insert(doc, function(err, doc) {
      if (err) throw err;
      client.close();
    });
  });
}

function generateCode(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')  // convert to hexadecimal format
        .slice(0,length); // return required number of characters
}
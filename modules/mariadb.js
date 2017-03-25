var client = require('mariasql');
var inspect = require('util').inspect;
var config = require('../config/config.js');

// Asking MariaDB
function query(queryString,options, cb){
  // Prepare client connection
  var c = new client(config.mariadb);
  // Preparing the query
  var pq = c.prepare(queryString);
  // console.log(queryString);
  console.log(pq(options));
  // Array which will store the rows
  var result = [];
  var error = undefined;
  var qcnt = 0;

  // Executing the query and passing parameters
  c.query(pq(options))
    .on('result', (res) => {
      // Count numbers of results
      console.log('Query Result Number ' + ++qcnt + 'received.');
      res.on('data', (row) => {
          result.push(row);
          console.log('Result row: ' + inspect(row));
        })
        .on('error', (err) => {
          console.log('Query Result received Error: ' +err);
        })
        .on('end', (info) => {
          console.log('Query Result finished: ' + info);
      });
    })
    .on('end', () => {
      // ToDo: Check if result was executed, If not nothing was found,inserted
      // updated or deleted
      cb(error, result);
      console.log('Query finished');
      c.end();
  });

  // Events the client listens on
  c.on('ready', () => {
      console.log('MariaDB Client connected');
    })
    .on('error', (err) => {
      console.log('MariaDB Client received Error: ' + err);
      cb(err,null);
    })
    .on('close', (hadError) => {
      if(hadError){
        console.log('MariaDB Client closed with Error: ' + hadError);
      } else {
        console.log('MariaDB Client closed');
      }
  });
};

module.exports.query = query;
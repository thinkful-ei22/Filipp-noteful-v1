'use strict';

// // Load array of notes
// const data = require('./db/notes');

// // Simple In-Memory Database
// const simDB = require('./db/simDB');
// const notes = simDB.initialize(data);

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const morgan = require('morgan');

const { PORT } = require('./config');

const notesRouter = require('./router/notes.router.js');

//const {requestLogger} = require('./middleware/logger');

//Create an Express Application
const app = express();

//Log all requests
//app.use(requestLogger);
app.use(morgan('dev'));

//Create a static webserver
app.use(express.static('public'));

//Parse request body
app.use(express.json());


// app.get('/boom', (req, res, next) => {
//   throw new Error('Boom!!');
// });

app.use('/api', notesRouter);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

// Listen for incoming connections
if (require.main === module) {
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = app; // Export for testing
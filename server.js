'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

const { PORT } = require('./config');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;

  if (searchTerm) {
    res.json(data.filter(item => item.title.includes(searchTerm)));
  }
  else {
    res.json(data);
  }
  
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  res.json(data.find(item => item.id === Number(id)));
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
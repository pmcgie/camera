const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const databaseUrl = process.env.dbUrl || 'mongodb://localhost:27017';
const app = express();

app.use(bodyParser.json({limit: '50mb'}));

mongoose.connect(databaseUrl);

const Photo = mongoose.model('Photo', {dataUri: String});

app.post('/api/photo', (req, res) => {
  const photo = new Photo({dataUri: req.body.dataUri});
  photo
    .save()
    .then(() => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

app.get('/api/gallery', (req, res) => {
  Photo.find((err, photos) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(photos);
  });
});

app.listen(process.env.PORT || 3001);

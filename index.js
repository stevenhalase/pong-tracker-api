const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3090;

const uristring =
  process.env.MONGODB_URI ||
  'mongodb://stevenhalase:TIffany11..11..@pong-tracker-shard-00-00-hdhqi.mongodb.net:27017,pong-tracker-shard-00-01-hdhqi.mongodb.net:27017,pong-tracker-shard-00-02-hdhqi.mongodb.net:27017/test?ssl=true&replicaSet=pong-tracker-shard-0&authSource=admin';

mongoose.connect(uristring, (error) => {
  if (error) {
      console.error(error);
  } else {
      console.log('Mongoose connected successfully')
  }
})

const apiBase = '/api/v1/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let PlayerRoutes = require('./routes/PlayerRoutes');
app.use(apiBase + 'players', PlayerRoutes);

let GamesRoutes = require('./routes/GameRoutes');
app.use(apiBase + 'games', GamesRoutes);

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
})
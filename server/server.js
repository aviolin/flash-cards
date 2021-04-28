const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
const cors = require('cors');

const decksRoute = require('./routes/decks');

app.use(cors());
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/decks', decksRoute);

app.get('/', (req, res) => {
  res.send("Home");
})

mongoose.connect(process.env.DB_CONNECTION2,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to DB!");
  }
)

app.listen(5000);
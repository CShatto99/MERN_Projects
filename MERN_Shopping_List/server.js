const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// DB config
const db = require('./config/keys').mongoUri;

// Connect to Mongo
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err)
);

app.use('/api/items', require('./routes/api/items'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}...`));

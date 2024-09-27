const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorHandler');

connectDB();

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/events', require('./routes/eventRoute'));

// app.use(express.static(path.join(__dirname, '../client')));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const fetchAndStoreEvents = require('./apiEvents');
// fetchAndStoreEvents();
setInterval(fetchAndStoreEvents, 3600000); // 1 hour

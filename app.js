const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require('./routes/auth');
const passport = require('passport');
require('./config/passport');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    console.log('get route working');
    res.send('start me up!');
});

authRoutes(app);

app.listen(port, () => {
    console.log(`start me up on port ${port}!`);
});

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('start me up!');
});

app.listen(port, () => {
    console.log(`start me up on port ${port}!`);
});

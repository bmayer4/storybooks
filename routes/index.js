const express = require('express');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.render('index/welcome');
    });

    app.get('/dashboard', (req, res) => {
        res.send('dashboard works');
    });

};
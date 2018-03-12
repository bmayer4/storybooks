const express = require('express');
const {authRequired, isGuest} = require('../helpers/auth');
const mongoose = require('mongoose');
const Story = mongoose.model('Story');

module.exports = (app) => {

    app.get('/', isGuest, (req, res) => {
        res.render('index/welcome');
    });

    app.get('/dashboard', authRequired, (req, res) => {
        Story.find({ user: req.user.id }).then((stories) => {
            res.render('index/dashboard', { stories: stories });
        });
    });  

    app.get('/about', (req, res) => {
        res.render('index/about');
    });

};
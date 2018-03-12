const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', { 
        scope: ['profile', 'email'] 
    }));

    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/dashboard');
    });

    app.get('/verify', (req, res) => {
        console.log(req.user);
    });

    app.get('/auth/logout', (req, res) => {
       //https://accounts.google.com/logout  logs you out of ALL google accounts, mail, youtube, etc.
        req.logout();            
        res.redirect('/');
    });

};
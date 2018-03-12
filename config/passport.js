const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
    done(null, user.id);  
});                       

passport.deserializeUser((id, done) => { 
    User.findById(id).then((user) => {
        if (user) {
            done(null, user);  
        }
    })
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => { 
    console.log('Profile: ', profile.id);
    const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
 
    //use async await here instead
    User.findOne({ googleId: profile.id }).then((user) => {
        if (user) { 
            return done(null, user) 
        } 
        const newUser = new User({ googleId: profile.id, email: profile.emails[0].value, firstName: profile.name.givenName, lastName: profile.name.familyName, image: image});
        newUser.save().then((user) => {
            return done(null, user);
        });  

    });
    
    })
);

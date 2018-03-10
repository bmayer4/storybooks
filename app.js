const mongoose = require('mongoose');
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const indexRoute = require('./routes/index');
const passport = require('passport');
require('./models/user'); //must be before config/passport, since it relies on this  
require('./config/passport');
const app = express();
const port = process.env.PORT || 5000;
const keys = require('./config/keys');  

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

app.use(cookieParser());
app.use(session({
    secret: 'secret7673',  
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;   //WHERE WILL THIS BE USED!?!?!?!?....
    next();
});

authRoutes(app);
indexRoute(app);

app.listen(port, () => {
    console.log(`start me up on port ${port}!`);
});

const mongoose = require('mongoose');
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('./models/story');
const authRoutes = require('./routes/auth');
const indexRoute = require('./routes/index');
const storyRoutes = require('./routes/stories');
const passport = require('passport');
require('./models/user'); //must be before config/passport, since it relies on this  
require('./config/passport');
const app = express();
const port = process.env.PORT || 5000;
const keys = require('./config/keys');  
const path = require('path');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
    secret: 'secret7673',  
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Handlebars helper functions
const {truncate, stripTags, formatDate, select} = require('./helpers/hbs');

//Handlebars middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;   //WHERE WILL THIS BE USED!?!?!?!?....
    next();
});

authRoutes(app);
indexRoute(app);
storyRoutes(app);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`start me up on port ${port}!`);
});

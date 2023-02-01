const express = require('express');
const db = require('./config/mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')
const passportLocal = require('./config/passport-local-strategy');


const port = 8000;
const app = express();

//adds middleware to the exp app, which is used to parse the incoming request data in the body of an HTTP post request. The "bodyparser.urlencoded" function is used to parse incoming request bodies in a middleware before your handlers.
app.use(bodyparser.urlencoded({ extended: false }));

// parse cookies sent in the HTTP request header.
app.use(cookieParser());

// serve static files from a directory.
app.use(express.static('assets'));

// sets the view engine to use the "ejs" template engine.
app.set('view engine', 'ejs');
// sets the views directory to "./views", which means that the templates for the views are stored in the "views" directory in the root of the application.
app.set('views', './views');

// manages sessions for the Express application, storing session data in the MongoDB database specified by the mongoUrl option.
app.use(session({
    name: 'Employee Review System', // sets the name of the session.
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: ( 1000 * 60 * 100 )
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/Employee-Review-System',
            autoRemove: 'disabled'
        },
        function(err) {
            console.log('connection to mongodb setup ok', err)
        }
    )
}));

// initializes the passport library and sets it up for use in the Express application.
app.use(passport.initialize());
// sets up passport to use sessions to maintain authentication state between requests.
app.use(passport.session());

app.use(passport.setAuthentication);

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error while running the server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})
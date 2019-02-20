const express = require('express'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

//  Load User Model
require('./models/Users');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(keys.mongoURI, {
        useMongoClient: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();


app.get('/', (req, res) => {
    res.send('Home');
});

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
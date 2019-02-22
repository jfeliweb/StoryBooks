const express       = require('express'),
    path            = require('path'),
    exphbs          = require('express-handlebars'),
    mongoose        = require('mongoose'),
    cookieParser    = require('cookie-parser'),
    session         = require('express-session'),
    passport        = require('passport');

//  Load User Model
require('./models/Users');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

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

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global varibles
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

// Run Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
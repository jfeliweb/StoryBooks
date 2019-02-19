const express = require('express'),
      mongoose = require('mongoose'),
      passport = require('passport');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

const app = express();


app.get('/', (req, res) => {
    res.send('Home');
});

// Use Routes
app.use('/auth', auth);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
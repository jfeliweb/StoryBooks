const express = require('express'),
      mongoose = require('mongoose');

const app = express();


app.get('/', (req, res) => {
    res.send('Home');
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
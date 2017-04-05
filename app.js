const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', ()=>{
    console.log("Connected to databse " + config.database);
})

mongoose.connection.on('error', (err)=>{
    console.log('Database error: ' + err);
})

const app = express();

const users = require('./routes/users');

app.use(cors());

app.use(bodyParser.json());

app.use('/users', users);

//Port Number
const port = 3000;

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log('Server started on port ' + port);
});

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})
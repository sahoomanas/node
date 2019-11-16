const express=require('express');
const bodyParser=require('body-parser');

const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//initialize the express app
const app=express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const product=require('./routes/product.route');
app.use('/products',product);
// Require Notes routes
const notes=require('./routes/notes.route');
app.use('/notes',notes);

let port=1234;

app.listen(port,()=>{console.log("Server is up and running on port number "+port)})
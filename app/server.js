require('dotenv').config();
var express = require('express');
var app = express();

var port = process.env.NODE_DOCKER_PORT || 3000;

var mongoose = require('mongoose');   
var Libro = require('./api/models/book-model');

//created model loading here
var bodyParser = require('body-parser');

// mongoose instance connection url connection 
mongoose.Promise = global.Promise;
const dbConfig = require('./api/config/db.config.js');
console.log('dbConfig', dbConfig);
console.log('port', port);
console.log('process.env.NODE_DOCKER_PORT', process.env.NODE_DOCKER_PORT);

mongoose.connect(dbConfig.url);

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());   
var routes = require('./api/routes/book-route'); 

//importing route 
routes(app); 
//register the route   
app.listen(port);   
console.log('Servidor para RESTful API de Libros iniciada en puerto 3000:' + port);
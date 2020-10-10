var http = require("https");
var express = require("express");
var cors = require('cors')
var mongoose = require('mongoose');
var path = require('path');
const app = express();
var fs = require('fs');
var config =  require('./src/config/service');

app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000000 }));
app.listen(config.port);

var url = config.databaseurl
mongoose.connect(url, function (err, db) {
   if (err) throw err;
   console.log("Database created!");

});


var user_payment = require('./src/Routes/addnew_customer')

console.log("Hosting port :" + config.port);



// ####--------------   Start ------------###########


app.get('/', (req, res) => res.send('Hello World!'))



app.use('/payment', user_payment)

  // ####--------------   End   ------------###########

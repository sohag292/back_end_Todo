const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const morgan = require("morgan");
const bodyParser = require('body-parser');



//security Middleware Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitizer = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


//DatabaseLib Import
const mongoes = require('mongoose');
const { default: mongoose } = require('mongoose');


//security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitizer())
app.use(xss())
app.use(hpp())
app.use(bodyParser.json())


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
})
// Apply the rate limiting middleware to all requests
app.use(limiter)

//Mongo DB Database Connection
let URL = "mongodb://127.0.0.1:27017/Todo";
let OPTION={user:'', pass:"",autoIndex:true};
mongoose.connect(URL ,OPTION,(error)=>{
    console.log("Connection Success");
    console.log(error);
})

//Routing Implement
app.use("/api/v1", router)

//undigined Toute Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail", data:"Not Found"})
})

module.exports=app
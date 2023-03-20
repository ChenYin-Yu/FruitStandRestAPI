const express = require("express");
const routes = require("./routers/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const accountInfo = require('./accountInfo');

//set up express app 
const app = express();

//connect to mongodb
const dbURI = accountInfo.dbURI;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(process.env.port || 4000, ()=> {
        console.log("listening for requests");
    });
    })
    .catch((err)=> console.log(err));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

//initialize routes
app.get('/',(req, res)=>{
    res.render('index');
})
app.get('/vendor', (req, res) => {
    res.render('vendor');
})
app.get('/customer', (req, res) => {
    res.render('customer');
})
app.use('/api',routes);

app.use((err, req,res,next)=> {
    res.status(422).send({error: err.message});
})




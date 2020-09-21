const express = require("express");
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
require('dotenv').config();
const morgan = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const auth = require('./routes/auth.routes');
const app = express();



//passport config
require('./config/passport.setup')(passport);


//morgan
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

mongoose.connect(process.env.MONGODB_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
},(err)=>{
    if(err)throw err
    console.log("Database connected sucessfully");
})

//sessions
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
}))
//passport middleware
app.use(passport.initialize());
 app.use(passport.session());

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//method override middleware here
app.use(methodOverride('_method'));

//express handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//static files
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"))

//create home route
app.use('/auth' , auth);




app.get("/" ,(req,res)=>{
    res.render('home');
});

require('./routes/product.route')(app);
const PORT =process.env.PORT || 4000

app.listen(PORT , (err)=>{
    if(err) throw err;
    console.log(`server is running on  port number ${PORT}`);
});
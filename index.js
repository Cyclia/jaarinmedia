var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var dotenv = require('dotenv').config()
var expressValidator = require('express-validator');


var app = express();

// var logger = function(req, res, next){
//     console.log('Logging...');
//     next();
// }

//  api test
var api_key = process.env.API_KEY;

// app.use(logger);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

var users = [
    {
            id: 1,
            first_name: 'Michael',
            last_name: 'Jackson',
            email: 'wef@fekwo.nl',
    },
    {
            id: 2,
            first_name: 'Kurt',
            last_name: 'Cobain',
            email: 'test@test.nl',
    },
    {
            id: 3,
            first_name: 'Marco',
            last_name: 'Borsato',
            email: 'test@tejife.nl',
    },
]

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index', {
        title: 'Klanten',
        users: users,
    });
});

app.post('/users/add', function(req, res){

    req.checkBody('first_name', 'Voornaam is verplicht').notEmpty();
    req.checkBody('last_name', 'Achternaam is verplicht').notEmpty();
    req.checkBody('email', 'Email is verplicht').notEmpty();

    var errors = req.validationErrors();

    if (errors){
        console.log('ERROR'); 
    } else {

    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_name: req.body.email,
        }
        console.log('SUCCESS');
    }

});

app.listen(3000, function(){
    console.log('Server started on Port 3000');
    console.log(api_key);
})

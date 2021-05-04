var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var session = require('express-session');
var fileUpload = require('express-fileupload');
var expressValidator = require('express-validator');
var passport = require('passport');
const url = `mongodb+srv://scrumples:Scrumples1234@cluster0.od1pi.mongodb.net/uTrade-Scrumples?retryWrites=true&w=majority`
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

var path = require('path');
//init
var app = express();
// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// public folder setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public/'));

// Express file-upload
app.use(fileUpload());

// global error
app.locals.errors = null;

//page model
//var Page = require('./models/page');

var Category = require('./models/category')
Category.find(function (err, categories) {

    if (err) {
        return console.log(err);
    } else {
        app.locals.categories = categories

    }
    
 });




//Body-parser
app.use(express.urlencoded());

app.use(express.json());

//Express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
}))

// Express validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
}));

// Express messages

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

require('./config/passport')(passport);
// passport mw
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req,res,next) {
    res.locals.cart = req.session.cart;
    res.locals.user = req.user || null;
    next();
 });

var pages = require('./routes/pages.js');
var products = require('./routes/products.js');
var cart = require('./routes/cart.js');
var users = require('./routes/users.js');
var adminPages = require('./routes/admin_pages.js');
var adminCategories = require('./routes/admin_categories.js');
var adminProducts = require('./routes/admin_products.js');
app.use('/', pages);
app.use('/products', products);
app.use('/admin/pages', adminPages);
app.use('/admin/categories', adminCategories);
app.use('/admin/products', adminProducts);
app.use('/cart', cart);
app.use('/users', users);


var port = 8080;

app.listen(port, function () {

    console.log('Server started on port ' + port);
})
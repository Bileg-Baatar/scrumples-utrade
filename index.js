var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash = require('connect-flash'),
    User = require("./models/users");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://tony:tony123@cluster0.od1pi.mongodb.net/test?retryWrites=true&w=majority");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));

app.use(require("express-session")({
    secret: "uTrade was created by the Scrumples",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static("views"));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes

app.get("/", function (req, res) {
    res.render("home");
})

app.get("/home", function (req, res) {
    res.render("home");
})

app.get("/loggedin", isLoggedIn, function (req, res) {
    res.render("loggedin");
})

app.get("/register", function (req, res) {
    res.render("register");
})

app.post("/register", function (req, res) {
    var username = req.body.username
    var password = req.body.password
    User.register(new User({username: username}),
            password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }

        passport.authenticate("local")(
            req, res, function () {
                res.render("loggedin");
        });
    });
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/loggedin",
    failureFlash: "Invalid username or password."
}), function (req, res) {
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.get("/contact", function (req, res) {
    res.render("contact");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server has started!");
});
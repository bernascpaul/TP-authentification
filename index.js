const express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave : true,
    saveUninitialized: true
}));
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

//Authentification et Middleware
var auth = function(req, res, next) {
    if (req.session && res.session.user === "amy" && req.session.admin)
        return next();
    else
        return res.sendStatus(401);
}

app.post('/login', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.send(req.body);
        /* res.redirect('/login'); */
    } else if (req.body.username && req.body.password) {
        //req.session.user = req.body.username;
        //req.session.admin = true;
        res.send(JSON.stringify(req.body, null, "  "));
        //res.redirect('/content');
    }
});

//Login
app.get('/login', function (req, res) {
    if (!req.query.username || !req.query.password) {
        res.send('login failed');
    } else if (req.query.username === "amy" || req.query.password === "amypassword") {
        req.session.user = "amy";
        req.session.admin = true;
        res.send("Vous vous êtes loggés avec succès !");
    }
});

//Logout
app.get('/logout', function(req, res) {
    req.session.destroy();
    res.send("logout avec succès !");
});

//GetContent
app.get('/content', auth, function(req, res) {
    res.send("Vous pouvez seulement accèder a ce contenu si vous êtres loggés");
});

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
});
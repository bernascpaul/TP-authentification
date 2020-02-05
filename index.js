const express = require('express'), app = express(), session = require('express-session');
var path = require('path');

app.use(session
  ({
    secret: '2C44-4D44-WppQ38S',
    resave : true,
    saveUninitialized: true
  }));

var bodyParser = require('body-parser');
let low = require('lowdb');
FileSync = require('lowdb/adapters/FileSync');

adapter = new FileSync('db.json');

db = low(adapter);

function register(userName, userPassword) {
    // push and write to the db
        let newUser = {
          name: userName,
          password: userPassword
        };

        db.get('users').push(newUser).write();
        let user = db.get('users').find({name: userName}).value();
        console.log(user);
    }

function getUser(name) {
    let user = db.get('users').find({name: name}).value();
    return user;
    }


function logIn(name, password) {
      let co = false;
      let user = getUser(name);
      if(user != undefined) {
          if(user.password == password) {
              console.log('Vous êtes connecté');
              co = true;
          }
      } else {
        console.log('Nom inconnu');
        co = false
      }
      return co;
  }

app.use(bodyParser.urlencoded({ extended: false }))

//Authentification et Middleware
// var auth = function(req, res, next) {
//     if (req.session && res.session.user === "amy" && req.session.admin)
//         return next();
//     else { return res.sendStatus(401); }
// }


//login
app.post('/login', function (req, res, next) {
      if (!req.body.username || !req.body.password) {
          //res.send('Aucun accès récupéré' + req.body);
          res.sendFile(path.join(__dirname + '/co-problem-no-access.html'));

      } else if (logIn(req.body.username, req.body.password)) {
          //res.send("Vous vous êtes loggés avec succès !");
          //res.redirect('/content');

          req.session.user = "amy";
          req.session.admin = true;

          res.sendFile(path.join(__dirname + '/login-ok.html'));

      } else  { 
          //res.send(req.body) ; 
        //res.send("Vos identifiants sont incorrects");
        res.sendFile(path.join(__dirname + '/bad-access.html'));
        }
  });

  //Page de Création de compte
  app.get('/create-account', function(req, res) {
    res.sendFile(path.join(__dirname + '/create-account.html'));
  });

  //Inscription
  app.post('/register', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
      res.sendFile(path.join(__dirname + '/create-account-problem.html'));
        //res.send('Aucune information de compte récupérée pour inscription' + req.body);
    } else {
        register(req.body.username, req.body.password);
        //res.send("Enregistrement avec succès");
        //res.redirect('/content');
        res.sendFile(path.join(__dirname + '/create-account-ok.html'));

    }
});


//Logout
app.get('/logout', function(req, res) {
    req.session.destroy();
    //res.send("logout avec succès !");
    res.sendFile(path.join(__dirname + '/logout.html'));
});

//Accès zone sécurisée
app.get('/content', function(req, res) {
  if (req.session.admin) {
    res.sendFile(path.join(__dirname + '/content.html'));
  } else {
        //res.send("Vous pouvez seulement accèder a ce contenu si vous êtres loggés"); 
        res.sendFile(path.join(__dirname + '/content-blocked.html'));
  }


});

app.get('/', function (req, res) {
  //res.send('Hello World!')
  res.sendFile(path.join(__dirname + '/accueil.html'));
});

app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
});


// app.post('/loginPost', function (req, res, next) {
//     if (!req.body.username || !req.body.password) {
//         res.send(req.body);
//         /* res.redirect('/login'); */
//     } else if (req.body.username && req.body.password) {
//         //req.session.user = req.body.username;
//         //req.session.admin = true;
//         res.send(JSON.stringify(req.body, null, "  "));
//         //res.redirect('/content');
//     }
// });

//Login//Version d'origine
// app.get('/login', function (req, res) {
//     if (!req.query.username || !req.query.password) {
//         res.send('login failed');
//     } else if (req.query.username === "amy" || req.query.password === "amypassword") {
//         req.session.user = "amy";
//         req.session.admin = true;
//         res.send("Vous vous êtes loggés avec succès !");
//     }
// });

//Authentification et Middleware //Version d'origine
// var auth = function(req, res, next) {
//   if (req.session && res.session.user === "amy" && req.session.admin)
//       return next();
//   else { return res.sendStatus(401); }
// }

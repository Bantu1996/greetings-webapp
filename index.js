const GreetWithRespect = require('./greetFactory')
var express = require('express');
const flash = require('express-flash');
const session = require('express-session');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');


var app = express();

const greetings = GreetWithRespect();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({
  secret: "Please enter name!!",
  resave: false,
  saveUninitialized: true
}));


app.use(flash());



app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});



app.get('/', function (req, res) {
  res.render('index', {
    activeName: greetings.greetingLanguages(req.body.greetRadio, req.body.activeName),

  })
})



app.post('/greetings', function (req, res) {
  var activeNames = req.body.activeName
  var lang = req.body.greetRadio

  if (activeNames === "") {
    req.flash('error', 'Please enter name')
  }
  else if (lang === undefined) {
    req.flash('error', 'Please select language')
  } else {
    greetings.greetingLanguages(lang, activeNames)
  }

  let greet = {
    name: greetings.greetingLanguages(lang, activeNames),
    count: greetings.greetCounter()
  }
  console.log(greetings.greetCounter());
  res.render('index', {
    greet
  });
})



app.get('/greeted', function (req, res) {

  var list = Object.keys(greetings.getName())

  res.render('greeted', { greeted: list })
})



app.get('/actions/:activeName', function (req, res) {
  var activeName = req.params.activeName
  let greetedNames = greetings.getName(activeName)
  res.render('actions', { actions: greetedNames })
})



const PORT = process.env.PORT || 2011;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
})
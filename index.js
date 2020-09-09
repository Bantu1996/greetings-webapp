const GreetWithRespect = require('./greetFactory')
var express = require('express');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');

var app = express();

const greetings = GreetWithRespect();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public/css/'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', {
    activeName: greetings.greetingLanguages(req.body.greetRadio, req.body.activeName),
  
  })
})

app.post('/greetings', function (req, res) {
var activeNames = req.body.activeName
var lang = req.body.greetRadio
let greet = {
  name : greetings.greetingLanguages(lang, activeNames),
  count : greetings.greetCounter()
}
  


  console.log(greetings.greetCounter());

  res.render('index', {
    greet
  });
})

const PORT = process.env.PORT || 2011;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
})
const GreetWithRespect = require('./greetFactory')
var express = require('express');
const flash = require('express-flash');
const session = require('express-session');
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');
const pg = require("pg");
const Pool = pg.Pool;



const connectionString = process.env.DATABASE_URL || 'postgresql://bantu:s0ty@t0b@n2@localhost:5432/greeting';

const pool = new Pool({
  connectionString
});

const greetings = GreetWithRespect(pool);

var app = express();

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

app.get('/', async function (req, res) {
  try {
    let greet = {
      count: await greetings.greetCounter(),
      //insertFun:  greetings.insertFun(activeNames)
    }
    res.render('index', {
      greet

    })
  } catch (error) {
    console.log(error);
  }
})

app.post('/greetings', async function (req, res) {
  try {
    var activeNames = req.body.activeName
    var lang = req.body.greetRadio
    var count = req.body.theNumber
    if (activeNames === "" && lang === undefined) {
      req.flash('error', 'Please enter name and select a language')
    }
    else if (activeNames === "") {
      req.flash('error', 'Please enter name')
    }
    else if (lang === undefined) {
      req.flash('error', 'Please select language')
    } else {
      var s = await greetings.greetingLanguages(lang, activeNames)
      var cow = await greetings.greetCounter(count)
      // greetings.insertFun(activeNames)
    }

    let greet = {
      name: s,
      count: await greetings.greetCounter(),
      //insertFun:  greetings.insertFun(activeNames)
    }
      ;
    res.render('index', {
      greet, greetings

    });
  } catch (error) {
    console.log(error);

  }
})

app.get('/reset', async function (req, res) {
  try {
    await greetings.reset(),
      res.redirect('/')
  } catch (error) {
    console.log(error);

  }
});

app.get('/greeted', async function (req, res) {
  try {
    var list = await greetings.getList();
    console.log(list);

    res.render('greeted', { greeted: list })
  } catch (error) {
    console.log(error);

  }

})

app.get('/index', async function (req, res) {
  res.render('index')
});

app.get('/counter/:activeName', async function (req, res) {
  try {
    let activeName = req.params.activeName;
    var county = await greetings.nameMessage(activeName);
    for (const key in county) {

      var element = county[key];

    }
    console.log(element)
    var msg = "Awe, " + activeName + " you have been greeted " + element + " time/s" + "!"
    res.render('counter', {
      message: msg
    })
  } catch (error) {
    console.log(error);

  }
})

const PORT = process.env.PORT || 2011;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
})
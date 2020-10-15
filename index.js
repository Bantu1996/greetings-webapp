const GreetWithRespect = require('./greetFactory')
const routes = require('./routes')
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
const rout = routes(greetings)

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

app.get('/', rout.getting)

app.post('/greetings', rout.poster)
app.get('/reset', rout.resetBtt)

app.get('/greeted', rout.greeter)

app.get('/index', rout.homePage)

app.get('/counter/:activeName', rout.namer)

const PORT = process.env.PORT || 2011;
app.listen(PORT, function () {
  console.log("App started at port:", PORT)
})
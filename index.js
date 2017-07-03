const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');

const app = express();
const PORT = process.env.PORT || 3000;

const restaurantController = require('./controllers/restaurants');
const userController = require('./controllers/users');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Important: mount express middleware BEFORE passport middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// ====================================================================
// PASSPORT STUFF
//const passport = require('passport');
const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

// END PASSPORT STUFF
// ====================================================================

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/restaurants',restaurantController);
app.use('/users',userController);

// app.use('/user', require('./controllers/users'));
// app.use('/restaurants', auth.restrict, require('./controllers/restaurants'));

app.get('/', (req, res) => {
	console.log('does this work')
    res.render('restaurants/index');
});

app.listen(PORT, () => console.log('Server listening on port', PORT));
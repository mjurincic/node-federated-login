const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const address = require('address');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const configDB = require('./config/database.js');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connect to database
mongoose.connect('mongodb://localhost/sso');
// TODO: For older versions remove later
// mongoose.connect('mongodb://localhost:27017/stripe-node', {useMongoClient: true})
// seee about this
//     .then(function () {
//         console.log("Connected to MongoDB");
//     }).catch(err => console.error(err));

// require  passport for configuration
var passport =  require('./config/passport');

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// Routes
// load our routes and pass in our app and fully configured passport
app.use(require('./routes/index')(passport));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const httpsOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
};
const {HOST = '0.0.0.0'} = process.env;
const {PORT = 8080} = process.env;
let localUrlForTerminal = `http://${HOST}:${PORT}/`;
let lanUrlForTerminal = `http://${HOST}:${PORT}/`;
// If in local environment override
if (HOST === '0.0.0.0' || HOST === '::') {
    localUrlForTerminal = `http://localhost:${PORT}/`;
    lanUrlForTerminal = `http://${address.ip()}:${PORT}/`;
}
const server = https.createServer(httpsOptions, app).listen(PORT, () =>
    // eslint-disable-next-line no-console
    console.log(`
Access URLs:
--------------------------------------
Localhost: ${localUrlForTerminal}
      LAN: ${lanUrlForTerminal}
--------------------------------------
Press CTRL-C to stop`)
);
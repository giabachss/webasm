var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const session = require('express-session');  // session middleware
var app = express();
//1. khai báo thư viện mongoose để làm việc với DB
var mongoose = require('mongoose');
//2. khai báo đường dẫn của DB (URI)
// var local = "mongodb://localhost:27017/";
var cloud = "mongodb+srv://bibibi2001bop:1234@cluster0.fpakzeo.mongodb.net/gch1102";
//3. sử dụng mongoose để connect đến DB
mongoose.connect(cloud,{
    useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => { console.log ("Connect to DB succeed !")})
.catch((err) => { console.error (err)});
var bodyParser = require('body-parser');

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view options', { layout: false });
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 3001;
app.listen(port);
module.exports = app;

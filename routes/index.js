var express = require('express');
const MobileModel = require('../models/MobileModel');
const User = require('../models/UserModel'); // User Model
const connectEnsureLogin = require('connect-ensure-login');// authorization
const passport = require('passport');  // authentication
var router = express.Router();
const session = require('express-session');  // session middleware


// Configure Sessions Middleware
router.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

// Configure More Middleware
router.use(passport.initialize());
router.use(passport.session());
// Passport Local Strategy
passport.use(User.createStrategy());
// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', async (req, res) => {
  var mobiles = await MobileModel.find({});

  var total = await MobileModel.count();
  //console.log(mobiles);
  //res.send(mobiles);
  res.render('index', { mobiles : mobiles , total : total , layout: 'layout' })
})

router.get('/about', (req, res) => {
  res.render('about', {layout:'mylayout'});
})

router.get('/contact', (req, res) => {
  res.render('contact', {layout:'mylayout'});
})

router.get('/shop', async (req, res) => {
  var mobiles = await MobileModel.find({});
  res.render('shop', { mobiles: mobiles, layout:'mylayout' });
})

router.get('/list', async (req, res) => {
  var mobiles = await MobileModel.find({});
  res.render('list', { mobiles: mobiles, layout:'mylayout' });
})

router.get('/delete/:id', async(req, res) => {
  // var id = req.params.id;
  // var mobile = await MobileModel.findById(id);
  // await MobileModel.deleteOne(mobile);

  await MobileModel.findByIdAndDelete(req.params.id)
  .then(() => { console.log ('Delete mobile succeed !')})
  .catch((err) => { console.log ('Delete mobile failed !')});

  res.redirect('/');
})

router.get('/drop', async(req, res) => {
  await MobileModel.deleteMany({})
  .then(() => { console.log ('Delete all mobiles succeed !')});
  
  res.redirect('/');
})

// router.post('/order:id', async (req, res) => {
//   var mobile = await MobileModel.findById(req.params.id);
//   var mobile = await MobileModel.findById(id);
//   var order_quantity = req.body.order_quantity;
//   var price = req.body.price;
//   var total_price = price * order_quantity;
//   res.render('order_confirm', { mobile: mobile, layout:'mylayout'});
// })

router.get('/order:id', async (req, res) => {
  var mobile = await MobileModel.findById(req.params.id);
  res.render('order_confirm', { mobile : mobile,layout:'mylayout'});
})

// router.get('/add', (req, res) => {
//   // res.render('add',{layout:'mylayout'});
//         if (!isAdmin(req.user)) {
//         return res.redirect(403, '/error')
//     }

//     return res.render('add',{layout:'mylayout'})
// })

router.get('/add', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
   if (req.user.admin_access === 1) {
        return next();
    }
    return res.redirect(403, "/error");
});

// function isAdmin(req, res, next) {
//     if (req.connectEnsureLogin() && (req.user.admin_access === 1)) {
//         return next();
//     }
//     return res.redirect(403, "/error");
// }

router.get('/login', (req, res) => {
  res.render('login',{layout:'mylayout'});
})



router.get('/signup', (req, res) => {
  res.render('signup',{layout:'mylayout'});
})

router.post('/add', async (req, res) => {
  var mobile = req.body;
  await MobileModel.create(mobile)
  .then(() => { console.log ('Add new mobile succeed !')});
  res.redirect('/');
})


router.get('/edit/:id', async (req, res) => {
  var mobile = await MobileModel.findById(req.params.id);
  res.render('edit', { mobile : mobile,layout:'mylayout'});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await MobileModel.findByIdAndUpdate(id)
  .then(() => { console.log('Edit mobile succeed !') });
  res.redirect('/');
})

// router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//   res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
//    and your session expires in ${req.session.cookie.maxAge} 
//    milliseconds.<br><br>
//    <a href="/logout">Log Out</a><br><br>
//    <a href="/secret">Members Only</a>`);
// });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/log');
});

router.post('/log', passport.authenticate('local', { failureRedirect: '/about' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/');
});


module.exports = router;
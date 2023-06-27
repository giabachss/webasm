var express = require('express');
const DroneModel = require('../models/DroneModel');
const Drone2Model = require('../models/Drone2Model');
const User = require('../models/UserModel'); // User Model
const bodyParser = require('body-parser'); // parser middleware
const connectEnsureLogin = require('connect-ensure-login');// authorization
const passport = require('passport');  // authentication
var router = express.Router();

router.get('/', async (req, res) => {
  var mobiles = await DroneModel.find({});
  var total = await DroneModel.count();
  //console.log(mobiles);
  //res.send(mobiles);
  res.render('index', { mobiles : mobiles , total : total , layout: 'layout' })
})

//,connectEnsureLogin.ensureLoggedIn()
router.get('/about', (req, res) => {
  res.render('about', {layout:'mylayout'});
})

router.get('/contact', (req, res) => {
  res.render('contact', {layout:'mylayout'});
})

router.get('/shop', async (req, res) => {
  var mobiles = await DroneModel.find({});
  var mobiles2 = await Drone2Model.find({});
  res.render('shop', { mobiles: mobiles, mobiles2: mobiles2, layout:'mylayout' });
})

router.get('/list', async (req, res) => {
  var mobiles = await DroneModel.find({});
  res.render('list', { mobiles: mobiles, layout:'mylayout' });
})

router.get('/delete/:id', async(req, res) => {
  await DroneModel.findByIdAndDelete(req.params.id)
  .then(() => { console.log ('Delete Drone succeed !')})
  .catch((err) => { console.log ('Delete Drone failed !')});

  res.redirect('/');
})

router.get('/drop', async(req, res) => {
  await DroneModel.deleteMany({})
  .then(() => { console.log ('Delete all Drones succeed !')});
  
  res.redirect('/');
})

router.get('/order:id', async (req, res) => {
  var mobile = await DroneModel.findById(req.params.id);
  res.render('order_confirm', { mobile : mobile,layout:'mylayout'});
})

router.get('/add', (req, res) => {
    return res.render('add',{layout:'mylayout'})
})

router.get('/login', (req, res) => {
  res.render('login',{layout:'mylayout'});
})

router.get('/signup', (req, res) => {
  res.render('signup',{layout:'mylayout'});
})

router.post('/add', async (req, res) => {
  var type = req.body.type;
  var drone = req.body;
  if(type == 1){  await DroneModel.create(drone)
  .then(() => { console.log ('Add new mobile succeed !')});
  res.redirect('/')}
  else if (type == 2){
    await Drone2Model.create(drone)
  .then(() => { console.log ('Add new mobile succeed !')});
  res.redirect('/')
  }
})

router.get('/edit/:id', async (req, res) => {
  var mobile = await DroneModel.findById(req.params.id);
  res.render('edit', { mobile : mobile,layout:'mylayout'});
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var updatedData = req.body; // Assuming the updated data is available in the request body

    await DroneModel.findByIdAndUpdate(id, updatedData)
        .then(() => { console.log('Edit figure succeed !') });
    res.redirect('/');
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/log');
});

router.post('/log', passport.authenticate('local', { failureRedirect: '/about' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/add');
});

router.get('/drone1', async (req, res) => {
  var mobiles = await DroneModel.find({});
  res.render('shop', { mobiles: mobiles, layout:'mylayout' });
})
router.get('/drone2', async (req, res) => {
  var mobiles = await Drone2Model.find({});
  res.render('shop', { mobiles: mobiles, layout:'mylayout' });
})


module.exports = router;

// Configure Sessions Middleware
// Configure More Middleware
// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(passport.initialize());
// router.use(passport.session());
// // Passport Local Strategy
// passport.use(User.createStrategy());
// // To use with sessions
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//   res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
//    and your session expires in ${req.session.cookie.maxAge}    
//    milliseconds.<br><br>
//    <a href="/logout">Log Out</a><br><br>
//    <a href="/secret">Members Only</a>`);
// });

// router.post('/edit/:id', async (req, res) => {
//   var id = req.params.id;
//   await MobileModel.findByIdAndUpdate(id)
//   .then(() => { console.log('Edit mobile succeed !') });
//   res.redirect('/');
// })

// router.post('/add', async (req, res) => {
//   var mobile = req.body;
//   await MobileModel.create(mobile)
//   .then(() => { console.log ('Add new mobile succeed !')});
//   res.redirect('/');
// })

// router.get('/add', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
//    if (req.user.admin_access === 1) {
//         return next();
//     }
//     return res.redirect(403, "/error");
// });

// function isAdmin(req, res, next) {
//     if (req.connectEnsureLogin() && (req.user.admin_access === 1)) {
//         return next();
//     }
//     return res.redirect(403, "/error");
// }

// router.post('/order:id', async (req, res) => {
//   var Drone = await MobileModel.findById(req.params.id);
//   var mobile = await MobileModel.findById(id);
//   var order_quantity = req.body.order_quantity;
//   var price = req.body.price;
//   var total_price = price * order_quantity;
//   res.render('order_confirm', { mobile: mobile, layout:'mylayout'});
// })

  // var id = req.params.id;
  // var mobile = await MobileModel.findById(id);
  // await MobileModel.deleteOne(mobile);
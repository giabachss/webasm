var express = require('express');
const MobileModel = require('../models/MobileModel');
var router = express.Router();

router.get('/', async (req, res) => {
  var mobiles = await MobileModel.find({});

  var total = await MobileModel.count();
  //console.log(mobiles);
  //res.send(mobiles);
  res.render('index', { mobiles : mobiles , total : total })
})

router.get('/list', async (req, res) => {
  var mobiles = await MobileModel.find({});
  res.render('list', { mobiles: mobiles });
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

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var mobile = await MobileModel.findById(id);
  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
  var total_price = price * order_quantity;
  res.render('order_confirm', { mobile: mobile, order_quantity : order_quantity, total_price : total_price});
})

router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var mobile = req.body;
  await MobileModel.create(mobile)
  .then(() => { console.log ('Add new mobile succeed !')});
  res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
  var mobile = await MobileModel.findById(req.params.id);
  res.render('edit', { mobile : mobile});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await MobileModel.findByIdAndUpdate(id)
  .then(() => { console.log('Edit mobile succeed !') });
  res.redirect('/');
})

module.exports = router;
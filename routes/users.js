var express = require('express');
const MobileModel = require('../models/UserModel');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/adduser', async (req, res) => {
  var user = req.body;
  await MobileModel.create(user)
  .then(() => { console.log ('Add new user succeed !')});
  res.redirect('/');
})

module.exports = router;

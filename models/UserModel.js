var mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema(
   {
      name: String,
      username: String,
      password: String,
      admin_access: Number,
   }
)
// UserSchema.plugin(passportLocalMongoose);
var MobileModel = mongoose.model("user", UserSchema.plugin(passportLocalMongoose), "users");

module.exports = MobileModel;
var mongoose = require('mongoose')
var MobileSchema = mongoose.Schema(
   {
      name: String,
      brand: String,
      color: String,
      quantity: Number, 
      image: String,
      video: String,
      price: Number
   }
)
var MobileModel = mongoose.model("DIEN THOAI", MobileSchema, "mobile");
module.exports = MobileModel;
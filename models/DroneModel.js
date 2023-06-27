var mongoose = require('mongoose')
var DroneSchema = mongoose.Schema(
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
var DroneModel = mongoose.model("DIEN THOAI", DroneSchema, "mobile");
module.exports = DroneModel;
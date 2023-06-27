var mongoose = require('mongoose')
var Drone2Schema = mongoose.Schema(
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
var Drone2Model = mongoose.model("Drone", Drone2Schema, "drone2");
module.exports = Drone2Model;
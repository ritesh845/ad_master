const mongoose = require("mongoose");
var Schema = mongoose.Schema;  
var ObjectId = Schema.ObjectId;  

const appSchema = new mongoose.Schema({
  name: { type: String },
  modify_date_time: { type: String },
  active: { type: Boolean, default: "false" },
});

module.exports = mongoose.model("App", appSchema);
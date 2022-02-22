const mongoose = require("mongoose");

const advertisementsPlacesSchema = new mongoose.Schema({
//   _id : mongoose.Schema.Types.ObjectId,
 name: { type: String },
  maxAddCount: { type: Number }
//   modify_date_time: { type: String },
//   active: { type: Boolean, default: "false" },
});

module.exports = mongoose.model("places", advertisementsPlacesSchema);

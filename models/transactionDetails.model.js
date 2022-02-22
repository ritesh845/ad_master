const mongoose = require("mongoose");
const validator = require("validator");

const transactionDetailSchema = new mongoose.Schema({
  on_date: { type: String },
  ad: { type: String },
  username: { type: String},
  mobile: { type: Number},
  email: {
    type: String,
    required: true,
    lowercase:true,
    unique: [true, "Email already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  locality: {type:String},
  city: {type:String},
  state: {type:String}
});

module.exports = mongoose.model("Transaction_Detail", transactionDetailSchema);

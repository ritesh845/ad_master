const mongoose = require("mongoose");
const validator = require("validator");
// var uniqueValidator = require('mongoose-unique-validator');

const advertisements_PortalSchema  = new mongoose.Schema(
  {    
    app_id:{type:mongoose.Schema.Types.ObjectId,ref:'App'},
    place_id:{type:mongoose.Schema.Types.ObjectId,ref:'Ad_Place'},
    rank: {type: Number, required: true },
    brand_logo: { type: String, default: '' },
    brand_name: { type: String, required: true },
    campaign_title: { type: String, default:''},
    call_to_action: { type: String, default:''},
    poster: { type: String, default: []},
    poster: { type:String, required:`Poster field can't be empty`},
    poster_type: { type: String},             //, enum:["image", "video"], required: true }, 
    thumbnail: { type: String, default: ''},
    ad_click_url: { type: String, required:'URL can\'t be empty' },
    // ad_click_url: {type:String, validate(value){
    //   if(!validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true })){
    //     throw new Error("Must be a Valid URL")}}},
    images: {type:Array, default: []},
    videos: {type:Array, default: []},
    start_date_time: { type: Date },
    end_date_time: { type: Date, validate: [dateValidator, 'Start Date must be less than End Date'] },
    active: { type: Boolean, required: true, default: "false" },
    gross_price:{ type:Number},
    net_price:{ type:Number},
    tax:{type:String},
    payment_method:{type:String},
    is_partial_payment:{type:String},
    pending_amount:{type:Number},
    last_modify_date_time: { type: String },
    duration_in_second: { type: Number}
  }
);

// Validate function that validate the startDate and endDate
function dateValidator(value) {
  return this.start_date_time <= value;
}

// advertisements_PortalSchema.plugin(uniqueValidator, { message: 'Already Exist' });

module.exports = mongoose.model("Advertisement", advertisements_PortalSchema);

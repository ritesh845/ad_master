const { check, validationResult }= require('express-validator');
const App = require("../models/apps.model");
const Place = require("../models/advertisementsPlaces.model");

exports.advertisementValidation = [
    check("app_id")
    .not()
    .isEmpty()
    .withMessage("App Id is required!!")
    .custom(async (value) => {
       if(value !=null){
            const getApp = await App.findById({ _id: value});
            if (getApp === null) {
                throw new Error("App Id Doesn't Exist");
            }
       }
    }),
    check("place_id")
    .not()
    .isEmpty()
    .withMessage("place id is required!!")
    .custom(async (value) => {
        if(value !=null){
            const getPlace = await Place.findById({ _id: value });
             if (getPlace === null) {
                 throw new Error("Place Id Doesn't Exist");
             }
        }
     }), 
    check("poster_type")
    .not()
    .isEmpty()
    .withMessage("place id is required!!")
    .custom(async (value) => {
        if(value !=null){
            if(value != 'images' && value != 'videos'){
                throw new Error("You can select only image or video type");
            }
        }
    }), 
    (req, res, next) => {
        const errors = validationResult(req);
 
        // If some error occurs, then this
        // block of code will run
        if (!errors.isEmpty()) {
         
           return res.status(400).json({ success: false, error: "Validator Error", message: errors.array() });
        }
        next();
    },
];


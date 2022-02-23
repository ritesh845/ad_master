const { check, validationResult }= require('express-validator');
const App = require("../models/apps.model");
const Place = require("../models/advertisementsPlaces.model");
const advertisementService = require("../services/advertisements.service");

exports.advertisementValidation = [
    check("rank")
    .not()
    .isEmpty()
    .withMessage("Rank field is required!!"),
    check("app_id")
    .not()
    .isEmpty()
    .withMessage("App Id field is required!!")
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
    .withMessage("place id field is required!!")
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
    .withMessage("place id field is required!!")
    .custom(async (value) => {
        if(value !=null){
            if(value != 'images' && value != 'videos'){
                throw new Error("You can select only image or video type");
            }
        }
    }), 
   async (req, res, next) => {
        
        let query = { place_id: req.body.place_id, rank: req.body.rank, app_id: req.body.app_id };

		let queryResult = await advertisementService.getActiveAdvertisementsByQuery(query);
        
        if (queryResult.length > 0) {
            return res.status(400).json({ success: false, error: "Validator Error", message: [{
                "value": "",
                "msg": "Already exists",
                "param": "",
                "location": "body"
            }] });
        }

        const errors = validationResult(req);
 
        // If some error occurs, then this
        // block of code will run
        if (!errors.isEmpty()) {
         
           return res.status(400).json({ success: false, error: "Validator Error", message: errors.array() });
        }
        next();
    },
];


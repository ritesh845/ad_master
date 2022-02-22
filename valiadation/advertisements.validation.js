const App = require("../models/apps.model");
const Place = require("../models/advertisementsPlaces.model");

const advertisementService = require("../services/advertisements.service");


const advertisementValidation  = async (req,res,next) => {
   console.log("validation",req.body)
    let tmpErrObj = {};
    if (!req.body.place_id) {
        tmpErrObj.place_id = "place_id id is required";
    }

    if (!req.body.app_id) {
        tmpErrObj.app_id = "app_id id is required";
    }

    if (!req.body.rank) {
        tmpErrObj.rank = "rank is required";
    }

    if (tmpErrObj.place_id || tmpErrObj.rank || tmpErrObj.app_id) {
        res.status(500).json({ success: false, error: tmpErrObj });
    } else {
        const getApp = await App.findById({ _id: req.body.app_id });
        const getPlace = await Place.findById({ _id: req.body.place_id });
        if (getApp === null) {
            res.status(400).json({ success: false, error: "Validator Error", message: "App Id Doesn't Exist" });
        }
        if (getPlace === null) {
            res.status(400).json({ success: false, error: "Validator Error", message: "Place Id Doesn't Exist" });
        }

        let query = { place_id: req.body.place_id, rank: req.body.rank, app_id: req.body.app_id };
        let queryResult = await advertisementService.getActiveAdvertisementsByQuery(query);

        if (queryResult.length > 0) {
            res.status(200).json({ success: true, message: "Already exists" });
        }
    }
    // if (req.body.poster_type != 'image' ||  req.body.poster_type != 'video') {
    //     return res.status(500).json({ success: false, error: { poster: "invalid poster_type" }, message: "you can select only image or video type" }); 
    // }
   return  next();
}

module.exports = advertisementValidation;
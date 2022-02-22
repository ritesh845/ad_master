const router = require("express").Router();

const AdvertisementsController = require("../controllers/advertisements.controller");

const {advertisementValidation} = require('../valiadation/advertisement.validation');
const {uploadFiles} = require('../middleware/upload');
//Advertisements_Portal
  // router.post("/ads/createAdvertise",upload.fields([{
  //   name: 'images', maxCount: 10
  // }, {
  //   name: 'videos', maxCount: 10
  // }]) ,AdvertisementsController.createAdvertise);

router.post("/ads/createAdvertise",advertisementValidation,uploadFiles, AdvertisementsController.createAdvertise);
router.get("/ads", AdvertisementsController.showAdvertises);
router.get("/ads/:id", AdvertisementsController.getAdvertiseById);
router.put("/ads/updateby/:id", AdvertisementsController.updateAdvertiseById);
router.delete("/ads/deleteby/:id", AdvertisementsController.deleteAdvertiseById);

router.get("/search/ads?", AdvertisementsController.getAdvertiseByQuery);


// router.get("/ads/searchby/appid/placeid", AdvertisementsController.getAdvertiseByQuery);

module.exports = router;
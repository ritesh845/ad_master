const router = require("express").Router();

const placesController = require("../controllers/advertisementsPlaces.controller");

//places
router.post("/advertisements/places/create", placesController.create);
router.get("/advertisements/places", placesController.showPlaces);
// router.get("/ads/places", placeController.showPlaces);
// router.get("/ads/places/:id", placeController.getPlaceById);
// router.put("/ads/places/updateby/:id", placeController.updatePlaceById);
// router.delete("/ads/places/deleteby/:id", placeController.deletePlaceById);

module.exports = router;
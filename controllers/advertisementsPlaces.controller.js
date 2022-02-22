const mongoose = require('mongoose');
const Advertisements_Places = require("../models/advertisementsPlaces.model");

  //Create Advertisement Place
exports.create = async (req, res) => {
  try {
    const createplaces = new Advertisements_Places(req.body);
    console.log(createplaces);
    const newplace = await createplaces.save();
    res.status(200).json({ status: "success", message: "Created successfully", data: newplace });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

  //Fetch or Get Advertisement Place
exports.showPlaces = async (req, res) => {
  try {
    const getAdsPlaces = await Advertisements_Places.find({});
    res.json({ status: "success", data: getAdsPlaces });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
};

// exports.getPlaceById = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const getplace = await Ads_Place.findById({ _id: _id });
//     res.json({ status: "success", data: getplace });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Error occured", data: error });
//   }
// }

// exports.updatePlaceById = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const updateplace = await Ads_Place.findByIdAndUpdate(_id, req.body, {
//       new: true,
//     });
//     res.status(200).json({ status: "success", message: "Updated successfully" });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Error occured", data: error });
//   }
// }

// exports.deletePlaceById = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const deleteplace = await Ads_Place.findByIdAndDelete(_id);
//     res.status(200).json({ status: "success", message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Error occured", data: error });
//   }
// }

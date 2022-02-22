const mongoose = require('mongoose');
// const status = require('statuses');
const App = require("../models/apps.model");
const date = new Date();

  //Create Advertisement App
exports.create = async (req, res) => {
  try {
    const app = new App({
      name : (req.body.name),
      modify_date_time:   `${date.toDateString()}@${date.toTimeString()}`,
      active:(req.body.active)
    });
    const newApp = await app.save();
    res.status(200).json({ status: "success", message: "Created successfully", data: newApp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

//Fetch Or Get Advertisement Apps
exports.showApps = async (req, res) => {
  try {
    const getApps = await App.find().sort();
    res.json({ status: "success", data: getApps });
  } catch (error) {
    res.status(400).json({ status: "error", message: "Error occured", data: error });
  }
}

// Fetch Or Get Advertisement App By ID
exports.getAppById = async (req, res) => {
  try {
    const _id = req.params.id;
    const getApp = await App.findById({ _id: _id });
    res.json({ status: "success", data: getApp });
  } catch (error) {
    res.status(400).json({ status: "error", message: "Error occured", data: error });
  }
}

//// Fetch Or Get Advertisement App By Query
exports.getAppByQuery = async (req, res) => {
  try {
    const getApp = await App.find(req.query);
    res.json({ status: "success", data: getApp });
  } catch (error) {
    res.status(400).json({ status: "error", message: "Error occured", data: error });
  }
}

// Update Advertisement App By ID
exports.updateAppById = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateApp = await App.findByIdAndUpdate(_id, req.body, { new: true });
    console.log(updateApp);
    res.status(200).json({ status: "success", message: "Updated successfully", data:updateApp});
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

// Delete Advertisement App By ID
exports.deleteAppById = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteApp = await App.findByIdAndDelete(_id);
    res.status(200).json({ status: "success", message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

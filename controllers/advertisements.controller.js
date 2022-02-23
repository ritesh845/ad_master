const path = require("path");
const Advertisements = require("../models/advertisements.model");
const date = new Date();
const App = require("../models/apps.model");
const Place = require("../models/advertisementsPlaces.model");

const advertisementService = require("../services/advertisements.service");

exports.createAdvertise = async (req, res) => {
	try {
		let insertData = {
			app_id: req.body.app_id,
			place_id: req.body.place_id,
			rank: req.body.rank,
			brand_logo: req.body.brand_logo,
			brand_name: req.body.brand_name,
			campaign_title: req.body.campaign_title,
			call_to_action: req.body.call_to_action,
			poster_type: req.body.poster_type,
			thumbnail: req.body.thumbnail,
			ad_click_url: req.body.ad_click_url,
			start_date_time: req.body.start_date_time,
			end_date_time: req.body.end_date_time,
			active: req.body.active,
			gross_price: req.body.gross_price,
			net_price: req.body.net_price,
			tax: req.body.tax,
			payment_method: req.body.payment_method,
			is_partial_payment: req.body.is_partial_payment,
			pending_amount: req.body.pending_amount,
			last_modify_date_time: `${date.toDateString()}@${date.toTimeString()}`,
			duration_in_second: date.getSeconds(),
			poster : req.body.posterFile,
			images : req.body.imageFiles,
			videos : req.body.videoFiles,
		}
		const create_advertise = new Advertisements(insertData);
		const new_advertise = await create_advertise.save();
		return	res.status(200).json({ status: "success", message: "Created successfully", data: new_advertise });
	} catch (errorCreateAdvertise) {
		console.log(errorCreateAdvertise);
		return res.status(500).json({ success: false, message: "Server error", error: errorCreateAdvertise });
	}
};

exports.showAdvertises = async (req, res) => {
	try {
		const getAdvertises = await Advertisements.find({}).sort({ rank: 1 });
		res.status(200).json({ status: "success", data: getAdvertises });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error occured", data: error });
	}
};

exports.getAdvertiseById = async (req, res) => {
	try {
		const _id = req.params.id;
		const getAdvertise = await Advertisements.findById({ _id: _id });
		res.status(200).json({ status: "success", data: getAdvertise });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error occured", data: error });
	}
};

exports.getAdvertiseByQuery = async (req, res) => {
	try {
		const Advertises = await Advertisements.find(req.query);
		res.status(200).json({ status: "success", data: Advertises });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error occured", data: error });
	}
};

exports.updateAdvertiseById = async (req, res) => {
	try {
		const _id = req.params.id;
		const updateAdvertise = await Advertisements.findByIdAndUpdate(_id, req.body, { new: true });
		res.status(200).json({ status: "success", message: "Updated successfully" });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error occured", data: error });
	}
};

exports.deleteAdvertiseById = async (req, res) => {
	try {
		const _id = req.params.id;
		const deleteAdvertise = await Advertisements.findByIdAndDelete(_id);
		res.status(200).json({ status: "success", message: "Deleted successfully" });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error occured", data: error });
	}
};

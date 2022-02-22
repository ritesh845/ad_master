const path = require("path");
const Advertisements = require("../models/advertisements.model");
const date = new Date();
const App = require("../models/apps.model");
const Place = require("../models/advertisementsPlaces.model");

const advertisementService = require("../services/advertisements.service");

exports.createAdvertise = async (req, res) => {
	// console.log(req.body)
	return res.status(200).json({'data' : req.files})
	try {
		// console.log(req);
		// let tmpErrObj = {};

		// if (!req.body.place_id) {
		// 	tmpErrObj.place_id = "place_id id is required";
		// }

		// if (!req.body.app_id) {
		// 	tmpErrObj.app_id = "app_id id is required";
		// }

		// if (!req.body.rank) {
		// 	tmpErrObj.rank = "rank is required";
		// }

		// if (tmpErrObj.place_id || tmpErrObj.rank || tmpErrObj.app_id) {
		// 	res.status(500).json({ success: false, error: tmpErrObj });
		// } else {
		// 	const getApp = await App.findById({ _id: req.body.app_id });
		// 	const getPlace = await Place.findById({ _id: req.body.place_id });
		// 	if (getApp === null) {
		// 		res.status(400).json({ success: false, error: "Validator Error", message: "App Id Doesn't Exist" });
		// 	}
		// 	if (getPlace === null) {
		// 		res.status(400).json({ success: false, error: "Validator Error", message: "Place Id Doesn't Exist" });
		// 	}

		// 	let query = { place_id: req.body.place_id, rank: req.body.rank, app_id: req.body.app_id };
		// 	let queryResult = await advertisementService.getActiveAdvertisementsByQuery(query);

		// 	if (queryResult.length > 0) {
		// 		res.status(200).json({ success: true, message: "Already exists" });
			// } else {
				let insertData = {
					app_id: req.body.app_id,
					place_id: req.body.place_id,
					rank: req.body.rank,
					brand_logo: req.body.brand_logo,
					brand_name: req.body.brand_name,
					campaign_title: req.body.campaign_title,
					call_to_action: req.body.call_to_action,
					// poster: req.body.poster,
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
				}
				// let poster_type = req.body.poster_type;
				// if (poster_type === 'image') {
				// 	var _validImageExtensions = ["jpg", "jpeg", "gif", "png"];
				// 	if (
				// 		req.file &&
				// 		req.file.filename &&
				// 		(req.file.filename.split(".").pop() == "jpg" || req.file.filename.split(".").pop() == "jpeg" || req.file.filename.split(".").pop() == "gif" || req.file.filename.split(".").pop() == "png")) {
				// 		insertData.poster = req.file.filename;
				// 	} 
				// 	// else {
				// 	// 	return res.status(500).json({ success: false, error: { poster: "invalid poster_type" }, message: "you can select only image or video type" });
				// 	// }
				// } else if (poster_type === 'video') {
				// 	var _validVideoExtensions = ["mp4"];
				// 	if (
				// 		req.file &&
				// 		req.file.filename &&
				// 		(req.file.filename.split(".").pop() == "mp4")) {
				// 		insertData.poster = req.file.filename;
				// 	}
				// 	//  else {
				// 	// 	return res.status(500).json({ success: false, error: { poster: "invalid poster_type" }, message: "you can select only image or video type" });
				// 	// }
				// } 
				// else {
				// 	return res.status(500).json({ success: false, error: { poster: "invalid poster_type" }, message: "you can select only image or video type" });
				// }

				// if (req.files !== undefined) {
				// 	var images = [];
				// 	var videos = [];
				// 	if (req.files.images !== undefined) {
				// 		req.files.images.map(function (file) {
				// 			images.push({
				// 				imageTitle: file.originalname,
				// 				imageUrl: file.filename,
				// 			});
				// 		});
				// 	}
				// 	if (req.files.videos !== undefined) {
				// 		req.files.videos.map(function (file) {
				// 			videos.push({
				// 				videoTitle: file.originalname,
				// 				videoUrl: file.filename,
				// 			});
				// 		});
				// 	}
				// 	insertData.images = images;
				// 	insertData.videos = videos;
				// }
res.status(200).json({'data' : req.body})
				//const create_advertise = new Advertisements(insertData);
				//const new_advertise = await create_advertise.save();
				// res.status(200).json({ status: "success", message: "Created successfully", data: new_advertise });
			// }
		// }
	} catch (errorCreateAdvertise) {
		console.log(errorCreateAdvertise);
		res.status(500).json({ success: false, message: "Server error", error: errorCreateAdvertise });
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

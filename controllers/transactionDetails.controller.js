const Transaction_Details = require("../models/transactionDetails.model");

// Create Advertisement Transaction Detail
exports.create = async (req, res) => {
  try {
    const create_transaction_detail = new Transaction_Details(req.body);
    console.log(create_transaction_detail);
    const newtransaction = await create_transaction_detail.save();
    res.status(200).json({ status: "success", message: "Created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

// Fetch Or Get Advertisement Transaction Details
exports.showTransactionDetails = async (req, res) => {
  try {
    const get_transaction_details = await Transaction_Details.find(
      {}
    ).sort();
    res.status(200).json({ status: "success", data: get_transaction_details });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

// Fetch Or Get Advertisement Transaction Detail By ID
exports.getTransactionDetailById = async (req, res) => {
  try {
    const _id = req.params.id;
    const get_Transaction_Detail = await Transaction_Details.findById({
      _id: _id,
    });
    res.status(200).json({ status: "success", data: get_Transaction_Detail });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

// Update Advertisement Transaction Detail By ID
exports.updateTransactionById = async (req, res) => {
  try {
    const _id = req.params.id;
    const update_transaction_detail = await Transaction_Details.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );
    res.status(200).json({ status: "success", message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

// Delete Advertisement Transaction Detail By ID
exports.deleteTransactionById = async (req, res) => {
  try {
    const _id = req.params.id;
    const delete_transaction_detail =
      await Transaction_Details.findByIdAndDelete(_id);
      res.status(200).json({ status: "success", message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

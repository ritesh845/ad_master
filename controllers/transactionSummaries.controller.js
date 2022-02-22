const Transaction_Summary = require("../models/transactionSummaries.model");

// Create Advertisement Transaction Summary 
exports.create = async (req, res) => {
  try {
    const new_transaction_summary = new Transaction_Summary({
      //   _id: new mongoose.Types.ObjectId,
      count : (req.body.count),
      last_use: new Date(),
        ad: (req.body.ad)
      });
    const create_transaction_summ = new Transaction_Summary(new_transaction_summary);
    console.log(create_transaction_summ);
    const transaction_summ = await create_transaction_summ.save();
    res.status(200).json({ status: "success", message: "Created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

// Fetch Or Get Advertisement Transaction Summaries 
exports.showTransactionSummaries = async (req, res) => {
  try {
    const get_transaction_summs = await Transaction_Summary.find(
      {}
    ).sort();
    res.status(200).json({ status: "success", data: get_transaction_summs });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

// Fetch Or Get Advertisement Transaction Summary By ID
//   exports.getTransactionSummaryById = async (req, res) => {
//     try {
//       const _id = req.params.id;
//       const get_Transaction_Summ = await Transaction_Summary.findById({ _id: _id });
//       res.status(200).json({ status: "success", data: get_Transaction_Summ });
//     } catch (error) {
//       res.status(500).json({ status: "error", message: "Error occured", data: error });
//     }
//   }

// Update Advertisement Transaction Summary By ID 
exports.updateTransactionSummaryById = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateupdate_transaction_summ = await Transaction_Summary.findByIdAndUpdate(
      _id,
      req.body,
      { new: true }
    );
    res.status(200).json({ status: "success", message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

// Delete Advertisement Transaction Summary By ID 
exports.deleteTransactionSummaryById = async (req, res) => {
  try {
    const _id = req.params.id;
    const delete_Summ = await Transaction_Summary.findByIdAndDelete(_id);
    res.status(200).json({ status: "success", message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error occured", data: error });
  }
}

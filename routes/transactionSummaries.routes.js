const router = require("express").Router();

const Transaction_Summ_Controller = require("../controllers/transactionSummaries.controller");


//Transaction_Summarries
router.post("/transaction/summary/create", Transaction_Summ_Controller.create);
router.get("/transaction/summaries", Transaction_Summ_Controller.showTransactionSummaries);
// router.get("/transaction/summary/detaill/:id", Transaction_Summ_Controller.getTransactionSummaryById);
router.put("/transaction/summary/updateby/:id", Transaction_Summ_Controller.updateTransactionSummaryById);
router.delete("/transaction/summary/deleteby/:id", Transaction_Summ_Controller.deleteTransactionSummaryById);

module.exports = router;
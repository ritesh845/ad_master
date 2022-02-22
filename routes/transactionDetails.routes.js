const router = require("express").Router();

const Transaction_Detail_Controller = require("../controllers/transactionDetails.controller");


//Transaction_Details
router.post("/transaction/create", Transaction_Detail_Controller.create);
router.get("/transaction/details", Transaction_Detail_Controller.showTransactionDetails);
router.get("/transaction/detail/:id", Transaction_Detail_Controller.getTransactionDetailById);
router.put("/transaction/updateby/:id", Transaction_Detail_Controller.updateTransactionById);
router.delete("/transaction/deleteby/:id", Transaction_Detail_Controller.deleteTransactionById);

module.exports = router;
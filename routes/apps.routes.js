const router = require("express").Router();

const AppController = require("../controllers/apps.controller");

//Apps
router.post("/ads/apps/create", AppController.create);
router.get("/ads/apps", AppController.showApps);
router.get("/ads/apps/:id", AppController.getAppById);
router.put("/ads/apps/updateby/:id", AppController.updateAppById);
router.delete("/ads/apps/deleteby/:id", AppController.deleteAppById);
router.get("/ads/search/apps?", AppController.getAppByQuery);

module.exports = router;
const express = require("express");
var cors = require('cors')
var bodyParser = require("body-parser");
require('dotenv').config()
require("./db/conn");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 5000;
const app = express();


app.use(cors());

const AdvertisementsRoutes = require("./routes/advertisements.routes"); //Advertisement_Portal_Routes
const appRoutes = require("./routes/apps.routes"); //App_Routes
const advertisementsPlaceRoutes = require("./routes/advertisementsPlaces.routes"); //Place_Routes
const transactionDetailsRoutes = require("./routes/transactionDetails.routes"); //Transaction_Detail_Routes
const transactionSummariesRoutes = require("./routes/transactionSummaries.routes"); //Transaction_Summary_Routes

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 

// app.use((req,res,next) => {
// 	res.header("Access-Control-Allow-Origin","*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Authorization,Accept",
// 	);
// 	// if(req.method  === 'OPTIONS'){
// 	// 	res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE');
// 	// 	return res.status(200).json({});
// 	// }
// 	next();
// });


app.use("/api", appRoutes);
app.use("/api", advertisementsPlaceRoutes);
app.use("/api", transactionDetailsRoutes);
app.use("/api", transactionSummariesRoutes);
app.use("/api", AdvertisementsRoutes);



app.listen(port, () => {
  console.log(`Backend Is Running At Port No. ${port}`);
});
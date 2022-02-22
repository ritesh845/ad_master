const { check, validationResult } = require("express-validator");
const generalResponse = require("../../helper/general_response.helper");
const errorFilterValidator = require("../../helper/error_filter_validator.helper");

exports.deliveryValidation = [
  check("pickup_location")
    .not()
    .isEmpty()
    .withMessage("Pick-up location is required!!"),
  check("destination_location")
    .not()
    .isEmpty()
    .withMessage("Destination location is required!!"),
  check("destination_type")
    .not()
    .isEmpty()
    .withMessage("Destination type is required!!"),
  check("expected_delivery_time")
    .not()
    .isEmpty()
    .withMessage("Pick-up time is required!!"),
  check("item").not().isEmpty().withMessage("One item is necessary!!"),
  check("pickup_latitude")
    .not()
    .isEmpty()
    .withMessage("Pick-up latitude is required!!")
    .custom(async (value) => {
      if (value === "undefined") {
        throw new Error("Please select the Pickup location");
      }
    }),
  check("pickup_longitude")
    .not()
    .isEmpty()
    .withMessage("Pick-up longitude is required!!"),

  check("destination_latitude")
    .not()
    .isEmpty()
    .withMessage("Destination latitude is required!!")
    .custom(async (value) => {
      if (value === "undefined") {
        throw new Error("Please select the Destination location");
      }
    }),
  check("destination_longitude")
    .not()
    .isEmpty()
    .withMessage("Destination longitude is required!!"),

  check("user_id").not().isEmpty().withMessage("Customer is required!!"),
  (req, res, next) => {
    const errors = validationResult(req);
    let itemError = false;
    if (req.body.item) {
      const item = JSON.parse(req.body.item);
      if (item.length > 0) {
        itemError = !item.every(
          (singleItem) => singleItem.id && singleItem.item_quantity
        );
      } else {
        itemError = true;
      }
    }

    if (!errors.isEmpty()) {
      const message = errorFilterValidator(errors);
      return generalResponse(res, [], message, "error", true, 200);
    } else if (itemError) {
      return generalResponse(
        res,
        [],
        "Item data is required!!",
        "error",
        true,
        200
      );
    }
    next();
  },
];

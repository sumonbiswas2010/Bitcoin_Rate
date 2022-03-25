const router = require("express").Router();
const { getRate } = require("./user.controller");

router.get("/getBitcoinInfo/currency=:c",getRate)

module.exports = router;
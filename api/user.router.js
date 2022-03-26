const router = require("express").Router();
const { getRate } = require("./user.controller");

router.get("/getBitcoinInfo/currency=:cur",getRate)

module.exports = router;
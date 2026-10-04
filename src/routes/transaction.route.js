const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const { authMiddlware } = require("../middlewares/auth.middleware");




const router = express.Router();


/**
 * POST /api/transactions/
 * create a new transaction
 */
router.post("/", authMiddlware, transactionController.createTransaction); 



module.exports = router;
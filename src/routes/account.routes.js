const express = require("express");
const { authMiddlware } = require("../middlewares/auth.middleware");
const { createAccount } = require("../controllers/account.controller");

const router = express.Router();

/**
 * - POST /api/account/
 * - Create a new account
 * - Protected route
 */
router.post("/", authMiddlware, createAccount);

module.exports = router;

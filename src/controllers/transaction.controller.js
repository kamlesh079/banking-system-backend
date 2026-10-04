const transcationModel = require("../models/transaction.model");
const accountModel = require("../models/account.model");
const ledgerModel = require("../models/ledger.model");
const emailService = require("../services/email.service");

/**
 *  - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
 * 1. Validate request
 * 2. Validate idempotency key
 * 3. Check account status
 * 4. Derive sender balance from ledger
 * 5. Create transaction (PENDING)
 * 6. Create DEBIT ledger entry
 * 7. Create CREDIT ledger entry
 * 8. Mark transaction COMPLETED
 * 9. Commit MongoDB session
 * 10. Send email notification
 */
async function createTransaction(req, res) {
  /**
   * Step 1: Validate request
   */
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const fromUserAccount = await accountModel.findOne({
    _id: fromAccount,
  });

  const toUserAccount = await accountModel.findOne({
    _id: toAccount,
  });

  if (!fromAccount || !toUserAccount) {
    return res.status(400).json({ message: "Invalid account details" });
  }

  /**
   * Step 2: Validate idempotency key
   */
  const isTransactionExists = await transcationModel.findOne({
    idempotencyKey,
  });

  if (isTransactionExists) {
    if (isTransactionExists.status === "COMPLETED") {
      return res.status(200).json({ message: "Transaction already completed" });
    }
    if (isTransactionExists.status === "PENDING") {
      return res.status(200).json({ message: "Transaction is still pending" });
    }
    if (isTransactionExists.status === "FAILED") {
      return res.status(500).json({ message: "Transaction has failed" });
    }
    if (isTransactionExists.status === "CANCELLED") {
      return res
        .status(500)
        .json({ message: "Transaction has been cancelled" });
    }
  }

  /**
   * Step 3: Check account status
   */
  if (
    fromUserAccount.status !== "active" ||
    toUserAccount.status !== "active"
  ) {
    return res.status(400).json({ message: " Both accounts must be active" });
  }

  /**
   * Step 4: Derive sender balance from ledger
   */

  
}

module.exports = { createTransaction };

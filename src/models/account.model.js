const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Account must associated with a user"],
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "frojezen", "closed"],
      message: "Status can only be active, frojezen or closed",
      default: "active",
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      default: "INR",
    },
  },
  {
    timestamps: true,
  },
);

// Create a compound index on the user and status fields to optimize queries that filter by both fields
accountSchema.index({ user: 1, status: 1 });

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;

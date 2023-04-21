const { model, Schema } = require("mongoose");

const otp = new Schema({
  otp: {
    type: Number,
    required: true,
  },
  otpId: {
    type: String,
    required: true,
  },
});

module.exports = model("otp", otp);

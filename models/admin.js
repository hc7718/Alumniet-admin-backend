const { model, Schema } = require("mongoose");

const admin = new Schema({
  email: {
    type: String,
    required: true,
  },
});

module.exports = model("admin", admin);

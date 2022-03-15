const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
});
module.exports = mongoose.model("shortUrl", urlSchema);

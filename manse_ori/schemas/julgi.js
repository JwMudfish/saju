const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    gubun: Number,
    ganji: String,
    tm_solar: String,
  },
  { collection: "julgi" }
);
module.exports = mongoose.model("Julgi", userSchema);

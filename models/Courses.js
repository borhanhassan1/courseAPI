const mongoose = require("mongoose");

const schema = mongoose.Schema;
const courseSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("courses", courseSchema);

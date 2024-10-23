const mongoose = require("mongoose");
const constr = "mongodb+srv://admin:admin@cluster0.indt3.mongodb.net/Course";
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const con = await mongoose.connect(constr);
    console.log("DATABSE CONNECTED!");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;

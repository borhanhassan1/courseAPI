const express = require("express");

const connectDB = require("./databaseConnection.js");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/", require("../files/routers/courseRouter"));
app.use("/api/users", require("../files/routers/userRouter.js"));
app.get("/api/aa", (req, res) => {
  res.json({ status: "5555555555555555" });
});
app.listen(PORT, () => {
  console.log("listening on port 5000");
});

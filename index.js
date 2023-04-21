require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
// const allRoutes = require("./routes/route");
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(adminRoutes);
// app.use(allRoutes);
async function main() {
  try {
    mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("Database connected sucessfully");
    });
  } catch (error) {
    console.log(error);
  }
}
main();
// sendEmail();
app.get("/", (req, res) => {
  res.send({ message: "HI" });
});
app.listen(port, () => console.log(`Server listening on port ${port}`));

const mongoose = require("mongoose");
const env = require("dotenv").config();

const mongoConnect = () => {
  const username = encodeURIComponent(process.env.DB_USERNAME);
  const password = encodeURIComponent(process.env.DB_PASSWORD);
  const uri = `  mongodb+srv://${username}:${password}@cluster0.wsj5t3d.mongodb.net/`;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected…");
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;

const mongoose = require("mongoose");
const env = require("dotenv").config();

const mongoConnect = () => {
  const username = encodeURIComponent(process.env.DB_USERNAME);
  const password = encodeURIComponent(process.env.DB_PASSWORD);
  const uri = `mongodb+srv://${username}:${password}@homeease.shjjfqm.mongodb.net/`;

  mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB Connected…");
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;

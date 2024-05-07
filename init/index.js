// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/HomeEase";

// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});
//   initData.data = initData.data.map((obj) => ({
//     ...obj,
//     owner: "6639ce29bf62614d59c6e201",
//   }));
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };

// initDB();

const mongoose = require("mongoose");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/HomeEase";

const listingSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    await initDB();
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}

async function initDB() {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "6639ce29bf62614d59c6e201",
      image: obj.image.url,
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

main();

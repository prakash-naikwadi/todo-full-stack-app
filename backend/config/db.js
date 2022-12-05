const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(`Connected To DB ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectToDB;

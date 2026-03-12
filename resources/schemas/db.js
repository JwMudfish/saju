const mongoose = require("mongoose");
module.exports = () => {
  function connect() {
    var dbUser = "manseAPI";
    var dbPwd = "frlHQ5IbUT8474cA";
    var dbName = "manseAPIDB";
    var mongodbUri =
      "mongodb+srv://" +
      dbUser +
      ":" +
      dbPwd +
      "@cluster0.2agiq.mongodb.net/" +
      dbName +
      "?retryWrites=true&w=majority";
    mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  connect();
  console.log(
    "MongoDB접속성공"
  );
  mongoose.connection.on("disconnected", connect);
};

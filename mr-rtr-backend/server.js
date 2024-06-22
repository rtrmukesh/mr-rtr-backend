const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const db = require("./db/index");



const app = express();
const port = process.env.PORT || 3002;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ limit: "50mb" }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(upload.none());



db.authenticate()
  .then(() => {
    app.use("/v1/user", userRoute);

    app.listen(port, () => {
      console.log(`API Service listening on port ${port}`);
    });
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


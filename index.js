const express = require("express");
const multer = require("multer");
const cors = require("cors");
// const userRoute = require("./routes/user");
// const db = require("./db/index");
// const mediaRoute = require("./routes/media");
const pushNotification = require("./routes/pushNotification");
const faceRekognition = require("./routes/faceRekognition");



const app = express();
const port = process.env.PORT || 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

app.use(express.json({ limit: "50mb" })); 

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(upload.single('file'));


{/* ✴---with have Database access---✴ */}
// db.authenticate()
//   .then(() => {
//     app.use("/v1/user", userRoute);
//     app.use("/v1/media", mediaRoute);

//     app.listen(port, () => {
//       console.log(`API Service listening on port ${port}`);
//     });
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

{/* ✴---Without database access---✴ */}
app.use("/v1/pushNotification", pushNotification);
app.use("/v1/faceRekognition", faceRekognition);

app.listen(port, () => {
  console.log(`API Service listening on port ${port}`);
});


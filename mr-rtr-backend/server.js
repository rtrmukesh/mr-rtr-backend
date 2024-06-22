const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");


const app = express();
const port = 3002;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ limit: "50mb" }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(upload.none());

app.use("/v1/user",userRoute)


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const User = require("./db/model/User");
const { md5Password } = require("./lib/utils");

const app = express();
const port = 3002;

app.use(cors());

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/v1/user/signup", upload.any(), async (req, res) => {
  let data = req.body;

  let createData = {
    name: data?.name,
    email: data?.email,
    password: md5Password(data?.newPassword),
  };

  await User.create(createData)
    .then((response) => {
      res.json(200, { message: "User Created Successfully" });
    })
    .catch((err) => {
      console.err(err);
      res.json(400, { message: `User Creation err-->${err}` });
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

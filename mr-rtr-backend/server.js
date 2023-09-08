const express = require("express");
const multer = require("multer");
const cors = require("cors");
const User = require("./db/model/User");
const { md5Password } = require("./lib/utils");
const md5 = require("md5");


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
      console.log(err);
      res.json(400, { message: `User Creation err-->${err}` });
    });
});

app.post('/v1/user/loginByPassword', upload.any(), async (req, res) => {
  let data = req.body;

  if (!data?.email) {
    return res.json(400, { message: 'Email is required' });
  }

  if (!data?.password) {
    return res.json(400, { message: 'Password is required' });
  }

  User.findOne({ where: { email: data?.email } })
    .then((userResponse) => {
      if (!userResponse) {
        return res.json(400, { message: 'Invalid Username or Password' });
      }

      if (userResponse.password !== md5(data?.password)) {
        return res.json(400, { message: 'Invalid credentials' });
      }

      const session_id = userResponse.session_id || Math.floor(Date.now());

      userResponse
        .update({
          session_id: session_id,
        })
        .then(() => {
          res.json({
            message: 'User LoggedIn SuccessFully',
            user: {
              token: session_id,
            },
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

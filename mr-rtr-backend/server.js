const express = require('express');
const multer = require('multer');
const cors = require('cors');
const  User  = require("./db/model/User")

const app = express();
const port = 3002;

app.use(cors());

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/v1/user/signup", upload.any(), async (req, res) => {
  try {

    let data =  req.body;

    let createData ={
      name:data?.name,
      email:data?.email,
      password:data?.newPassword
    }

    await User.create(createData)

    res.json(200,{ message: 'User Created Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

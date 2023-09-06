const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/v1/user/signup", upload.any(), (req, res) => {
  try {
    console.log('Data from form:', req.body);

    res.json(200,{ message: 'Form data received successfully' });
  } catch (error) {
    console.error('Error handling form data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

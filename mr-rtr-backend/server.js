const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({
    user: ["server"],
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});

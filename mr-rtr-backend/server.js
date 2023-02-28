const express = require("express");
const app = express();

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
];

app.get("/api", (req, res) => {
  res.send({data:users});
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

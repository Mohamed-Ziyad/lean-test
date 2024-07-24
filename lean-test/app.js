const express = require("express");
const app = express();
const http = require("http");

app.get("/", (req, res) => {
  res.send("Node.js Google Speech-to-Text server is running");
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

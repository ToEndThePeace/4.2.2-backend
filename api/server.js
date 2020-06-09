const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/cars", require("../cars/carsRouter"));

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server running!" });
});

module.exports = server;

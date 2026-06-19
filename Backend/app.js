const express = require("express");
const cors = require("cors");

const alertRoutes = require("./route");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", alertRoutes);

module.exports = app;
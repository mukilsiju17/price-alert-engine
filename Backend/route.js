const express = require("express");

const {getAlerts,createAlert,getLogs,deleteAlert} = require("./controller");

const router = express.Router();

router.get("/alerts", getAlerts);

router.post("/alerts", createAlert);

router.get("/logs", getLogs);

router.delete("/alerts/:id", deleteAlert);

module.exports = router;
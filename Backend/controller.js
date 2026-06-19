const store = require("./store");

const getAlerts = (req, res) => {
  res.status(200).json(store.alerts);
};

const createAlert = (req, res) => {
  const { asset, condition, threshold } = req.body;

  const alert = {
    id: Date.now(),
    asset,
    condition,
    threshold,
    triggered: false
  };

  store.alerts.push(alert);

  res.status(201).json({
    message: "Alert Created",
    alert
  });
};

const getLogs = (req, res) => {
  res.status(200).json(store.logs);
};

const deleteAlert = (req, res) => {

    const id = Number(req.params.id);

    store.alerts = store.alerts.filter(
        alert => alert.id !== id
    );

    res.json({
        message: "Alert Deleted"
    });

};


module.exports = {
  getAlerts,
  createAlert,
  getLogs,
  deleteAlert
};
const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const store = require("./store");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("Client Connected");

  socket.emit(
    "priceUpdate",
    store.currentPrice
  );

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

setInterval(() => {

  const randomChange =
    Math.floor(Math.random() * 200) - 100;

  store.currentPrice += randomChange;

  io.emit(
    "priceUpdate",
    store.currentPrice
  );

  store.alerts.forEach((alert) => {

    if (alert.triggered) return;

    const isAbove =
      alert.condition === "ABOVE" &&
      store.currentPrice >= alert.threshold;

    const isBelow =
      alert.condition === "BELOW" &&
      store.currentPrice <= alert.threshold;

    if (isAbove || isBelow) {

      alert.triggered = true;

      const log = {
        id: Date.now(),
        asset: alert.asset,
        threshold: alert.threshold,
        currentPrice: store.currentPrice,
        timestamp: new Date()
      };

      store.logs.push(log);

      io.emit(
        "alertTriggered",
        log
      );

      console.log(
        "Alert Triggered",
        log
      );
    }

  });

}, 1000);

server.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});
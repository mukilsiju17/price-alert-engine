import { useEffect, useState } from "react";
import axios from "axios";
import socket from "./socket";

import PriceCard from "../Components/PriceCard";
import AlertForm from "../Components/AlertForm";
import AlertList from "../Components/AlertList";
import LogList from "../Components/LogList";

function App() {
  const [price, setPrice] = useState(50000);

  const [asset, setAsset] = useState("BTC");
  const [condition, setCondition] = useState("ABOVE");
  const [threshold, setThreshold] = useState("");

  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAlerts();
    getLogs();

    socket.on("priceUpdate", (price) => {
      setPrice(price);
    });

    socket.on("alertTriggered", (data) => {
      alert(`${data.asset} crossed ${data.threshold}`);

      setLogs((prev) => [data, ...prev]);

      getAlerts();
    });

    return () => {
      socket.off("priceUpdate");
      socket.off("alertTriggered");
    };
  }, []);

  const getAlerts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/alerts"
      );

      setAlerts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/logs"
      );

      setLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createAlert = async () => {
    try {
      if (!threshold) {
        alert("Enter Threshold");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/alerts",
        {
          asset,
          condition,
          threshold: Number(threshold),
        }
      );

      setThreshold("");

      getAlerts();

      alert("Alert Created");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAlert = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this alert?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/alerts/${id}`
      );

      getAlerts();

      alert("Alert Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "20px auto",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <h1>Real-Time Price Alert Engine</h1>

      <hr />

      <PriceCard price={price} />

      <AlertForm
        asset={asset}
        setAsset={setAsset}
        condition={condition}
        setCondition={setCondition}
        threshold={threshold}
        setThreshold={setThreshold}
        createAlert={createAlert}
      />

      <AlertList
        alerts={alerts}
        deleteAlert={deleteAlert}
      />

      <LogList logs={logs} />
    </div>
  );
}

export default App;
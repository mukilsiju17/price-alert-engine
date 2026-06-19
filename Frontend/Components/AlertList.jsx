function AlertList({
  alerts,
  deleteAlert
}) {
  return (
    <>
      <h2>Active Alerts</h2>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>Asset</th>
            <th>Condition</th>
            <th>Threshold</th>
            <th>Triggered</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {alerts.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                align="center"
              >
                No Alerts
              </td>
            </tr>
          ) : (
            alerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.asset}</td>

                <td>{alert.condition}</td>

                <td>{alert.threshold}</td>

                <td>
                  {alert.triggered
                    ? "Yes"
                    : "No"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteAlert(alert.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <hr />
    </>
  );
}

export default AlertList;
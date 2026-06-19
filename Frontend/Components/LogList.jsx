function LogList({ logs }) {
  return (
    <>
      <h2>Triggered Logs</h2>

      <table
        border="1"
        cellPadding="10"
        width="100%"
      >
        <thead>
          <tr>
            <th>Asset</th>
            <th>Threshold</th>
            <th>Current Price</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                align="center"
              >
                No Logs
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id}>
                <td>{log.asset}</td>

                <td>{log.threshold}</td>

                <td>{log.currentPrice}</td>

                <td>
                  {new Date(
                    log.timestamp
                  ).toLocaleTimeString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default LogList;
function AlertForm({
  asset,
  setAsset,
  condition,
  setCondition,
  threshold,
  setThreshold,
  createAlert
}) {
  return (
    <>
      <h2>Create Alert</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}
      >
        <input
          type="text"
          value={asset}
          onChange={(e) =>
            setAsset(e.target.value)
          }
          placeholder="Asset"
        />

        <select
          value={condition}
          onChange={(e) =>
            setCondition(e.target.value)
          }
        >
          <option value="ABOVE">
            ABOVE
          </option>

          <option value="BELOW">
            BELOW
          </option>
        </select>

        <input
          type="number"
          value={threshold}
          onChange={(e) =>
            setThreshold(e.target.value)
          }
          placeholder="Threshold"
        />

        <button onClick={createAlert}>
          Create Alert
        </button>
      </div>

      <hr />
    </>
  );
}

export default AlertForm;
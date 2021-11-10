const Dashboards = ({ boards }) => {
  return (
    <>
      <div className="dashboard-status">
        {boards.map((i) => {
          const boardName = i.b_name;
          const dateTime = i.uDate;
          const now = new Date();
          const tmpDT = new Date(dateTime);
          return (
            <div
              className={`box ${
                tmpDT.getFullYear() !== now.getFullYear() ||
                tmpDT.getDate() !== now.getDate() ||
                tmpDT.getDay() !== now.getDay() ||
                tmpDT.getHours() !== now.getHours() ||
                tmpDT.getMinutes() !== now.getMinutes()
                  ? "B_offline"
                  : "B_online"
              }`}
            >
              <div className="title">
                <p>BOARD NAME: {boardName.toUpperCase()}</p>
              </div>
              <div>
                <p>
                  STATUS:{" "}
                  {tmpDT.getFullYear() !== now.getFullYear() ||
                  tmpDT.getDate() !== now.getDate() ||
                  tmpDT.getDay() !== now.getDay() ||
                  tmpDT.getHours() !== now.getHours() ||
                  tmpDT.getMinutes() !== now.getMinutes() ? (
                    <span className="offline">OFFLINE</span>
                  ) : (
                    <span className="online">ONLINE</span>
                  )}
                </p>

                <p>
                  PH: {i.ph} EC:{i.ec}
                </p>
                {i.valve === 1 && i.flow <= 0 && (
                  <div className="alert">
                    <span>PUMP ALERT</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboards;

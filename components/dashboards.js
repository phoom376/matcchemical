import { useTable } from "react-table";
import * as React from "react";
import classnames from "classnames";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import DataExport from "./DataExport";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
const Dashboards = ({
  boards,
  setBoardId,
  boardId,
  boardData,
  getBoardData,
  getDataByType,
  data,
  setData,
}) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [day, setDat] = useState("");
  console.log(boardData);

  const handleMonthYear = (e) => {
    const tmpMY = e.target.value;
    const tmpSplit = tmpMY.split("-");
    const Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    setMonth(Months[tmpSplit[1] - 1]);
    console.log(tmpSplit);
  };
  const handleDay = (e) => {
    console.log(e.target.value);
  };
  console.log(month);
  return (
    <>
      <div className="dashboard-status">
        <div className="table-box">
          <table className="Table">
            <thead>
              <tr>
                <th className="thead">NO.</th>
                <th className="thead">NAME</th>
                <th className="thead">STATUS</th>
                <th className="thead">PH</th>
                <th className="thead">EC</th>
                <th className="thead">SCL</th>
                <th className="thead">VALVE</th>
                <th className="thead">BCL</th>
                <th className="thead">PUMP ALERT</th>
              </tr>
            </thead>
            <tbody>
              {boards.map((i, k) => {
                const dateTime = i.uDate;
                const now = Date(Date.now);
                const tmpDT = dateTime.split(" ");
                const tmpNow = now.split(" ");
                const nTime = tmpNow[4].toString();
                const nDay = tmpNow[2].toString();
                const nYear = tmpNow[3].toString();
                const nTmpTime = nTime.split(":");
                const nHour = nTmpTime[0];
                const nMin = nTmpTime[1];
                const nSec = nTmpTime[2];
                const time = tmpDT[4].toString();
                const day = tmpDT[2].toString();
                const year = tmpDT[3].toString();
                const tmpTime = time.split(":");
                const Hour = tmpTime[0];
                const Min = tmpTime[1];
                const Sec = tmpTime[2];
                const Months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                let tmpMonth = 0;
                let nTmpMonth = 0;
                for (let i = 0; i < Months.length; i++) {
                  if (tmpDT[1] == Months[i]) {
                    tmpMonth = i + 1;
                  }
                  if (tmpNow[1] == Months[i]) {
                    nTmpMonth = i + 1;
                  }
                }
                const month = tmpMonth;
                const nMonth = nTmpMonth;
                const Disable =
                  nYear !== year ||
                  nMonth !== month ||
                  nDay !== day ||
                  nHour !== Hour ||
                  nMin !== Min;

                return (
                  <tr
                    className={classnames("", {
                      P_Alert:
                        (i.valve === 1 && Number(i.flow) === 0) ||
                        (i.valve === 0 && Number(i.flow) > 0),
                    })}
                    onClick={() => getBoardData(i.b_id)}
                  >
                    <td>{k + 1}</td>
                    <td>{i.b_name}</td>
                    <td>
                      {Disable ? (
                        <span className="offline">OFFLINE</span>
                      ) : (
                        <span className="online">ONLINE</span>
                      )}
                    </td>
                    <td>{i.ph}</td>
                    <td>{i.ec}</td>
                    <td>
                      {i.scc === 0 ? (
                        <span className="offline">OFF</span>
                      ) : (
                        <span className="online">ON</span>
                      )}
                    </td>
                    <td>
                      {i.valve === 0 ? (
                        <span className="offline">OFF</span>
                      ) : (
                        <span className="online">ON</span>
                      )}
                    </td>
                    <td>
                      {i.bcl === 0 ? (
                        <span className="offline">OFF</span>
                      ) : (
                        <span className="online">ON</span>
                      )}
                    </td>
                    <td>
                      {(i.valve === 1 && Number(i.flow) === 0) ||
                      (i.valve === 0 && Number(i.flow) > 0) ? (
                        <span className="offline">DANGER</span>
                      ) : (
                        <span className="online">SAVE</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="box-ec-chart">
        {boardId !== "" ? (
          boardData.message ? (
            <h1>{boardData.message}</h1>
          ) : boardData.length !== 0 ? (
            <div
              className="dashboard-ec-chart"
              // style={{
              //   height: 500,
              //   boxShadow: "0px 0px 8px 4px rgba(0, 0, 0, 0.1)",
              //   border: "1px solid white",
              //   borderRadius: "10px",
              //   width: "100%",
              //   display: "flex",
              //   overflow: "auto",
              //   justifyContent: "center",

              //   // width: "70%",
              // }}
            >
              <div className="chart">
                <MyResponsiveLine
                  boardData={boardData}
                  boardId={boardId}
                  // getBoardData={getBoardData()}
                />
              </div>
            </div>
          ) : (
            <h1 className="center">
              <img src="./loading.gif" />
            </h1>
          )
        ) : (
          <h1>PLEASE SELECT BOARD</h1>
        )}
      </div>

      <div className="DataExport">
        <div className="button mb-3">
          <TextField
            id="outlined-basic"
            label="Outlined"
            type="month"
            variant="outlined"
            onChange={handleMonthYear}
          />
          <TextField
            id="outlined-basic"
            label="Day"
            InputProps={{ inputProps: { min: 1, max: 31 } }}
            type="Number"
            variant="outlined"
            onChange={handleDay}
          />
          <button
            className="btn "
            disabled={boardData.message}
            onClick={() => {
              getDataByType("day");
            }}
          >
            DAY
          </button>
          <button className="btn" disabled={boardData.message}>
            MONTH
          </button>
          <button
            className="btn"
            disabled={boardData.message}
            onClick={() => {
              setData([]);
            }}
          >
            CLEAR
          </button>
        </div>
        <div className="box-table">
          {boardData.length !== 0 && !boardData.message && (
            <DataExport data={data} boardId={boardId} />
          )}
        </div>
      </div>
    </>
  );
};

const MyResponsiveLine = ({ boardData, boardId }) => {
  const tmpData = boardData;
  let b_name = "";
  let dataTmp = [];
  let max = 0;
  tmpData.map((i) => {
    if (b_name === "" && i.b_id === boardId) {
      b_name = i.b_name;
    }
    if (max === 0) {
      max = Number(i.ec) + 550;
    }
    const tmpTime = i.time;
    const Time = tmpTime.split(" ");
    dataTmp.push({ x: Time[4], y: Number(i.ec) });
  });
  const data = [
    {
      id: b_name,
      color: "hsl(353, 70%, 50%)",
      data: dataTmp,
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: max,
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 4,
        tickRotation: -45,
        legend: "TIME",
        legendOffset: 34,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "EC",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      colors={{ scheme: "purpleRed_green" }}
      enablePoints={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      enableCrosshair={false}
      useMesh={true}
      legends={[]}
    />
  );
};

export default Dashboards;

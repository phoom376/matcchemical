import { useTable } from "react-table";
import * as React from "react";
const Dashboards = ({ boards }) => {
  const data = React.useMemo(
    () =>
      boards.map((i, k) => {
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

        return {
          col0: k + 1,
          col1: i.b_name,
          col2: Disable ? (
            <span className="offline">OFFLINE</span>
          ) : (
            <span className="online">ONLINE</span>
          ),
          col3: i.ph,
          col4: i.ec,
          col5:
            i.scc === 0 ? (
              <span className="offline">OFF</span>
            ) : (
              <span className="online">ON</span>
            ),
          col6:
            i.valve === 0 ? (
              <span className="offline">OFF</span>
            ) : (
              <span className="online">ON</span>
            ),
          col7:
            i.bcl === 0 ? (
              <span className="offline">OFF</span>
            ) : (
              <span className="online">ON</span>
            ),
        };
      }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "No",
        accessor: "col0", // accessor is the "key" in the data
      },
      {
        Header: "Name",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Status",
        accessor: "col2",
      },
      {
        Header: "PH",
        accessor: "col3",
      },
      {
        Header: "EC",
        accessor: "col4",
      },
      {
        Header: "SCL",
        accessor: "col5",
      },
      {
        Header: "VALVE",
        accessor: "col6",
      },
      {
        Header: "BCL",
        accessor: "col7",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div className="dashboard-status">
        <div className="table-box">
          <table className="table table-hover table-dark">
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
                  <tr>
                    <td className="tbody">{k + 1}</td>
                    <td className="tbody">{i.b_name}</td>
                    <td className="tbody">
                      {Disable ? (
                        <span className="offline">OFFLINE</span>
                      ) : (
                        <span className="online">ONLINE</span>
                      )}
                    </td>
                    <td className="tbody">{i.ph}</td>
                    <td className="tbody">{i.ec}</td>
                    <td className="tbody">
                      {i.scc === 0 ? (
                        <span className="offline">OFF</span>
                      ) : (
                        <span className="online">ON</span>
                      )}
                    </td>
                    <td className="tbody">
                      {i.valve === 0 ? (
                        <span className="offline">OFF</span>
                      ) : (
                        <span className="online">ON</span>
                      )}
                    </td>
                    <td className="tbody">
                      {i.bcl === 0 ? (
                        <span className="offline">OFF</span>
                      ) : (
                        <span className="online">ON</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* {boards.map((i) => {
          const boardName = i.b_name;
          const dateTime = i.uDate;
          const now = new Date();
          const tmpDT = new Date(dateTime);
          return (
            <div key={i._id}>
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
                    STATUS:
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
            </div>
          );
        })} */}
      </div>
    </>
  );
};

export default Dashboards;

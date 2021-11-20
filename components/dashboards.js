import { useTable } from "react-table";
import * as React from "react";
import classnames from "classnames";
const Dashboards = ({ boards }) => {
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
    </>
  );
};

export default Dashboards;

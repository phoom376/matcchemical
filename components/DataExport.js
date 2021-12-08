import React, { Component, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const DataExport = ({ data, boardId }) => {
  const headers = [
    { label: "No.", key: "no" },
    { label: "BOARD ID", key: "b_id" },
    { label: "BOARD NAME", key: "b_name" },
    { label: "PH", key: "ph" },
    { label: "EC", key: "ec" },
    { label: "WATER FLOW", key: "flow" },
    { label: "WATER TOTAL", key: "total" },
    { label: "TIME", key: "time" },
  ];

  const csv_data = [];
  const [boardName, setBoardName] = useState("");
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
  return (
    <div>
      <h2>
        BOARD NAME: {boardName} BOARD ID: {boardId}
      </h2>
      <div>
        {data.length !== 0 && (
          <button className="btn mt-5">
            <CSVLink
              // className="btn"
              style={{ textDecoration: "none", color: "white" }}
              data={csv_data}
              filename={`MATCHCHEMICAL_BOARD_ID_${boardId}`}
              headers={headers}
            >
              Download CSV
            </CSVLink>
          </button>
        )}
      </div>
      <table className="table table-striped table-dark mt-5">
        <thead>
          <tr>
            <th>NO.</th>
            <th>BOARD ID</th>
            <th>BOARD NAME</th>
            <th>PH</th>
            <th>EC</th>
            <th>WATER FLOW</th>
            <th>WATER TOTAL</th>
            <th>TIME</th>
          </tr>
        </thead>

        {data.length > 0 &&
          data.map((i, k) => {
            const tmpTime = i.time;
            const timeSplit = tmpTime.split(" ");
            const year = timeSplit[3];
            const time = timeSplit[4];
            const day = timeSplit[2];
            let tMonth = 0;
            {
              /* console.log(i.time); */
            }
            for (let i = 0; i < Months.length; i++) {
              if (timeSplit[1] === Months[i]) {
                tMonth = i + 1;
              }
            }
            csv_data.push({
              no: k + 1,
              b_id: i.b_id,
              b_name: i.b_name,
              ph: i.ph,
              ec: i.ec,
              flow: i.flow,
              total: i.total,
              time: `${day}/${tMonth}/${year} ${time}`,
            });
            return (
              <tbody>
                <tr>
                  <td>{k + 1}</td>
                  <td>{i.b_id}</td>
                  <td>{i.b_name}</td>
                  <td>{i.ph}</td>
                  <td>{i.ec}</td>
                  <td>{i.flow}</td>
                  <td>{i.total}</td>
                  <td>
                    {day}/{tMonth}/{year} {time}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default DataExport;

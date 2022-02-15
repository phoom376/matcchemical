import React, { Component, useState } from "react";
import { CSVLink, CSVDownload } from "react-csv";

const DataExport = ({
  data,
  boardId,
  boardName,
  csv_data,
  Months,
  setNMonth,
}) => {
  return (
    <div>
      <div className="data-head">
        <div>
          <h2>
            BOARD NAME: {boardName} BOARD ID: {boardId}
          </h2>
        </div>

        <div>
          {data.message && <h2 style={{ color: "red" }}>{data.message}</h2>}
        </div>
      </div>

      {data.length > 0 && (
        <table className="table table-striped table-dark mt-5">
          <thead>
            <tr>
              <th>NO.</th>
              <th>BOARD ID</th>
              <th>BOARD NAME</th>
              <th>BOARD TEMP</th>
              <th>BOARD HUM</th>
              <th>PH</th>
              <th>PH TEMP</th>
              <th>EC</th>
              <th>EC TEMP</th>
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
              setNMonth(tMonth);
              csv_data.push({
                no: k + 1,
                b_id: i.b_id,
                b_name: i.b_name,
                boardTemp: i.boardTemp,
                boardHum: i.boardHum,
                ph: i.ph,
                phTemp: i.phTemp,
                ec: i.ec,
                ecTemp: i.ecTemp,
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
                    <td>{i.boardTemp}</td>
                    <td>{i.boardHum}</td>
                    <td>{i.ph}</td>
                    <td>{i.phTemp}</td>
                    <td>{i.ec}</td>
                    <td>{i.ecTemp}</td>
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
      )}
    </div>
  );
};

export default DataExport;

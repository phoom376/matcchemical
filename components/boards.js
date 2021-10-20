import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Swal = require("sweetalert2");
import axios from "axios";
import { useState } from "react";

const server = "https://boardapi.herokuapp.com";

const upDateSccControl = (id, type, scc) => {
  if (type === "SCC") {
    axios
      .post(`${server}/updateSccControl`, { b_id: id, type: type, scc: scc })
      .then((res) => {
        Swal.fire({
          title: "PLEASE WAIT!",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      });
  }
};

const upDateValveControl = (id, type, valve, valvePh, valueTimer) => {
  console.log(id, type, valve ,valvePh, valueTimer);

  if (type === "valve") {
    axios
      .post(`${server}/updateValveControl`, {
        b_id: id,
        type: type,
        valve: valve,
      })
      .then((res) => {
        Swal.fire({
          title: "PLEASE WAIT!",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      });
  }

  if (type === "valvePh") {
    const phOpen = valvePh;

    console.log(phOpen);
    axios
      .post(`${server}/updateValveControl`, {
        b_id: id,
        type: type,
        valvePh: !phOpen,
      })
      .then((res) => {
        Swal.fire({
          title: "PLEASE WAIT!",
          timer: 500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      });
  }
  if (type === "valveTimer") {
    const timerOpen = valueTimer;

    console.log(timerOpen);
    axios
      .post(`${server}/updateValveControl`, {
        b_id: id,
        type: type,
        valveTimer: !timerOpen,
      })
      .then((res) => {
        Swal.fire({
          title: "PLEASE WAIT!",
          timer: 500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      });
  }
};


const setValvePH = () => {
    
}

const boards = ({ boards }) => {
  return boards.map((i) => {
    if (i.ph !== null) {
      const flow = Number(i.flow);
      const dateTime = i.uDate;
      const newDateTime = dateTime.split("T");
      const date = newDateTime[0];
      const time = newDateTime[1].split(".");
      const now = new Date();
      const tmpDT = new Date(dateTime);
      return (
        <div className="board" key={i._id}>
          <div className="mb-3 ">
            <div className="board-header">
              <h3>Board Name: {i.b_name}</h3>
              <p>
                BOARD STATUS:{" "}
                {tmpDT.getFullYear() === now.getFullYear() &&
                tmpDT.getDate() === now.getDate() &&
                tmpDT.getDay() === now.getDay() &&
                tmpDT.getHours() === tmpDT.getHours() &&
                tmpDT.getMinutes() + 1 >= now.getMinutes() ? (
                  <span style={{ color: "green" }}>ONLINE</span>
                ) : (
                  <span style={{ color: "red" }}>OFFLINE</span>
                )}
              </p>

              <p>
                Last Time Update:{" "}
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  {date} {time[0]}
                </span>
              </p>
            </div>

            <div className="button-box">
              <div className="box">
                <p className="button-title">SCC</p>
                {i.scc === 0 ? (
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => upDateSccControl(i._id, "SCC", 1)}
                    disabled={
                      tmpDT.getFullYear() !== now.getFullYear() ||
                      tmpDT.getDate() !== now.getDate() ||
                      tmpDT.getDay() !== now.getDay() ||
                      tmpDT.getHours() !== tmpDT.getHours() ||
                      tmpDT.getMinutes() !== now.getMinutes()
                    }
                  >
                    OFF
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => upDateSccControl(i._id, "SCC", 0)}
                    disabled={
                      tmpDT.getFullYear() !== now.getFullYear() ||
                      tmpDT.getDate() !== now.getDate() ||
                      tmpDT.getDay() !== now.getDay() ||
                      tmpDT.getHours() !== tmpDT.getHours() ||
                      tmpDT.getMinutes() !== now.getMinutes()
                    }
                  >
                    ON
                  </button>
                )}
              </div>
              <div className="box">
                <p className="button-title">Valve</p>
                {i.valve === 0 ? (
                  <button
                    type="button"
                    className="btn btn-outline-warning mb-3"
                    onClick={() =>
                      upDateValveControl(
                        i._id,
                        "valve",
                        1,
                        i.valvePh,
                        i.valveTimer
                      )
                    }
                    disabled={
                      tmpDT.getFullYear() !== now.getFullYear() ||
                      tmpDT.getDate() !== now.getDate() ||
                      tmpDT.getDay() !== now.getDay() ||
                      tmpDT.getHours() !== tmpDT.getHours() ||
                      tmpDT.getMinutes() !== now.getMinutes()
                    }
                  >
                    OFF
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-success mb-3"
                    onClick={() =>
                      upDateValveControl(
                        i._id,
                        "valve",
                        0,
                        i.valvePh,
                        i.valveTimer
                      )
                    }
                    disabled={
                      tmpDT.getFullYear() !== now.getFullYear() ||
                      tmpDT.getDate() !== now.getDate() ||
                      tmpDT.getDay() !== now.getDay() ||
                      tmpDT.getHours() !== tmpDT.getHours() ||
                      tmpDT.getMinutes() !== now.getMinutes()
                    }
                  >
                    ON
                  </button>
                )}
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={() =>
                      upDateValveControl(
                        i._id,
                        "valvePh",
                        i.valve,
                        i.valvePh,
                        i.valveTimer
                      )
                    }

                    checked={i.valvePh}
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault">
                    PH
                  </label>
                </div>

                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={() =>
                      upDateValveControl(
                        i._id,
                        "valveTimer",
                        i.valve,
                        i.valvePh,
                        i.valveTimer
                      )
                    }

                    checked={i.valveTimer}
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault">
                    TIMER
                  </label>
                </div>

                {i.valvePh && (
                  <form>
                    <p>PH</p>
                    <div className="mb-3">
                      <label>START:</label>
                      <input
                        className="form-input"
                        type="number"
                        min="0"
                        max="14"
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label>STOP:</label>
                      <input
                        className="form-input"
                        type="number"
                        min="0"
                        max="14"
                      ></input>
                    </div>
                    <div>
                      <button className="btn btn-outline-primary">SET</button>
                    </div>
                  </form>
                )}

                {i.valveTimer && (
                  <form>
                    <p>Timer</p>
                    <div className="mb-3">
                      <label>START:</label>
                      <input
                        className="form-input"
                        type="number"
                        min="0"
                        max="14"
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label>STOP:</label>
                      <input
                        className="form-input"
                        type="number"
                        min="0"
                        max="14"
                      ></input>
                    </div>
                    <div>
                      <button className="btn btn-outline-primary">SET</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <div className="board-box">
              <div>
                <p className="title">PH</p>
                <br />
                <div className="progress-box">
                  <CircularProgressbar
                    value={i.ph}
                    maxValue={14}
                    circleRatio={0.7}
                    styles={{
                      trail: {
                        strokeLinecap: "butt",
                        transform: "rotate(-126deg)",
                        transformOrigin: "center center",
                      },

                      path: {
                        strokeLinecap: "butt",
                        transform: "rotate(-126deg)",
                        transformOrigin: "center center",
                        stroke: "#5c459b",
                      },
                      text: {
                        fill: "#05ace3",
                        fontSize: "15px",
                      },
                    }}
                    strokeWidth={10}
                    text={`${i.ph} PH`}
                  />
                </div>
              </div>
              <div>
                <p className="title">WATER FLOW</p>
                {flow > 0 ? (
                  <span style={{ color: "green" }}>Water Flowing</span>
                ) : (
                  <span style={{ color: "red" }}>Water Not Flow</span>
                )}
                <div className="progress-box">
                  <CircularProgressbar
                    value={flow}
                    maxValue={100}
                    circleRatio={0.7}
                    styles={{
                      trail: {
                        strokeLinecap: "butt",
                        transform: "rotate(-126deg)",
                        transformOrigin: "center center",
                      },

                      path: {
                        strokeLinecap: "butt",
                        transform: "rotate(-126deg)",
                        transformOrigin: "center center",
                        stroke: "#5c459b",
                      },
                      text: {
                        fill: "#05ace3",
                        fontSize: "15px",
                      },
                    }}
                    strokeWidth={10}
                    text={`${flow} L/H `}
                  />
                </div>
              </div>
              <div>
                <p className="title">WATER TOTAL</p>
                <br />
                <div className="progress-box">
                  <CircularProgressbar
                    value={i.total}
                    maxValue={1000}
                    circleRatio={0.7}
                    styles={{
                      trail: {
                        strokeLinecap: "butt",
                        transform: "rotate(-126deg)",
                        transformOrigin: "center center",
                      },

                      path: {
                        strokeLinecap: "butt",
                        transform: "rotate(-126deg)",
                        transformOrigin: "center center",
                        stroke: "#5c459b",
                      },
                      text: {
                        fill: "#05ace3",
                        fontSize: "15px",
                      },
                    }}
                    strokeWidth={10}
                    text={`${i.total} L\n`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>BOARD NOT FOUNT</div>;
    }
  });
};

export default boards;

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Swal = require("sweetalert2");
import axios from "axios";
import Select from "react-select";
import { useState } from "react";

const server = "https://boardapi.herokuapp.com";
const test = "http://localhost:4002";

const upDateSccControl = (id, type, scc) => {
  if (type === "SCC") {
    Swal.fire({
      title: "PLEASE WAIT!",
      timerProgressBar: true,
      alowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios
      .post(`${server}/updateSccControl`, { b_id: id, type: type, scc: scc })
      .then((res) => {
        Swal.close();
      });
  }
};

const upDateValveControl = (id, type, valve, valvePh, valueTimer) => {
  if (type === "valve") {
    Swal.fire({
      title: "PLEASE WAIT!",
      timerProgressBar: true,
      alowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios
      .post(`${server}/updateValveControl`, {
        b_id: id,
        type: type,
        valve: valve,
      })
      .then(() => {
        Swal.close();
      });
  }

  if (type === "valvePh") {
    const phOpen = valvePh;
    console.log("PH");
    Swal.fire({
      title: "PLEASE WAIT!",
      timerProgressBar: true,
      alowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios
      .post(`${server}/updateValveControl`, {
        b_id: id,
        type: type,
        valvePh: !phOpen,
      })
      .then((res) => {
        Swal.close();
      });
  }
  if (type === "valveTimer") {
    const timerOpen = valueTimer;
    console.log("TIMER");
    Swal.fire({
      title: "PLEASE WAIT!",
      timerProgressBar: true,
      alowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios
      .post(`${server}/updateValveControl`, {
        b_id: id,
        type: type,
        valveTimer: !timerOpen,
      })
      .then((res) => {
        Swal.close();
      });
  }
};

const setValvePH = (e, id, type) => {
  const start = document.getElementById("phStart").value;
  const stop = document.getElementById("phStop").value;

  if (
    Number(start) === 0 ||
    Number(stop) === 0 ||
    start === "" ||
    stop === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Input Start and Stop",
    });
  } else {
    Swal.fire({
      title: "PLEASE WAIT!",
      timerProgressBar: true,
      alowOutsideClick: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios
      .post(`${server}/updateValveControl`, {
        b_id: id,
        type: type,
        valvePhStart: Number(start),
        valvePhStop: Number(stop),
      })
      .then(() => {
        Swal.close();
      });
  }
};

const setDayTime = (e, id, type, length) => {
  const day = document.getElementById("day").value;
  const typeSS = document.getElementById("type").value;
  const time = document.getElementById("time").value;
  const sTime = time.split(":");
  const hours = sTime[0];
  const min = sTime[1];
  let newHours = "";
  let newMin = "";

  console.log(hours[0]);
  if (hours[0] === "0") {
    newHours = hours.replace("0", "");
  } else {
    newHours = hours;
  }

  if (min[0] === "0") {
    newMin = min.replace("0", "");
  } else {
    newMin = min;
  }

  const newHM = newHours + ":" + newMin;
  console.log(day, newHM, typeSS);
  if (length <= 20) {
    if (day !== "" && time !== "") {
      Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      axios
        .post(`${server}/updateValveControl`, {
          b_id: id,
          type: type,
          day: String(day),
          time: String(newHM),
          typeSS: typeSS,
        })
        .then(() => {
          Swal.close();
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Input DAY AND TIME",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Max Timer is 20",
    });
  }
};

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
      const timer = i.timer;
      return (
        <div className="board" key={i._id}>
          <div className="mb-3 ">
            <div className="board-header">
              <h3>Board Name: {i.b_name}</h3>
              <p>
                BOARD STATUS:{" "}
                {tmpDT.getFullYear() !== now.getFullYear() ||
                tmpDT.getDate() !== now.getDate() ||
                tmpDT.getDay() !== now.getDay() ||
                tmpDT.getHours() !== tmpDT.getHours() ||
                tmpDT.getMinutes() !== now.getMinutes() ? (
                  <span style={{ color: "red" }}>OFFLINE</span>
                ) : (
                  <span style={{ color: "green" }}>ONLINE</span>
                )}
              </p>

              <p>
                Last Time Update:{" "}
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  {date} {time[0]}
                </span>
              </p>
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

            <div className="button-box">
              <div className="box">
                <div className="box-title">
                  <p className="button-title">SCL</p>
                  {i.scc === 0 ? (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
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
              </div>
              <div className="box">
                <div className="box-title">
                  <p className="button-title">Valve</p>
                  {i.valve === 0 ? (
                    <button
                      type="button"
                      className="btn btn-outline-danger mb-3"
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
                        tmpDT.getMinutes() !== now.getMinutes() ||
                        i.valvePh ||
                        i.valveTimer
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
                        tmpDT.getMinutes() !== now.getMinutes() ||
                        i.valvePh ||
                        i.valveTimer
                      }
                    >
                      ON
                    </button>
                  )}
                </div>

                <div className="form-check form-switch mb-2 ">
                  <input
                    className="form-check-input"
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
                    disabled={
                      tmpDT.getFullYear() !== now.getFullYear() ||
                      tmpDT.getDate() !== now.getDate() ||
                      tmpDT.getDay() !== now.getDay() ||
                      tmpDT.getHours() !== tmpDT.getHours() ||
                      tmpDT.getMinutes() !== now.getMinutes()
                    }
                    checked={i.valvePh}
                  />
                  <label className="form-check-label">PH</label>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
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
                    disabled={
                      tmpDT.getFullYear() !== now.getFullYear() ||
                      tmpDT.getDate() !== now.getDate() ||
                      tmpDT.getDay() !== now.getDay() ||
                      tmpDT.getHours() !== tmpDT.getHours() ||
                      tmpDT.getMinutes() !== now.getMinutes()
                    }
                    checked={i.valveTimer}
                  />
                  <label className="form-check-label">TIMER</label>
                </div>

                {i.valvePh && (
                  <form className="mt-3">
                    <p>PH</p>
                    <div className="mb-3">
                      <label>START:</label>
                      <input
                        id="phStart"
                        placeholder={i.valvePhStart}
                        className="form-input"
                        type="number"
                        min="0"
                        max="14"
                        disabled={
                          tmpDT.getFullYear() !== now.getFullYear() ||
                          tmpDT.getDate() !== now.getDate() ||
                          tmpDT.getDay() !== now.getDay() ||
                          tmpDT.getHours() !== tmpDT.getHours() ||
                          tmpDT.getMinutes() !== now.getMinutes()
                        }
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label>STOP:</label>
                      <input
                        id="phStop"
                        placeholder={i.valvePhStop}
                        className="form-input"
                        type="number"
                        min="0"
                        max="14"
                        disabled={
                          tmpDT.getFullYear() !== now.getFullYear() ||
                          tmpDT.getDate() !== now.getDate() ||
                          tmpDT.getDay() !== now.getDay() ||
                          tmpDT.getHours() !== tmpDT.getHours() ||
                          tmpDT.getMinutes() !== now.getMinutes()
                        }
                      ></input>
                    </div>
                    <div>
                      <button
                        id="set"
                        disabled={
                          tmpDT.getFullYear() !== now.getFullYear() ||
                          tmpDT.getDate() !== now.getDate() ||
                          tmpDT.getDay() !== now.getDay() ||
                          tmpDT.getHours() !== tmpDT.getHours() ||
                          tmpDT.getMinutes() !== now.getMinutes()
                        }
                        onClick={(e) =>
                          setValvePH(
                            e.preventDefault(),
                            i._id,
                            "valvePhControl"
                          )
                        }
                      >
                        SET
                      </button>
                    </div>
                  </form>
                )}

                {i.valveTimer && (
                  <>
                    <form className="mt-3">
                      <p>Timer</p>

                      <div className="mb-3">
                        <div className="form-group mb-3">
                          <select
                            className="form-control"
                            id="type"
                            disabled={
                              tmpDT.getFullYear() !== now.getFullYear() ||
                              tmpDT.getDate() !== now.getDate() ||
                              tmpDT.getDay() !== now.getDay() ||
                              tmpDT.getHours() !== tmpDT.getHours() ||
                              tmpDT.getMinutes() !== now.getMinutes()
                            }
                          >
                            <option value="Start">Start</option>
                            <option value="Stop">Stop</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <select
                            className="form-control"
                            id="day"
                            disabled={
                              tmpDT.getFullYear() !== now.getFullYear() ||
                              tmpDT.getDate() !== now.getDate() ||
                              tmpDT.getDay() !== now.getDay() ||
                              tmpDT.getHours() !== tmpDT.getHours() ||
                              tmpDT.getMinutes() !== now.getMinutes()
                            }
                          >
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                          </select>
                        </div>
                        <input
                          id="time"
                          className="form-input"
                          defaultValue="00:00"
                          type="time"
                          disabled={
                            tmpDT.getFullYear() !== now.getFullYear() ||
                            tmpDT.getDate() !== now.getDate() ||
                            tmpDT.getDay() !== now.getDay() ||
                            tmpDT.getHours() !== tmpDT.getHours() ||
                            tmpDT.getMinutes() !== now.getMinutes()
                          }
                        ></input>
                      </div>
                      <div>
                        <button
                          id="set"
                          onClick={(e) =>
                            setDayTime(
                              e.preventDefault(),
                              i._id,
                              "addTimer",
                              timer.length
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
                          ADD
                        </button>
                      </div>
                    </form>

                    {timer.length > 0 &&
                      timer.map((i, k) => {
                        return (
                          <>
                            <div className="mt-3" key={i._id}>
                              <label>Timer:{k + 1}</label>
                              <span>
                                DAY: {i.day} TIME: {i.time} TYPE: {i.typeSS}
                              </span>
                            </div>
                          </>
                        );
                      })}
                  </>
                )}
              </div>

              <div className="box">
                <div className="box-title">
                  <p className="box-title">BCL</p>
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

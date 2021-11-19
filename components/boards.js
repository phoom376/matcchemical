import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Swal = require("sweetalert2");
import axios from "axios";
import Select from "react-select";
import { useState } from "react";

// const server = "https://boardapi.herokuapp.com";
const server = "https://www.matchchemical.tk:57524";

const boards = ({ boards }) => {
  const [timerType, setTimerType] = useState("Start");
  const [timerDay, setTimerDay] = useState("Everyday");
  const [timerTime, setTimerTime] = useState("00:00");
  const [phStart, setPhStart] = useState(0);
  const [phStop, setPhStop] = useState(0);
  const [ecStart, setEcStart] = useState(0);
  const [ecStop, setEcStop] = useState(0);

  const setValvePH = (e, id, type) => {
    if (phStart === 0 || phStop === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Input Start and Stop",
      });
    } else {
      Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      axios
        .post(`${server}/updateValveControl`, {
          b_id: id,
          type: type,
          valvePhStart: phStart,
          valvePhStop: phStop,
        })
        .then(() => {
          Swal.close();
          setPhStart(0);
          setPhStop(0);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  const setValveEC = (e, id, type) => {
    if (ecStart === 0 || ecStop === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Input Start and Stop",
      });
    } else {
      Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      axios
        .post(`${server}/updateValveControl`, {
          b_id: id,
          type: type,
          valveEcStart: ecStart,
          valveEcStop: ecStop,
        })
        .then(() => {
          Swal.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  const setDayTime = (e, id, ts, type, length) => {
    const sTime = timerTime.split(":");

    const hours = sTime[0];
    const min = sTime[1];

    let newHours = "";
    let newMin = "";

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

    if (length < 20) {
      const alert = Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      if (ts === "valve") {
        axios
          .post(`${server}/updateValveControl`, {
            b_id: id,
            type: type,
            day: timerDay,
            time: String(newHM),
            typeSS: timerType,
          })
          .then(() => {
            alert.close();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
      if (ts === "bcl") {
        axios
          .post(`${server}/updateBclControl`, {
            b_id: id,
            type: type,
            day: timerDay,
            time: String(newHM),
            typeSS: timerType,
          })
          .then(() => {
            alert.close();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
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

  const upDateSccControl = (id, type, scc) => {
    if (type === "SCC") {
      const alert = Swal.fire({
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
          alert.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert.close();
        });
    }
  };

  const upDateValveControl = (
    id,
    type,
    valve,
    valvePh,
    valveEc,
    valueTimer
  ) => {
    if (type === "valve") {
      const alert = Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,

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
          alert.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert.close();
        });
    }

    if (type === "valvePh") {
      const phOpen = valvePh;

      const alert = Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,
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
          alert.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert.close();
        });
    }

    if (type === "valveEc") {
      const ecOpen = valveEc;

      const alert = Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      axios
        .post(`${server}/updateValveControl`, {
          b_id: id,
          type: type,
          valveEc: !ecOpen,
        })
        .then((res) => {
          alert.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert.close();
        });
    }

    if (type === "valveTimer") {
      const timerOpen = valueTimer;

      const alert = Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,

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
          alert.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert.close();
        });
    }
  };

  const upDateBclControl = (id, type, bcl, bclTimer) => {
    if (type === "BCL") {
      const alert = Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,

        didOpen: () => {
          Swal.showLoading();
        },
      });
      axios
        .post(`${server}/updateBclControl`, {
          b_id: id,
          type: type,
          bcl: bcl,
        })
        .then(() => {
          alert.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert.close();
        });
    }

    if (type === "bclTimer") {
      const timerOpen = bclTimer;

      const alert = Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,

        didOpen: () => {
          Swal.showLoading();
        },
      });
      axios
        .post(`${server}/updateBclControl`, {
          b_id: id,
          type: type,
          bclTimer: !timerOpen,
        })
        .then((res) => {
          alert.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert.close();
        });
    }
  };

  const handleTimerDelete = (type, b_id, id) => {
    const alert = Swal.fire({
      title: "PLEASE WAIT!",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    if (type === "valve") {
      axios
        .post(`${server}/valveTimerDelete`, {
          b_id: b_id,
          id: id,
        })
        .then(() => {
          alert.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert.close();
        });
    }
    if (type === "bcl") {
      axios
        .post(`${server}/bclTimerDelete`, {
          b_id: b_id,
          id: id,
        })
        .then(() => {
          alert.close();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert.close();
        });
    }
  };

  return boards.map((i) => {
    if (i.ph !== null || i.ec !== null) {
      const flow = Number(i.flow);
      const dateTime = i.uDate;
      const now = Date(Date.now);
      const tmpDT = dateTime.split(" ");
      const tmpNow = now.split(" ");
      const valveTimer = i.valveTimers;
      const bclTimer = i.bclTimers;
      const b_id = i.b_id;
      const boardName = i.b_name;
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

      // console.log(now.getHours());
      // console.log(dateTime);
      // console.log(tmpDT.getHours());

      return (
        <div
          className={`board ${Disable ? "B_offline" : "B_online"}`}
          key={b_id}
        >
          <div className="mb-3 ">
            <div className="board-header">
              <p className="board-title">
                BOARD NAME:{" "}
                <span className="board-name">{boardName.toUpperCase()}</span>
              </p>
              <p className="board-status">
                BOARD STATUS:{" "}
                {Disable ? (
                  <span className="offline">OFFLINE</span>
                ) : (
                  <span className="online">ONLINE</span>
                )}
              </p>

              <p className="time-box">
                Last Time Update:{" "}
                <span className="time">
                  {day}/{month}/{year} {Hour}:{Min}:{Sec}
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
                        fontSize: "12px",
                      },
                    }}
                    strokeWidth={10}
                    text={`${i.ph} PH`}
                  />
                </div>
              </div>

              <div>
                <p className="title">EC</p>
                <br />
                <div className="progress-box">
                  <CircularProgressbar
                    value={i.ec}
                    maxValue={10000}
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
                        fontSize: "12px",
                      },
                    }}
                    strokeWidth={10}
                    text={`${i.ec} MS`}
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
                        fontSize: "12px",
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
                        fontSize: "12px",
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
                      onClick={() => upDateSccControl(b_id, "SCC", 1)}
                      disabled={Disable}
                    >
                      OFF
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => upDateSccControl(b_id, "SCC", 0)}
                      disabled={Disable}
                    >
                      ON
                    </button>
                  )}
                </div>
              </div>
              <div className="box">
                <div className="box-title">
                  <p className="button-title">VALVE</p>
                  {i.valve === 1 && i.flow <= 0 && (
                    <div className="alert">
                      <span>PUMP ALERT</span>
                    </div>
                  )}
                  {i.valve === 0 ? (
                    <button
                      type="button"
                      className="btn btn-outline-danger mb-3"
                      onClick={() =>
                        upDateValveControl(
                          b_id,
                          "valve",
                          1,
                          i.valvePh,
                          i.valveEc,
                          i.valveTimer
                        )
                      }
                      disabled={
                        Disable || i.valvePh || i.valveTimer || i.valveEc
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
                          b_id,
                          "valve",
                          0,
                          i.valvePh,
                          i.valveTimer
                        )
                      }
                      disabled={
                        Disable || i.valvePh || i.valveTimer || i.valveEc
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
                        b_id,
                        "valvePh",
                        i.valve,
                        i.valvePh,
                        i.valveEc,
                        i.valveTimer
                      )
                    }
                    disabled={Disable || i.valveTimer || i.valveEc}
                    checked={i.valvePh}
                  />
                  <label className="form-check-label">PH</label>
                </div>

                <div className="form-check form-switch mb-2 ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={() =>
                      upDateValveControl(
                        b_id,
                        "valveEc",
                        i.valve,
                        i.valvePh,
                        i.valveEc,
                        i.valveTimer
                      )
                    }
                    disabled={Disable || i.valveTimer || i.valvePh}
                    checked={i.valveEc}
                  />
                  <label className="form-check-label">EC</label>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={() =>
                      upDateValveControl(
                        b_id,
                        "valveTimer",
                        i.valve,
                        i.valvePh,
                        i.valveEc,
                        i.valveTimer
                      )
                    }
                    disabled={Disable || i.valvePh || i.valveEc}
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
                        defaultValue={i.valvePhStart}
                        className="form-input"
                        type="number"
                        min="0"
                        max="14"
                        style={{ color: "white" }}
                        disabled={Disable}
                        onChange={(e) => {
                          setPhStart(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label>STOP:</label>
                      <input
                        id="phStop"
                        defaultValue={i.valvePhStop}
                        className="form-input"
                        type="number"
                        min="0"
                        max="14"
                        style={{ color: "white" }}
                        disabled={Disable}
                        onChange={(e) => {
                          setPhStop(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div>
                      <button
                        id="set"
                        disabled={Disable}
                        onClick={(e) =>
                          setValvePH(e.preventDefault(), b_id, "valvePhControl")
                        }
                      >
                        SET
                      </button>
                    </div>
                  </form>
                )}

                {i.valveEc && (
                  <form className="mt-3">
                    <p>EC</p>
                    <div className="mb-3">
                      <label>START:</label>
                      <input
                        id="ecStart"
                        defaultValue={i.valveEcStart}
                        className="form-input"
                        type="number"
                        min="0"
                        max="10000"
                        style={{ color: "white" }}
                        disabled={Disable}
                        onChange={(e) => {
                          setEcStart(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label>STOP:</label>
                      <input
                        id="ecStop"
                        defaultValue={i.valveEcStop}
                        className="form-input"
                        type="number"
                        min="0"
                        max="10000"
                        style={{ color: "white" }}
                        disabled={Disable}
                        onChange={(e) => {
                          setEcStop(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div>
                      <button
                        id="set"
                        disabled={Disable}
                        onClick={(e) =>
                          setValveEC(e.preventDefault(), b_id, "valveEcControl")
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
                            id="valveType"
                            disabled={Disable}
                            defaultValue="Start"
                            onChange={(e) => {
                              setTimerType(e.target.value);
                            }}
                          >
                            <option value="Start" selected>
                              Start
                            </option>
                            <option value="Stop">Stop</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <select
                            className="form-control"
                            id="valveDay"
                            disabled={Disable}
                            onChange={(e) => {
                              setTimerDay(e.target.value);
                            }}
                          >
                            <option value="Everyday" selected>
                              Everyday
                            </option>
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
                          id="valveTime"
                          className="form-input"
                          defaultValue="00:00"
                          type="time"
                          style={{ color: "white" }}
                          disabled={Disable}
                          onChange={(e) => {
                            setTimerTime(e.target.value);
                          }}
                        ></input>
                      </div>
                      <div>
                        <button
                          id="set"
                          onClick={(e) =>
                            setDayTime(
                              e.preventDefault(),
                              b_id,
                              "valve",
                              "addTimer",
                              valveTimer.length
                            )
                          }
                          disabled={Disable}
                        >
                          SET
                        </button>
                      </div>
                    </form>

                    {valveTimer.length > 0 &&
                      valveTimer.map((i, k) => {
                        return (
                          <>
                            <div className="timer-box mt-3" key={i._id}>
                              <div className="timer-header">
                                <p>Timer : {k + 1}</p>
                              </div>

                              <span>DAY : {i.day}</span>
                              <br></br>
                              <span>TIME : {i.time}</span>
                              <br></br>
                              <span> TYPE : {i.typeSS}</span>
                              <div className="timer-button mt-3">
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() =>
                                    handleTimerDelete("valve", b_id, i._id)
                                  }
                                  disabled={Disable}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </>
                )}
              </div>

              <div className="box">
                <div className="box-title">
                  <p className="button-title">BCL</p>
                  {i.bcl === 0 ? (
                    <button
                      type="button"
                      className="btn btn-outline-danger mb-3"
                      onClick={() =>
                        upDateBclControl(b_id, "BCL", 1, i.bclTimer)
                      }
                      disabled={Disable || i.bclTimer}
                    >
                      OFF
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-success mb-3"
                      onClick={() =>
                        upDateBclControl(b_id, "BCL", 0, i.bclTimer)
                      }
                      disabled={Disable || i.bclTimer}
                    >
                      ON
                    </button>
                  )}
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={() =>
                      upDateBclControl(b_id, "bclTimer", i.bcl, i.bclTimer)
                    }
                    disabled={Disable}
                    checked={i.bclTimer}
                  />
                  <label className="form-check-label">TIMER</label>
                </div>

                {i.bclTimer && (
                  <>
                    <form className="mt-3">
                      <p>Timer</p>

                      <div className="mb-3">
                        <div className="form-group mb-3">
                          <select
                            className="form-control"
                            id="bclType"
                            disabled={Disable}
                            onChange={(e) => {
                              setTimerType(e.target.value);
                            }}
                          >
                            <option value="Start">Start</option>
                            <option value="Stop">Stop</option>
                          </select>
                        </div>
                        <div className="form-group mb-3">
                          <select
                            className="form-control"
                            id="bclDay"
                            disabled={Disable}
                            onChange={(e) => {
                              setTimerDay(e.target.value);
                            }}
                          >
                            <option value="Everyday" selected>
                              Everyday
                            </option>
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
                          id="bclTime"
                          className="form-input"
                          defaultValue="00:00"
                          type="time"
                          style={{ color: "white" }}
                          disabled={Disable}
                          onChange={(e) => {
                            setTimerTime(e.target.value);
                          }}
                        ></input>
                      </div>
                      <div>
                        <button
                          id="set"
                          onClick={(e) =>
                            setDayTime(
                              e.preventDefault(),
                              b_id,
                              "bcl",
                              "addTimer",
                              bclTimer.length
                            )
                          }
                          disabled={Disable}
                        >
                          SET
                        </button>
                      </div>
                    </form>

                    {bclTimer.length > 0 &&
                      bclTimer.map((i, k) => {
                        return (
                          <>
                            <div className="timer-box mt-3" key={i._id}>
                              <div className="timer-header">
                                <p>Timer : {k + 1}</p>
                              </div>

                              <span>DAY : {i.day}</span>
                              <br></br>
                              <span>TIME : {i.time}</span>
                              <br></br>
                              <span> TYPE : {i.typeSS}</span>
                              <div className="timer-button mt-3">
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() =>
                                    handleTimerDelete("bcl", b_id, i._id)
                                  }
                                  disabled={Disable}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </>
                )}
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

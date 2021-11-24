import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Swal = require("sweetalert2");
import axios from "axios";
// import Select from "react-select";
import { useState } from "react";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";

import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled, useTheme } from "@mui/material/styles";
import { color } from "@mui/system";

// const server = "https://boardapi.herokuapp.com";
const server = "https://www.matchchemical.tk:57524";
// const server = "http://localhost:4003";

const boards = ({ boards }) => {
  const [timerType, setTimerType] = useState("Start");
  const [timerDay, setTimerDay] = useState("Everyday");
  const [timerTime, setTimerTime] = useState("00:00");
  const [valveTimeStart, setValveTimeStart] = useState(true);
  const [valveTimeStop, setValveTimeStop] = useState(true);
  const [bclTimeStart, setBclTimeStart] = useState(true);
  const [bclTimeStop, setBclTimeStop] = useState(true);
  const [type, setType] = useState("");
  const [phStart, setPhStart] = useState(0);
  const [phStop, setPhStop] = useState(0);
  const [ecStart, setEcStart] = useState(0);
  const [ecStop, setEcStop] = useState(0);
  const [valveDays, setValveDays] = React.useState([]);
  const [bclDays, setBclDays] = React.useState([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // console.log(start, stop);

  const AllDays = [
    "Everyday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getStyles(name, day, theme) {
    return {
      fontWeight:
        day.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const handleValveChange = (event) => {
    const {
      target: { value },
    } = event;
    setValveDays(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleBclChange = (event) => {
    const {
      target: { value },
    } = event;
    setBclDays(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const setValvePH = (e, id, type) => {
    const id_phStart = document.getElementById("phStart").value;
    const id_phStop = document.getElementById("phStop").value;
    console.log(id_phStart, id_phStop);
    if (id_phStart === 0 || id_phStop === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Input Start and Stop",
      });
    } else if (id_phStart > 14 || id_phStop > 14) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "MAX PH IS 14",
      });
    } else if (id_phStart < 0 || id_phStop < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "PLEASE INPUT MORE THAN 0",
      });
    } else {
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
          valvePhStart: id_phStart,
          valvePhStop: id_phStop,
        })
        .then(() => {
          alert.close();
        })
        .catch(function (error) {
          // handle error
          alert.close();
          console.log(error);
        });
    }
  };

  const setValveEC = (e, id, type) => {
    const id_ecStart = document.getElementById("ecStart").value;
    const id_ecStop = document.getElementById("ecStop").value;
    if (id_ecStart === 0 || id_ecStop === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Input Start and Stop",
      });
    } else if (id_ecStart > 10000 || id_ecStop > 10000) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "MAX EC IS 10,000",
      });
    } else if (id_ecStart < 0 || id_ecStop < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "PLEASE INPUT MORE THAN 0",
      });
    } else {
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
          valveEcStart: id_ecStart,
          valveEcStop: id_ecStop,
        })
        .then(() => {
          alert.close();
        })
        .catch(function (error) {
          // handle error
          alert.close();
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

    console.log(id, type, timerDay, String(newHM), timerType);

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
        if (valveDays.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "PLEASE SELECT DAY",
          });
        } else {
          const valveStartTime =
            document.getElementById("valveStartTime").value;
          const valveStopTime = document.getElementById("valveStopTime").value;
          const valveStartTimeTmp = valveStartTime.split(":");
          const valveStopTimeTmp = valveStopTime.split(":");
          const valveStartTimeHours = valveStartTimeTmp[0];
          const valveStartTimeMin = valveStartTimeTmp[1];
          const valveStopTimeHours = valveStopTimeTmp[0];
          const valveStopTimeMin = valveStopTimeTmp[1];

          let valveStartTimeNewHours = "";
          let valveStartTimeNewMin = "";
          let valveStopTimeNewHours = "";
          let valveStopTimeNewMin = "";

          if (valveStartTimeHours[0] === "0") {
            valveStartTimeNewHours = valveStartTimeHours.replace("0", "");
          } else {
            valveStartTimeNewHours = valveStartTimeHours;
          }

          if (valveStartTimeMin[0] === "0") {
            valveStartTimeNewMin = valveStartTimeMin.replace("0", "");
          } else {
            valveStartTimeNewMin = valveStartTimeMin;
          }

          if (valveStopTimeHours[0] === "0") {
            valveStopTimeNewHours = valveStopTimeHours.replace("0", "");
          } else {
            valveStopTimeNewHours = valveStopTimeHours;
          }

          if (valveStopTimeMin[0] === "0") {
            valveStopTimeNewMin = valveStopTimeMin.replace("0", "");
          } else {
            valveStopTimeNewMin = valveStopTimeMin;
          }

          const valveStartTimeNewHM =
            valveStartTimeNewHours + ":" + valveStartTimeNewMin;
          const valveStopTimeNewHM =
            valveStopTimeNewHours + ":" + valveStopTimeNewMin;

          axios
            .post(`${server}/updateValveControl`, {
              b_id: id,
              type: type,
              day: timerDay,
              time: String(newHM),
              typeSS: timerType,
              Start: valveTimeStart,
              Stop: valveTimeStop,
              startTime: String(valveStartTimeNewHM),
              stopTime: String(valveStopTimeNewHM),
              aDay: valveDays,
            })
            .then(() => {
              alert.close();
            })
            .catch(function (error) {
              // handle error
              alert.close();
              console.log(error);
            });
        }
      }
      if (ts === "bcl") {
        if (bclDays.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "PLEASE SELECT DAY",
          });
        } else {
          const bclStartTime = document.getElementById("bclStartTime").value;
          const bclStopTime = document.getElementById("bclStopTime").value;
          const bclStartTimeTmp = bclStartTime.split(":");
          const bclStopTimeTmp = bclStopTime.split(":");
          const bclStartTimeHours = bclStartTimeTmp[0];
          const bclStartTimeMin = bclStartTimeTmp[1];
          const bclStopTimeHours = bclStopTimeTmp[0];
          const bclStopTimeMin = bclStopTimeTmp[1];

          let bclStartTimeNewHours = "";
          let bclStartTimeNewMin = "";
          let bclStopTimeNewHours = "";
          let bclStopTimeNewMin = "";

          if (bclStartTimeHours[0] === "0") {
            bclStartTimeNewHours = bclStartTimeHours.replace("0", "");
          } else {
            bclStartTimeNewHours = bclStartTimeHours;
          }

          if (bclStartTimeMin[0] === "0") {
            bclStartTimeNewMin = bclStartTimeMin.replace("0", "");
          } else {
            bclStartTimeNewMin = bclStartTimeMin;
          }

          if (bclStopTimeHours[0] === "0") {
            bclStopTimeNewHours = bclStopTimeHours.replace("0", "");
          } else {
            bclStopTimeNewHours = bclStopTimeHours;
          }

          if (bclStopTimeMin[0] === "0") {
            bclStopTimeNewMin = bclStopTimeMin.replace("0", "");
          } else {
            bclStopTimeNewMin = bclStopTimeMin;
          }

          const bclStartTimeNewHM =
            bclStartTimeNewHours + ":" + bclStartTimeNewMin;
          const bclStopTimeNewHM =
            bclStopTimeNewHours + ":" + bclStopTimeNewMin;
          axios
            .post(`${server}/updateBclControl`, {
              b_id: id,
              type: type,
              day: timerDay,
              time: String(newHM),
              typeSS: timerType,
              Start: bclTimeStart,
              Stop: bclTimeStop,
              startTime: String(bclStartTimeNewHM),
              stopTime: String(bclStopTimeNewHM),
              aDay: bclDays,
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

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#0ca3dd",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const styles = (theme) => ({
    multilineColor: {
      color: "red",
    },
  });
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
      const WFlow = Number(i.flow);
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
                  {(i.valve === 1 && WFlow == 0) ||
                  (i.valve === 0 && WFlow > 0) ? (
                    <div className="alert">
                      <span>PUMP ALERT</span>
                    </div>
                  ) : (
                    <></>
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
                <div className="Switch">
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={i.valvePh}
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
                      />
                    }
                    disabled={Disable || i.valveTimer || i.valveEc}
                    label="PH"
                  />

                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={i.valveEc}
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
                      />
                    }
                    disabled={Disable || i.valveTimer || i.valvePh}
                    label="EC"
                  />

                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={i.valveTimer}
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
                      />
                    }
                    disabled={Disable || i.valvePh || i.valveEc}
                    label="TIMER"
                  />
                </div>

                {i.valvePh && (
                  <form className="mt-3 box-form">
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
                  <form className="mt-3 box-form">
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
                    <form className="mt-3 box-form">
                      <p>Timer</p>

                      <div className="mb-3">
                        <div className="form-group mb-3">
                          <div>
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="START"
                                onChange={() =>
                                  setValveTimeStart(!valveTimeStart)
                                }
                              />
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="STOP"
                                onChange={() =>
                                  setValveTimeStop(!valveTimeStop)
                                }
                              />
                            </FormGroup>
                          </div>
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
                          <FormControl
                            sx={{
                              mb: 2,
                              width: "100%",
                              maxWidth: "250px",
                              outlineColor: "#FFFF",
                            }}
                          >
                            <InputLabel
                              id="demo-multiple-name-label"
                              style={{ color: "white" }}
                            >
                              DAYS
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              multiple
                              style={{ color: "white" }}
                              value={valveDays}
                              onChange={handleValveChange}
                              input={<OutlinedInput label="Name" />}
                              MenuProps={MenuProps}
                            >
                              {AllDays.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, valveDays, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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
                          defaultValue={nHour + ":" + nMin}
                          type="time"
                          style={{ color: "white" }}
                          disabled={Disable}
                          onChange={(e) => {
                            setTimerTime(e.target.value);
                          }}
                        ></input>
                        {valveTimeStart && (
                          <div>
                            <p>START TIME</p>
                            <input
                              id="valveStartTime"
                              className="form-input"
                              defaultValue={nHour + ":" + nMin}
                              type="time"
                              style={{ color: "white" }}
                              disabled={Disable}
                            ></input>
                          </div>
                        )}
                        {valveTimeStop && (
                          <div>
                            <p>STOP TIME</p>
                            <input
                              id="valveStopTime"
                              className="form-input"
                              defaultValue={nHour + ":" + nMin}
                              type="time"
                              style={{ color: "white" }}
                              disabled={Disable}
                            ></input>
                          </div>
                        )}
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
                        const v_day = i.aDay;
                        {
                          /* console.log(valveTimer); */
                        }
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
                              <br></br>
                              TYPE:
                              {i.Start && <span> START </span>}
                              {i.Stop && <span> STOP </span>}
                              <br></br>
                              <span>Start Time :{i.startTime}</span>
                              <br></br>
                              <span>Stop Time :{i.stopTime}</span>
                              <br></br>
                              {v_day.map((i, d) => {
                                return (
                                  <>
                                    <span>
                                      DAY[{d + 1}]:{i.days}
                                    </span>
                                    <br></br>
                                  </>
                                );
                              })}
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

                <div className="Switch">
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ m: 1 }}
                        checked={i.bclTimer}
                        onChange={() =>
                          upDateBclControl(b_id, "bclTimer", i.bcl, i.bclTimer)
                        }
                      />
                    }
                    disabled={Disable}
                    label="TIMER"
                  />
                </div>

                {i.bclTimer && (
                  <>
                    <form className="mt-3 box-form">
                      <p>Timer</p>

                      <div className="mb-3">
                        <div className="form-group mb-3">
                          <div>
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="START"
                                onChange={() => setBclTimeStart(!bclTimeStart)}
                              />
                              <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="STOP"
                                onChange={() => setBclTimeStop(!bclTimeStop)}
                              />
                            </FormGroup>
                          </div>
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
                          <FormControl
                            sx={{
                              mb: 2,
                              width: "100%",
                              maxWidth: "250px",
                              outlineColor: "#FFFF",
                            }}
                          >
                            <InputLabel
                              id="demo-multiple-name-label"
                              style={{ color: "white" }}
                            >
                              DAYS
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              multiple
                              style={{ color: "white" }}
                              value={bclDays}
                              onChange={handleBclChange}
                              input={<OutlinedInput label="Name" />}
                              MenuProps={MenuProps}
                            >
                              {AllDays.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, bclDays, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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

                        {bclTimeStart && (
                          <div>
                            <p>START TIME</p>
                            <input
                              id="bclStartTime"
                              className="form-input"
                              defaultValue={nHour + ":" + nMin}
                              type="time"
                              style={{ color: "white" }}
                              disabled={Disable}
                            ></input>
                          </div>
                        )}
                        {bclTimeStop && (
                          <div>
                            <p>STOP TIME</p>
                            <input
                              id="bclStopTime"
                              className="form-input"
                              defaultValue={nHour + ":" + nMin}
                              type="time"
                              style={{ color: "white" }}
                              disabled={Disable}
                            ></input>
                          </div>
                        )}
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
                        const b_timer = i.aDay;
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
                              <br></br>
                              TYPE:
                              {i.Start && <span> START </span>}
                              {i.Stop && <span> STOP </span>}
                              <br></br>
                              <span>Start Time :{i.startTime}</span>
                              <br></br>
                              <span>Stop Time :{i.stopTime}</span>
                              <br></br>
                              {b_timer.map((index, d) => {
                                return (
                                  <>
                                    {" "}
                                    <span>
                                      {" "}
                                      DAY[{d + 1}]: {index.days}
                                    </span>
                                    <br></br>
                                  </>
                                );
                              })}
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

import axios from "axios";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Swal = require("sweetalert2");

export default function Board() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const server = "https://boardapi.herokuapp.com";
  const test = "http://localhost:4002";

  useEffect(() => {
    const gProduct = setInterval(() => {
      getBoard();
    }, 1000);

    return () => {
      clearInterval(gProduct);
    };
  }, []);

  const getBoard = () => {
    axios.get(`${server}/boards`).then((res) => {
      setBoards(res.data);
      setLoading(false);
    });
  };

  const upDateBoard = (id, scc) => {
    axios
      .post(`${server}/updateControl`, { b_id: id, scc: scc })
      .then((res) => {
        let timerInterval;
        Swal.fire({
          title: "PLEASE WAIT!",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();

            timerInterval = setInterval(() => {
              
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      });
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Board Page</h1>
        <div className="box_board">
          {boards.map((i, k) => {
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
                    <div className="button-box">
                      <div className="box">
                        <p className="button-title">SCC</p>
                        {i.scc === 0 ? (
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => upDateBoard(i._id, 1)}
                          >
                            OFF
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-success"
                            onClick={() => upDateBoard(i._id, 0)}
                          >
                            ON
                          </button>
                        )}
                      </div>
                      <div className="box">
                        <p className="button-title">PH</p>
                        <form>
                          <div className="mb-3">
                            <label>START:</label>
                            <input type="number" min="0" max="14"></input>
                          </div>
                        </form>
                        <div className="mb-3">
                          <label>STOP:</label>
                          <input type="number" min="0" max="14"></input>
                        </div>
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
            }
          })}
        </div>
      </div>
    );
  }
}

import axios from "axios";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function Board() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const gProduct = setInterval(() => {
      getBoard();
    }, 1000);

    return () => {
      clearInterval(gProduct);
    };
  }, []);

  const getBoard = () => {
    axios.get("https://boardapi.herokuapp.com/board").then((res) => {
      setBoards(res.data);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
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

              const newformat = date + " " + time[0];
              const dayjs = require("dayjs");
              const now = new Date();
              const tmpDT = new Date(newformat);
              console.log(tmpDT.getFullYear());
              console.log(now.getDate());
              {
                /* console.log(newformat);
              console.log(now.format("YYYY-MM-DD hh:mm:ss")); */
              }
              return (
                <div className="board" key={i._id}>
                  <div className="mb-3 ">
                    <div className="board-header">
                      <h3>Board Name: {i.b_name}</h3>
                      <p>
                        BOARD{" "}
                        {tmpDT.getFullYear() !== now.getFullYear() ||
                        tmpDT.getDate() !== now.getDate() ||
                        tmpDT.getDay() !== now.getDay() || tmpDT.getHours() !== tmpDT.getHours() || tmpDT.getMinutes() !== now.getMinutes() || tmpDT.getSeconds() + 15 < now.getSeconds() ? (
                          <span style={{color:"red"}}> OFFLINE</span>
                        ) : (
                          <span style={{color:"green"}}>ONLINE</span>
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

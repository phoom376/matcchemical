import axios from "axios";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

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
          {
            boards.map((i, k) => {
              if(i.ph !== null){const flow = Number(i.flow);
              const dateTime = i.uDate;
              const d = new Da
              const newDateTime = dateTime.split("T");
              const date = newDateTime[0];

              const time = newDateTime[1].split(".");
              return (
                <div className="board" key={i._id}>
                  <div className="mb-3">
                    <h3>Board Name: {i.b_name}</h3>
                    <h5>
                      Last Time Update:{" "}
                      <span style={{ color: "blue", fontWeight: "bold" }}>
                        {date} {time[0]}
                      </span>
                    </h5>
                    <h3>PH</h3>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      <span style={{ flex: "1" }}>0</span>
                      <span>14</span>
                    </div>

                    <ProgressBar
                      variant="success"
                      label={i.ph + " PH"}
                      now={i.ph}
                      max="14"
                    />
                  </div>
                  <div>
                    <h3>WATER FLOW</h3>
                    {flow > 0 ? (
                      <span style={{ color: "green" }}>Water Flowing</span>
                    ) : (
                      <span style={{ color: "red" }}>Water Not Flow</span>
                    )}
                    <p>FLOW: {flow} L/H</p>
                  </div>
                  <div>
                    <h3>WATER TOTAL</h3>
                    <p>TOATAL: {i.total} L</p>
                  </div>
                </div>
              );}
              
            })}
        </div>
      </div>
    );
  }
}

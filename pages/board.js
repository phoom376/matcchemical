import axios from "axios";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

export default function Board() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const gProduct = setInterval(() => {
      getBoard();
    }, 1000);

    return () => {
      clearInterval(gProduct);
    };
  }, []);

  const getBoard = () => {
    axios.get("http://localhost:4002/board").then((res) => {
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
        <h1>Board</h1>

        {boards.map((i, k) => {
          const DateTime = i.updatedAt;
        
        ;
          return (
            <div>
              <div style={{ width: "500px" }}>
                <h3>Board Name: {i.b_name}</h3>
                <h5>Last Time Update: {i.time}</h5>

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
              <p>FLOW: {i.flow}</p>
              <p>TOATAL: {i.total}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

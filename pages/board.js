import axios from "axios";
import { useEffect, useState } from "react";
import Boards from "../components/boards";

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
          <Boards boards={boards} />
        </div>
      </div>
    );
  }
}

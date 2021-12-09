import axios from "axios";
import { useEffect, useState } from "react";
import Dashboards from "../components/dashboards";
import Cookies, { set } from "js-cookie";
import jwt from "jsonwebtoken";
import Router from "next/router";
import Link from "next/link";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
const Swal = require("sweetalert2");

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [boardId, setBoardId] = useState("");
  const [boardName, setBoardName] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const server = "https://www.matchchemical.tk:57524";
  // const server = "http://localhost:4003";
  useEffect(() => {
    const Verify = async () => {
      await CookieCheck();
      await getBoardCompany();

      // await getBoard();
    };
    // console.log(getAll);
    const getData = setInterval(() => {
      // if (boardId === "" && boards.length !== 0) {
      //   setBoardId(boards[0].b_id);
      // }
      // if (select !== "") {
      //   getBoardCompany();
      // }

      // getBoard();

      Verify();
    }, 1000);

    // console.log(boardId);

    const getBoardDataT = setInterval(async () => {}, 1000);
    // getBoardData();
    return () => {
      clearInterval(getData);
      clearInterval(getBoardDataT);
    };
  }, []);

  console.log(year, month, day);

  const CookieCheck = async () => {
    if (!Cookies.get("token")) {
      Object.keys(Cookies.get()).forEach((e) => {
        Cookies.remove(e);
      });
      await Router.push("/login");
      // await (<Link to="/login" />);
    }
  };

  const getDataByType = async (type) => {
    if (date !== "") {
      await axios
        .post(`${server}/getDataByType`, {
          type: type,
          b_id: boardId,
          day: day,
          month: month,
          year: year,
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Select Date",
      });
    }
  };

  const getBoardCompany = async () => {
    // console.log("get");
    const tmpToken = Cookies.get("token");
    const decode = jwt.decode(tmpToken);

    if (tmpToken) {
      if (!decode.c_id) {
        setLoading(false);
        await axios
          .post(`${server}/getBoardCompany`, { c_id: select })
          .then((res) => {
            if (res.data) {
              setBoards(res.data);
            }
          });
      } else {
        await axios
          .post(`${server}/getBoardCompany`, { c_id: decode.c_id })
          .then((res) => {
            if (res.data) {
              setBoards(res.data);
              setLoading(false);
              // if (boardId == "") {
              //   getBoardData(res.data[0].b_id);
              // }
            }
          });
      }
    }
  };

  const getBoardData = async (id, name) => {
    const tmpToken = Cookies.get("token");
    const decode = jwt.decode(tmpToken);
    // if (id !== "") {
    await axios
      .post(`${server}/getBoardDataByCompany`, {
        b_id: id,
      })
      .then((res) => {
        const tmpData = res.data;
        // console.log(res.data);
        setBoardId(id);
        setBoardName(name);
        console.log(id, name);
        if (res.data.message) {
          setBoardData(res.data);
        } else {
          const tmpReverse = tmpData;
          setBoardData(tmpReverse);
        }
        console.log("GET");
      });
    // } else {
    //   await axios
    //     .post(`${server}/getBoardDataByCompany`, {
    //       b_id: boardId,
    //     })
    //     .then((res) => {
    //       const tmpData = res.data;
    //       console.log(boardId);
    //       // setBoardId(id);
    //       const tmpReverse = tmpData;
    //       setBoardData(tmpReverse);
    //       console.log("GET");
    //     });
    // }
  };

  if (loading) {
    return (
      <div>
        {/* <img   src="./loading.gif" /> */}
        <h1 className="center">
          <img src="./loading.gif" />
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="dashboard-header">
          <p className="mt-2">TOTAL BOARD : {boards.length}</p>
        </div>
        <div>
          <Dashboards
            boards={boards}
            setBoardId={setBoardId}
            getBoardData={getBoardData}
            getDataByType={getDataByType}
            boardData={boardData}
            boardId={boardId}
            boardName={boardName}
            data={data}
            setData={setData}
            setMonth={setMonth}
            setYear={setYear}
            setDay={setDay}
            setDate={setDate}
            date={date}
          />
        </div>
      </div>
    );
  }
};

export default Dashboard;

import axios from "axios";
import { useEffect, useState } from "react";
import Dashboards from "../components/dashboards";
import Cookies, { set } from "js-cookie";
import jwt from "jsonwebtoken";
import Router from "next/router";
import Link from "next/link";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [boardId, setBoardId] = useState("");
  const [loading, setLoading] = useState(true);
  const server = "https://www.matchchemical.tk:57524";
  // const server = "http://localhost:4003";
  useEffect(() => {
    const Verify = async () => {
      await CookieCheck();
      await getBoardCompany();

      // await getBoard();
    };
    // console.log(getAll);
    const getData = setTimeout(() => {
      // if (boardId === "" && boards.length !== 0) {
      //   setBoardId(boards[0].b_id);
      // }
      // if (select !== "") {
      //   getBoardCompany();
      // }

      // getBoard();

      Verify();
    }, 1000);

    const getBoardDataT = setTimeout(async () => {}, 10000);
    getBoardData();
    return () => {
      clearTimeout(getData);
      clearInterval(getBoardDataT);
    };
  }, []);

  console.log(boardId, boardData);

  const CookieCheck = async () => {
    if (!Cookies.get("token")) {
      Object.keys(Cookies.get()).forEach((e) => {
        Cookies.remove(e);
      });
      await Router.push("/login");
      // await (<Link to="/login" />);
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
              if (boardId === "") {
                setBoardId(res.data[0].b_id);
              }
            }
          });
      }
    }
  };

  const getBoardData = async () => {
    const tmpToken = Cookies.get("token");
    const decode = jwt.decode(tmpToken);

    await axios
      .post(`${server}/getBoardDataByCompany`, {
        c_id: decode.c_id,
        b_id: boardId,
      })
      .then((res) => {
        const tmpData = res.data;
        console.log(boardId);
        const tmpReverse = tmpData.reverse();
        setBoardData(tmpReverse);
        console.log("GET");
      });
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
            boardData={boardData}
          />

          {boardData.length !== 0 ? (
            <div
              style={{
                height: 500,
                boxShadow: "0px 0px 8px 4px rgba(0, 0, 0, 0.1)",
                border: "1px solid white",
                borderRadius: "10px",

                // width: "70%",
              }}
            >
              <MyResponsiveLine
                boardData={boardData}
                boardId={boardId}
                getBoardData={getBoardData()}
              />
            </div>
          ) : (
            <h1 className="center">
              <img src="./loading.gif" />
            </h1>
          )}
        </div>
      </div>
    );
  }
};

const MyResponsiveLine = ({ boardData, boardId }) => {
  const tmpData = boardData;
  let b_name = "";
  let dataTmp = [];
  let max = 0;
  tmpData.reverse().map((i) => {
    if (b_name === "" && i.b_id === boardId) {
      b_name = i.b_name;
    }
    if (max === 0) {
      max = Number(i.ec) + 550;
    }
    const tmpTime = i.time;
    const Time = tmpTime.split(" ");
    if (i.b_id === boardId) {
      dataTmp.push({ x: Time[4], y: Number(i.ec) });
    }
  });
  const data = [
    {
      id: b_name,
      color: "hsl(353, 70%, 50%)",
      data: dataTmp,
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: max,
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "TIME",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "EC",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      colors={{ scheme: "set1" }}
      pointSize={10}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ theme: "background" }}
      enablePointLabel={true}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Dashboard;

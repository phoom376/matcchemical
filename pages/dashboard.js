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

  useEffect(() => {
    const Verify = async () => {
      await CookieCheck();
      await getBoardCompany();
      await getBoardData();
      // await getBoard();
    };
    // console.log(getAll);
    setInterval(() => {
      // if (select !== "") {
      //   getBoardCompany();
      // }

      // getBoard();

      Verify();
    }, 1000);
  }, []);

  console.log(boardId, boardData.slice(boardData.length - 11, -1));

  const CookieCheck = async () => {
    if (!Cookies.get("token")) {
      Object.keys(Cookies.get()).forEach((e) => {
        Cookies.remove(e);
      });
      await Router.push("/login");
      await (<Link to="/login" />);
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
              if (boardId !== "") {
              } else {
                // setBoardId(res.data[0].b_id);
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
        setBoardData(res.data);
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
          <div
            style={{
              height: 400,
              boxShadow: "box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.1)",
              // width: "70%",
            }}
          >
            <MyResponsiveLine boardData={boardData} />
          </div>
          <Dashboards
            boards={boards}
            setBoardId={setBoardId}
            boardData={boardData}
          />
        </div>
      </div>
    );
  }
};

const MyResponsiveLine = ({ boardData }) => {
  const tmpData = boardData.slice(boardData.length - 20, -1);
  const data = [
    {
      id: "EC",
      color: "hsl(353, 70%, 50%)",
      data: tmpData.map((i, k) => {
        const tmpTime = i.time;
        const Time = tmpTime.split(" ");
        return { x: Time[4], y: i.ec };
      }),
    },
  ];
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
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
          // effects: [
          //     {
          //         on: 'hover',
          //         style: {
          //             itemBackground: 'rgba(0, 0, 0, .03)',
          //             itemOpacity: 1
          //         }
          //     }
          // ]
        },
      ]}
    />
  );
};

export default Dashboard;

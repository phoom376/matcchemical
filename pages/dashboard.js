import axios from "axios";
import { useEffect, useState } from "react";
import Dashboards from "../components/dashboards";
import Cookies, { set } from "js-cookie";
import jwt from "jsonwebtoken";
import Router from "next/router";
import Link from "next/link";
const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const server = "https://www.matchchemical.tk:57524";

  useEffect(() => {
    const Verify = async () => {
      await CookieCheck();
      await getBoardCompany();
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
            }
          });
      }
    }
  };

  if (loading) {
    return (
      <div >
       {/* <img   src="./loading.gif" /> */}
        <h1 className="center"><img   src="./loading.gif" /></h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="dashboard-header">
          <p className="mt-2">TOTAL BOARD : {boards.length}</p>
        </div>
        <div>
          <Dashboards boards={boards} />
        </div>
      </div>
    );
  }
};

export default Dashboard;

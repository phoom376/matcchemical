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
  const [comId, setComId] = useState("");
  const server = "https://www.matchchemical.tk:57524";

  useEffect(() => {
    const Verify = async () => {
      await CookieCheck();
      await getBoardCompany();

      // await getBoard();
    };
    // console.log(getAll);
    const gProduct = setInterval(() => {
      // if (select !== "") {
      //   getBoardCompany();
      // }

      // getBoard();

      Verify();
    }, 1000);

    return () => {
      clearInterval(gProduct);
    };
  }, [boards]);

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
    await setComId(decode.c_id);
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
        <p style={{ marginLeft: "10px", fontSize: "30px" }}>
          TOTAL BOARD : {boards.length}
        </p>
        <Dashboards boards={boards} />
      </div>
    );
  }
};

export default Dashboard;

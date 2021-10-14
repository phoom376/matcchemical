import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import { FaUserCircle, FaProductHunt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCube } from "react-icons/io5";
import { SiArduino } from "react-icons/si";
import {
  AiFillDashboard,
  AiOutlineSearch,
  AiFillSetting,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import classnames from "classnames";
import Link from "next/link";
import Product from "./product";
import Board from "./board";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(Cookies.get("page"));
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const Verify = async () => {
      await verifyToken();
      if (!Cookies.get("auth")) {
        Router.push("/");
      }

      if (navigator.onLine) {
       await  setOnline (navigator.onLine);
      } else {
        await  setOnline(false);
      }
    };

    Verify();
  }, []);

  const verifyToken = async () => {
    const tmpToken = await Cookies.get("token");

    await axios
      .post("http://localhost:4001/auth", { token: tmpToken })
      .then((res) => {
        setAuth(res.data.isAuth);
        setMessage(res.data.message);
        if (res.data.isAuth) {
          const decode = jwt.decode(tmpToken);
          Cookies.set("auth", true);
          Cookies.set("username", decode.username);
          setUsername(Cookies.get("username"));
        }
      });
  };

  const logout = () => {
    Object.keys(Cookies.get()).forEach((e) => {
      Cookies.remove(e);
    });
    Router.push("/");
  };
  const Page = () => {
    switch (page) {
      case "product":
        Cookies.set("page", "product");
        return (
          <>
            <Product />
          </>
        );

      case "board":
        Cookies.set("page", "board");
        return (
          <>
            <Board />
          </>
        );

      default:
        return <Homepage />;
    }
  };

  const Homepage = () => {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  };

  const Home = () => {
    return auth ? (
      <>
        <header>
          <meta charSet="UTF-8" />

          <title>Home</title>
        </header>
        <div>
          <div className={classnames("sidebar", { active: open })}>
            <div className="logo_content">
              <div className="logo">
                <IoCube className="icon" />

                <div className="logo_name">CUBE</div>
              </div>
              <GiHamburgerMenu
                id="btn"
                onClick={() => {
                  setOpen(!open);
                }}
              />
            </div>
            <div className="nav_list">
              <li>
                <div className="search">
                  <AiOutlineSearch
                    className="ic"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  />
                  <input className="link_name" />
                </div>
              </li>

              <li>
                <a
                  href="#"
                  onClick={() => {
                    setPage("");
                  }}
                >
                  <AiFillDashboard className="ic" />
                  <span className="link_name">Dashboard</span>
                </a>
                <span className="t-tip">Dashboard</span>
              </li>

              <li>
                <a
                  href="#"
                  onClick={() => {
                    setPage("product");
                  }}
                >
                  <FaProductHunt className="ic" />
                  <span className="link_name">Products</span>
                </a>
                <span className="t-tip">Product</span>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setPage("board");
                  }}
                >
                  <SiArduino className="ic" />
                  <span className="link_name">Board</span>
                </a>
                <span className="t-tip">Board</span>
              </li>
            </div>

            <div className="profile">
              <FaUserCircle className="ic" />
              <span className="profile_name">{username}</span>
              <BiLogOut id="logout" onClick={logout} />
            </div>
          </div>
          <div className={classnames("home_content", { active: open })}>
            <div className="home_page">
              <Page />
            </div>
          </div>
        </div>
        <footer></footer>
      </>
    ) : (
      <div></div>
    );
  };

  if (online) {
    return Home();
  } else {
    return (
      <div>
        <h1>OFFLINE PLEASE CONNECT INTERNET</h1>
      </div>
    );
  }
}

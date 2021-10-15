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
import Product from "../pages/product";
import Board from "../pages/board";

const Sidebar = ({ children }) => {
  const [username, setUsername] = useState(Cookies.get("username"));
  const [open, setOpen] = useState(true);

  const logout = () => {
    Object.keys(Cookies.get()).forEach((e) => {
      Cookies.remove(e);
    });
    Router.push("/");
    <Link to="/" />;
  };

  useEffect(() => {
    const Verify = async () => {
      await verifyToken();
      if (!Cookies.get("auth")) {
        Router.push("/");
        <Link to="/"></Link>;
      } else {
      }
    };

    Verify();
  }, []);

  const verifyToken = async () => {
    const tmpToken = await Cookies.get("token");

    await axios
      .post("http://localhost:4001/auth", { token: tmpToken })
      .then((res) => {
        if (res.data.isAuth) {
          const decode = jwt.decode(tmpToken);
          Cookies.set("auth", true);
          Cookies.set("username", decode.username);
          setUsername(Cookies.get("username"));
        }
      });
  };

  const Home = () => {
    return (
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
                <a>
                  <AiFillDashboard className="ic" />
                  <span className="link_name">Dashboard</span>
                </a>
                <span className="t-tip">Dashboard</span>
              </li>

              <li>
                <Link href="/product">
                  <a>
                    <FaProductHunt className="ic" />
                    <span className="link_name">Products</span>
                  </a>
                </Link>
                <span className="t-tip">Product</span>
              </li>
              <li>
                <Link href="/board">
                  <a>
                    <SiArduino className="ic" />
                    <span className="link_name">Board</span>
                  </a>
                </Link>

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
            <div className="home_page">{children}</div>
          </div>
        </div>
        <footer></footer>
      </>
    );
  };

  return Home();
};

export default Sidebar;

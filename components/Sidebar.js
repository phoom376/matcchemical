import { useEffect, useState } from "react";
import Cookies, { set } from "js-cookie";
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
import Head from "next/head";
const Swal = require("sweetalert2");

const Sidebar = ({ children }) => {
  const [username, setUsername] = useState(Cookies.get("username"));
  const [open, setOpen] = useState(true);
  const [auth, setAuth] = useState(false);
  const [online, setOnline] = useState(true);
  const [token, setToken] = useState("");

  const logout = async () => {
    const wait = Swal.fire({
      title: "LOGOUT!",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    Object.keys(Cookies.get()).forEach((e) => {
      Cookies.remove(e);
    });

    // await (<Link to="/login" />);
    await wait.close();
    // window.location.reload(true);

    await Router.push("/login");
  };

  useEffect(() => {
    const Verify = async () => {
      await CookieCheck();
      await verifyToken();
    };
    setInterval(() => {
      internetCheck();
    }, 1000);

    Verify();
  }, []);

  const internetCheck = () => {
    const iCheck = navigator.onLine;
    setOnline(iCheck);
  };

  const CookieCheck = async () => {
    if (!Cookies.get("token")) {
      Object.keys(Cookies.get()).forEach((e) => {
        Cookies.remove(e);
      });
      Router.push("/");
      // await (<Link to="/login" />);
    }
  };

  const verifyToken = async () => {
    const tmpToken = await Cookies.get("token");
    if (!Cookies.get("token")) {
      await Router.push("/");
      // await (<Link to="/login" />);
    } else {
      const decode = jwt.decode(tmpToken);

      Cookies.set("username", decode.username);
      setUsername(Cookies.get("username"));
    }

    // await axios
    //   .post("https://userlogapi.herokuapp.com/auth", { token: tmpToken })
    //   .then((res) => {
    //     if (res.data.isAuth) {
    //       setAuth(res.data.isAuth);
    //       const decode = jwt.decode(tmpToken);
    //       // Cookies.set("auth", true);
    //       Cookies.set("username", decode.username);
    //       setUsername(Cookies.get("username"));
    //     }
    //   });
  };

  const Home = () => {
    if (Cookies.get("token")) {
      return (
        <>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              http-equiv="Content-Security-Policy"
              content="upgrade-insecure-requests"
            />
            <title>MATCHCHEMICAL</title>
            <link rel="icon" href="/new2.png" />
          </Head>
          <div>
            <div className={classnames("sidebar", { active: open })}>
              <div className="logo_content">
                <div className="logo">
                  <img src="./new2.png" className="icon" />
                  {/* <IoCube className="icon" /> */}

                  <div className="logo_name">MATCHCHEMICAL</div>
                </div>
                <GiHamburgerMenu
                  id="btn"
                  onClick={() => {
                    setOpen(!open);
                  }}
                />
              </div>
              <div className="nav_list">
                {/* <li>
                  <div className="search">
                    <AiOutlineSearch
                      className="ic"
                      onClick={() => {
                        setOpen(!open);
                      }}
                    />
                    <input className="link_name" />
                  </div>
                </li> */}

                <li>
                  <Link href="/dashboard">
                    <a>
                      <AiFillDashboard className="ic" />
                      <span className="link_name">Dashboard</span>
                    </a>
                  </Link>

                  <span className="t-tip">Dashboard</span>
                </li>

                {/* <li>
                  <Link href="/product">
                    <a>
                      <FaProductHunt className="ic" />
                      <span className="link_name">Products</span>
                    </a>
                  </Link>
                  <span className="t-tip">Product</span>
                </li> */}
                <li>
                  <Link href="/board">
                    <a>
                      <SiArduino className="ic" />
                      <span className="link_name">Control</span>
                    </a>
                  </Link>

                  <span className="t-tip">Control</span>
                </li>
              </div>

              <div className="profile">
                <FaUserCircle className="ic" />
                <p className="profile_name">{username}</p>
                <BiLogOut id="logout" onClick={logout} />
              </div>
            </div>
            {online ? (
              <div className={classnames("home_content", { active: open })}>
                <div className="home_page">{children}</div>
              </div>
            ) : (
              <div
                className={classnames("home_content center", {
                  active: open,
                })}
              >
                <h1>PLEASE CONNECT INTERNET</h1>
              </div>
            )}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <img className="center" src="./loading.gif" />
          {/* <h1 className="center" style={{ color: "white", fontWeight: "bold" }}>Loading...</h1> */}
        </div>
      );
    }
  };

  return Home();
};

export default Sidebar;

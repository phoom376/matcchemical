import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import axios from "axios";
import jwt from "jsonwebtoken";
import { FaUserCircle, FaProductHunt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCube } from "react-icons/io5";
import {
  AiFillDashboard,
  AiOutlineSearch,
  AiFillSetting,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import classnames from "classnames";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  useEffect(async () => {
    await veryfyToken();

    if (!Cookies.get("auth")) {
      Router.push("/");
    }
  }, []);

  const veryfyToken = async () => {
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


  return auth ? (
    <>
      <header>
        <meta charset="UTF-8" />

        <title>Home</title>
      </header>
      <body>
        <div className={classnames("sidebar",{active : open} )}>
          <div className="logo_content">
            <div className="logo">
              <IoCube className="icon" />

              <div className="logo_name">CUBE</div>
            </div>
            <GiHamburgerMenu id="btn" onClick={()=>{setOpen(!open)}}/>
          </div>
          <div className="nav_list">
            <li>
              <div className="search">
                <AiOutlineSearch className="ic" onClick={()=>{setOpen(!open)}} />
                <input className="link_name" />
              </div>
            </li>

            <li>
              <a href="#">
                <AiFillDashboard className="ic" />
                <span className="link_name">Dashboard</span>
              </a>
              <span className="t-tip">Dashboard</span>
            </li>

            <li>
              <a href="#">
                <FaProductHunt className="ic" />
                <span className="link_name">Products</span>
              </a>
              <span className="t-tip">Product</span>
            </li>
            <li>
              <a href="#">
                <AiFillSetting className="ic" />
                <span className="link_name">Setting</span>
              </a>
              <span className="t-tip">Setting</span>
            </li>
          </div>

          <div className="profile">
            <FaUserCircle className="ic" />
            <span className="profile_name">{username}</span>
            <BiLogOut id="logout" onClick={logout} />
          </div>
        </div>
        <div  className={classnames("home_content",{active : open} )}>
          <div className="text">Home Content</div>
        </div>
      </body>
      <footer></footer>
    </>
  ) : (
    <div></div>
  );
}

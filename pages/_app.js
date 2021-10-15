import "../styles/globals.css";
import "../styles/login.css";
import "../styles/home.css";
import "../styles/product.css";
import "../styles/board.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies, { set } from "js-cookie";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import jwt from "jsonwebtoken";
import Router from "next/router";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const Verify = async () => {
      await verifyToken();
      if (!Cookies.get("auth")) {
        setAuth(false);
        Router.push("/");
        <Link to="/"></Link>;
      }else{

      }

      if (navigator.onLine) {
        await setOnline(navigator.onLine);
      } else {
        await setOnline(false);
      }

      return await Pages();
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
          setAuth(true);
        }
      });
  };

  const Pages = () => {
    if (Cookies.get("token")) {
      if (auth) {
        return (
          <>
            <Sidebar>
              <Component {...pageProps} />
            </Sidebar>
          </>
        );
      } else {
        return (
          <>
            <div>Loading...</div>
          </>
        );
      }
    } else {
      return <Login />;
    }
  };

  return Pages();
}

export default MyApp;

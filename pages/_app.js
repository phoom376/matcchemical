import "../styles/globals.css";
import "../styles/company.css";
import "../styles/login.css";
import "../styles/home.css";
import "../styles/product.css";
import "../styles/board.css";
import "../styles/dashboard.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies, { set } from "js-cookie";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = async () => {
   
    if (Cookies.get("token")) {
      await setToken(Cookies.get("token"));
      // window.location.reload(false);
    }
  };

  const Pages = () => {
    if (token !== "") {
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
          <Login />
        </>
      );
    }
  };

  return Pages();
}

export default MyApp;

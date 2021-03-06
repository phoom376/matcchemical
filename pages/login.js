import axios from "axios";
import "../styles/login.module.css";
import Router from "next/router";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import Link from "next/link";
import dayjs from "dayjs";
const Swal = require("sweetalert2");
import Head from "next/head";

const Login = () => {
  const [now, setNow] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [online, setOnline] = useState(true);

  const server = "https://userlogapi.herokuapp.com";
  // const server = "https://www.matchchemical.tk:57521";

  useEffect(() => {
    const Verify = async () => {
      await cookieCheck();
    };

    setInterval(() => {
      timer();
      internetCheck();
    }, 1000);

    Verify();
  }, []);

  const internetCheck = () => {
    const iCheck = navigator.onLine;
    setOnline(iCheck);
  };

  const timer = () => {
    const time = Date(Date.now);
    const tmpTime = time.split(" ");
    const Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let tmpMonth = 0;
    const day = tmpTime[2];
    const year = tmpTime[3];
    const Time = tmpTime[4];

    for (let i = 0; i < Months.length; i++) {
      if (tmpTime[1] === Months[i]) {
        tmpMonth = i + 1;
      }
    }

    const month = tmpMonth;
    setNow(day + "/" + month + "/" + year + " " + Time);
  };

  const cookieCheck = async () => {
    const token = await cookie.get("token");
    if (token) {
      await Router.push("/dashboard");
      // await (<Link to="/dashboard" />);
      // window.close();
      // window.location.reload(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((email, password) !== "") {

      const wait = Swal.fire({
        title: "PLEASE WAIT!",
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        await axios
          .post(`${server}/login`, {
            email: email,
            password: password,
          })
          .then((res) => {
            if (res.data.message) {
              wait.close();
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: res.data.message,
              });
            } else {
              wait.close();
              cookie.set("token", res.data.token);
              Router.push("/dashboard");
              // <Link to="/dashboard" />;
              // window.location.reload(true);
              // window.close();
              // window.location.reload(false);
            }
          });
      } catch (err) {
        wait.close();

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ERROR : " + err,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pleas Input Email And Password",
      });
    }
  };

  const login = () => {
    return (
      <div className="center">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          <title>MATCHCHEMICAL</title>
          <link rel="icon" href="/new2.png" />
        </Head>
        <div className="main">
          <div className="login-form">
            <div className="logo-box">
              <img className="logo" src="./new2.png"></img>
            </div>
            <div className="form-box">
              <div className="title">
                <p id="logo">MATCHCHEMICAL</p>
                <p>Sign in</p>
              </div>
              <form onSubmit={handleSubmit}>
                <p style={{ fontWeight: "bold" }}>DateTime: {now}</p>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="email"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="mt-4">
                  <button className="btn-login" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  if (online) {
    return login();
  } else {
    return (
      <div className="center">
        <h1 style={{ color: "white", fontWeight: "bold" }}>
          PLEASE CONNECT INTERNET
        </h1>
      </div>
    );
  }
};

export default Login;

import axios from "axios";
import "../styles/login.module.css";
import Router from "next/router";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import Link from "next/link";
import dayjs from "dayjs";
const Swal = require("sweetalert2");

const Login = () => {
  const [now, setNow] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMeesage] = useState("");
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const Verify = async () => {
      await cookieCheck();
      if (navigator.onLine) {
        setOnline(navigator.onLine);
      } else {
        setOnline(false);
      }
    };

    setInterval(() => {
      timer();
    }, 1000);

    Verify();
  }, []);

  const timer = () => {
    const time = dayjs();
    setNow(time.format("YYYY/MM/DD hh:mm:ss"));
  };

  const cookieCheck = async () => {
    const token = await cookie.get("token");
    if (token) {
      Router.push("/home");
      <Link to="/home" />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((email, password) !== "") {
      console.log("Login");
      try {
        axios
          .post("https://userlogapi.herokuapp.com/login", {
            email: email,
            password: password,
          })
          .then(async (res) => {
            if (res.data.message) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: res.data.message,
              });
            } else {
              await Swal.fire({
                title: "PLEASE WAIT!",
                timer: 500,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
              setMeesage("");

              await cookie.set("token", res.data.token);
              await Router.push("/home");
            }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setMeesage("Pleas Input Email And Password");
    }
  };

  const login = () => {
    if (cookie.get("token")) {
      return <div></div>;
    } else {
      return (
        <div className="center">
          <div className="main">
            <div className="login-form">
              <div className="logo-box">
                <img
                  className="logo"
                  src="https://sv1.picz.in.th/images/2021/10/21/uiSpTu.png"
                ></img>
              </div>
              <div className="form-box">
                <div className="title">
                  <p id="logo">MATCHCHEMICAL</p>
                  <p>Sign in</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <p style={{ fontWeight: "bold" }}>DateTime: {now}</p>
                  <p style={{ color: "red" }}>{message}</p>
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
    }
  };
  if (online) {
    return login();
  } else {
    return <div>OFFLINE PLEASE CONNECT INTERNET</div>;
  }
};

export default Login;

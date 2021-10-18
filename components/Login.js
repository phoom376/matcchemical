import axios from "axios";
import "../styles/login.module.css";
import Router from "next/router";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import Link from "next/link";

const Login = () => {
  const [timers, setTimers] = useState();
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

    Verify();
  }, []);

  const cookieCheck = async () => {
    const token = await cookie.get("token");
    if (token) {
      Router.push("/home");
      <Link to="/home" />;
    } else {
      timer();
    }
  };

  const timer = () => {
    setInterval(() => {
      const time = new Date();

      const newTime =
        time.getFullYear() +
        "/" +
        time.getMonth() +
        "/" +
        time.getDay() +
        " " +
        time.toLocaleTimeString();

      setTimers(newTime);
    }, 1000);
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
          .then((res) => {
            if (res.data.message) {
              setMeesage(res.data.message);
            } else {
              setMeesage("");
              cookie.set("token", res.data.token);
              Router.push("/home");
              <Link to="/home" />;
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
              <div className="logo-box" >
                <img className="logo" src="https://www.img.in.th/images/278dc6880042d3e3b752ce0b330cd482.png"></img>
              </div>
              <div className="form-box">
                <div className="title">
                  <p>MATCHCHEMICAL</p>
                  <p>Sign in</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <p style={{ fontWeight: "bold" }}>{timers}</p>
                  <p style={{ color: "red" }}>{message}</p>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      type="text"
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
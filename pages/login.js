import axios from "axios";
import "../styles/login.module.css";
import Router from "next/router";
import { useEffect, useState } from "react";
import cookie from "js-cookie";

export default function Login() {
  const [timers, setTimers] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMeesage] = useState("");
  const [online, setOnline] = useState(false);
  const time = new Date();

  console.log(time.getUTCMinutes() + 1);
  useEffect(() => {
    cookieCheck();
    if (navigator.onLine) {
      setOnline(navigator.onLine);
    } else {
      setOnline(false);
    }
  }, []);

  const cookieCheck = async () => {
    const token = await cookie.get("token");
    if (token) {
      Router.push("/home");
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
          .post("http://localhost:4001/login", {
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
        <div>
          <div className="main">
            <h1>LoginPage</h1>

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
              <button className="btn btn-outline-primary" type="submit">
                Login
              </button>
            </form>
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
}

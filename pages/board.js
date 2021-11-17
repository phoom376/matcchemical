import axios from "axios";
import { useEffect, useState } from "react";
import Boards from "../components/boards";
import Company from "../components/company";
import Cookies, { set } from "js-cookie";
import jwt from "jsonwebtoken";
export default function Board() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState([]);
  const [select, setSelect] = useState("");
  const [comId, setComId] = useState("");
  const [getAll, setGetAll] = useState(false);
  // const server = "https://boardapi.herokuapp.com";
  const server = "https://www.matchchemical.tk:57524";

  // const usServer = "https://userlogapi.herokuapp.com";
  const usServer = "https://www.matchchemical.tk:57521";

  useEffect(() => {
    const Verify = async () => {
      await getCompany();
      await getBoardCompany();

      // await getBoard();
    };
    // console.log(getAll);
    const gProduct = setInterval(() => {
      // if (select !== "") {
      //   getBoardCompany();
      // }

      // getBoard();

      Verify();
    }, 1000);

    return () => {
      clearInterval(gProduct);
    };
  }, [boards]);

  const getBoard = (all) => {
    axios.get(`${server}/boards`).then((res) => {
      setBoards(res.data);
      setGetAll(all);
    });
  };
  const getCompany = () => {
    axios.get(`${usServer}/company`).then((res) => {
      setCompany(res.data);
    });
  };
  const getBoardCompany = async () => {
    // console.log("get");
    const tmpToken = await Cookies.get("token");
    const decode = await jwt.decode(tmpToken);
    await setComId(decode.c_id);
    if (!decode.c_id) {
      setLoading(false);
      if (select !== "") {
        await axios
          .post(`${server}/getBoardCompany`, { c_id: select })
          .then((res) => {
            if (res.data) {
              setBoards(res.data);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      }
    } else {
      await axios
        .post(`${server}/getBoardCompany`, { c_id: decode.c_id })
        .then((res) => {
          if (res.data) {
            setBoards(res.data);
            setLoading(false);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div>
        {/* <h1>Board Page</h1> */}
        <div className="box_board">
          <div>
            {comId === null && (
              <>
                {/* <button
                  className="btn btn-outline-primary"
                  onClick={() => getBoard(!getAll)}
                >
                  SHOW ALL
                </button> */}
                <Company
                  Company={company}
                  setSelect={setSelect}
                  getBoardCompany={getBoardCompany}
                />
              </>
            )}

            {boards !== 0 && (
              <div style={{ textAlign: "center" }}>
                <Boards boards={boards} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

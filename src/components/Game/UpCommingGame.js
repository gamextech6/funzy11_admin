import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import Header from "../comman/Header";
import "./UpCommingGame.css";
import { Link } from "react-router-dom";
import { fetchAllMatchData } from "../../api";

function UpCommingGame() {
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchAllMatchData();
        console.log(result.response.items);
        setMatchData(result.response.items);
        // Do something with the result
      } catch (error) {
        // Handle errors
      }
    };

    fetchDataFromApi();
  }, []);
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column bg-white">
            <div id="content">
            <nav
                  className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
                  style={{ height: "80px" }}
                >
                  <ul className="navbar-nav text-black">
                    <h4
                      className="ml-2"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "30px",
                        fontWeight: "400",
                      }}
                    >
                      Up Coming Match List
                    </h4>
                  </ul>
                </nav>
              <div className="container-fluid bg-white">
                <div className="row g-4">
                {matchData.map((match) => (
                      <div key={match.match_id} className="col-12">
                        <div className="card shadow p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <img src={match.teama.logo_url} alt="" width="70" />
                            <h5 className="card-title mb-0">
                              {match.teama.short_name}
                            </h5>
                            <h5
                              className="time text-danger"
                              style={{
                                border: "2px solid rgba(255, 0, 0, 0.1)",
                                borderRadius: "50px",
                                padding: "5px",
                                width: "272.93px",
                                height: "44.88px",
                                backgroundColor: "rgba(255, 0, 0, 0.1)",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: "1%",
                                fontSize: "12px",
                              }}
                            >
                              {match.date_start_ist}
                            </h5>
                            <h5 className="card-title mb-0">
                              {match.teamb.short_name}
                            </h5>
                            <img src={match.teamb.logo_url} alt="" width="70" />
                            <Link
                              to={`/post-pool-prize/${match.match_id}`}
                              state={match}
                              className="btn"
                              style={{
                                backgroundColor: "#16A341",
                                color: "#fff",
                              }}
                            >
                              Post Poll For This Match
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2023</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </body>
    </div>
  );
}

export default UpCommingGame;

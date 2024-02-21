import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import "./UpCommingGame.css";
import { Link } from "react-router-dom";
import { fetchLiveMatches } from "../../api";

function LiveMatches() {
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchLiveMatches();
        console.log(result.liveMatches);
        setMatchData(result.liveMatches);
      } catch (error) {
        // Handle errors
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <div>
      <body id="page-top">
        <div id="wrapper" className="row m-0">
          <div className="col-lg-2 col-xl-2 col-md-2 col-sm-2 p-0">
            <Sidebar />
          </div>
          <div className="col-lg-10 col-xl-10 col-md-10 col-sm-10 p-0">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content bg-white">
                <nav
                  className="navbar navbar-expand navbar-light bg-white topbar static-top shadow"
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
                      Live Match List
                    </h4>
                  </ul>
                </nav>
                <div className="container-fluid p-5 bg-white">
                  <div className="row g-4">
                    {matchData.map((match) => (
                      <div key={match.match_id} className="col-12">
                        <div className="card shadow p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <img src={match.teama_logo} alt="" width="70" />
                            <h5 className="card-title mb-0">
                              {match.teama_name}
                            </h5>
                            <p
                              className="timeBorder time text-danger pt-3"
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
                              {match.startdatetime}
                            </p>
                            <h5 className="card-title mb-0">
                              {match.teamb_name}
                            </h5>
                            <img src={match.teamb_logo} alt="" width="70" />
                            <Link
                              to={`/post-pool-prize/${match.match_id}`}
                              className="btn btn-success"
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
                    <span>
                      Copyright &copy; Your Website {new Date().getFullYear()}
                    </span>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </body>
    </div>
  );
}

export default LiveMatches;

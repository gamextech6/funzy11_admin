import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import "./UpCommingGame.css";
import { Link } from "react-router-dom";
import { fetchCompletedMatches, updateFantasyPoint } from "../../api";

function CompletedMatches() {
  const [matchData1, setMatchData1] = useState([]);
  const [matchData2, setMatchData2] = useState([]);

  const handleFantasyPoint = async (match_id) => {
    try {
      await updateFantasyPoint(match_id);
      window.location.reload();
    } catch (error) {
      console.error("Error in Updating Fantasy Point:", error);
    }
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchCompletedMatches();
        console.log(result);
        setMatchData1(result.completedMatches);
        setMatchData2(result.fullyCompletedMatches);
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
          <div className="col-lg-10 col-xl-10 col-md-10 col-sm-10 p-0 bg-white">
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
                      Completed Match List
                    </h4>
                  </ul>
                </nav>
                <div className="container-fluid pt-2 bg-white">
                  <div className="row g-4">
                    {matchData1.map((match) => (
                      <div className="col-12 mb-2">
                        <div className="card shadow p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <img src={match.teama_logo} alt="" width="70" />
                            <h5 className="card-title mb-0">
                              {match.teama_name}
                            </h5>
                            <h5
                              className=" time text-danger pt-3"
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
                            </h5>{" "}
                            <h5 className="card-title mb-0">
                              {match.teamb_name}
                            </h5>
                            <img src={match.teamb_logo} alt="" width="70" />
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleFantasyPoint(match.match_id)}
                            >
                              POINTS NOT UPDATED
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {matchData2.map((match) => (
                      <div className="col-12 mb-2">
                        <div className="shadow p-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <img src={match.teama_logo} alt="" width="70" />
                            <h5 className="card-title mb-0">
                              {match.teama_name}
                            </h5>

                            <h5 className="timeBorder time text-danger pt-3">
                              {match.startdatetime}
                            </h5>
                            <h5 className="card-title mb-0">
                              {match.teamb_name}
                            </h5>
                            <img src={match.teamb_logo} alt="" width="70" />
                            <button
                              type="button"
                              className="btn btn-success ml-3 mr-3"
                              onClick={() => handleFantasyPoint(match.match_id)}
                              disabled
                            >
                              POINTS UPDATED
                            </button>
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

export default CompletedMatches;

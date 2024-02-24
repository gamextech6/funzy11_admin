import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import Header from "../comman/Header";
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
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column bg-white">
            <div id="content">
              <div class="card shadow">
                <div class="card-body">
                  <h3 className="pl-3">Completed Match List</h3>
                </div>
              </div>
              <div className="container-fluid p-5">
                <div className="row g-4">
                  <div className="col-12 mb-4">
                    <div
                      className="table-container"
                      style={{ overflowX: "auto" }}
                    >
                      {matchData1.map((match) => (
                        <div className="col-12 mb-4">
                          <div className="card shadow p-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <img src={match.teama_logo} alt="" width="70" />
                              <h5 className="card-title mb-0">
                                {match.teama_name}
                              </h5>
                              <h5 className="timeBorder time text-danger pt-3">
                                {match.startdatetime}
                              </h5>{" "}
                              <h5 className="card-title mb-0">
                                {match.teamb_name}
                              </h5>
                              <img src={match.teamb_logo} alt="" width="70" />
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() =>
                                  handleFantasyPoint(match.match_id)
                                }
                              >
                                POINTS NOT UPDATED
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                        {matchData2.map((match) => (
                          <div className="col-12 mb-4">
                              <div className="shadow p-3">
                                  <div className="d-flex justify-content-between align-items-center">
                                  
                                      <img
                                        src={match.teama_logo}
                                        alt=""
                                        width="70"
                                      />
                                      <h5 className="card-title mb-0">{match.teama_name}</h5>
                                    
                                    <h5 className="timeBorder time text-danger pt-3">
                                      {match.startdatetime}
                                    </h5>
                                      <h5 className="card-title mb-0">{match.teamb_name}</h5>
                                      <img
                                        src={match.teamb_logo}
                                        alt=""
                                        width="70"
                                      />
                                    <button
                                      type="button"
                                      className="btn btn-success ml-3 mr-3"
                                      onClick={() =>
                                        handleFantasyPoint(match.match_id)
                                      }
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

                  <div className="col-12 mb-4">
                    <div
                      className="table-container"
                      style={{ overflowX: "auto" }}
                    ></div>
                  </div>
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
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </body>
    </div>
  );
}

export default CompletedMatches;

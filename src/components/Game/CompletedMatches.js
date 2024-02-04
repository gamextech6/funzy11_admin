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
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <div
                      className="table-container"
                      style={{ overflowX: "auto" }}
                    >
                      <div className="row">
                        <div className="col">
                          <h5 className="pb-2 mb-0">
                            Completed Matches But Fantasy Point and Prize not
                            Updated
                          </h5>
                        </div>
                      </div>
                      <div className="matchcontainer">
                        {matchData1.map((match) => (
                          <div className="match">
                            <div className="matchcenter">
                              <div className="matchlefts">
                                <img src={match.teama_logo} alt="" width="40" />
                                <h5>{match.teama_name}</h5>
                              </div>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() =>
                                  handleFantasyPoint(match.match_id)
                                }
                              >
                                Update Fantasy Point
                              </button>
                              <div className="matchrights">
                                <h5>{match.teamb_name}</h5>
                                <img src={match.teamb_logo} alt="" width="40" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-4">
                    <div
                      className="table-container"
                      style={{ overflowX: "auto" }}
                    >
                      <div className="row">
                        <div className="col">
                          <h5 className="pb-2 mb-0">
                            All Completed Matches List
                          </h5>
                        </div>
                      </div>
                      <div className="matchcontainer">
                        {matchData2.map((match) => (
                          <Link
                            to={`/list-of-posted-poll-prize/${match.match_id}`}
                            key={match.match_id}
                          >
                            <div className="match">
                              <div className="matchcenter">
                                <div className="matchlefts">
                                  <img
                                    src={match.teama_logo}
                                    alt=""
                                    width="40"
                                  />
                                  <h5>{match.teama_name}</h5>
                                </div>
                                <p
                                  className="time"
                                  style={{ color: "rgb(225, 0, 0)" }}
                                >
                                  {match.startdatetime}
                                </p>
                                <div className="matchrights">
                                  <h5>{match.teamb_name}</h5>
                                  <img
                                    src={match.teamb_logo}
                                    alt=""
                                    width="40"
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
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

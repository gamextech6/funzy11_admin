import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import Header from "../comman/Header";
import "./UpCommingGame.css";
import { Link } from "react-router-dom";
import { fetchLiveMatches } from "../../api";


function LiveMatches() {
  const [matchData, setmatchData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchLiveMatches();
        console.log(result.liveMatches);
        setmatchData(result.liveMatches);
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
                  <div className="col-lg-12 mb-4">
                    <div
                      className="table-container"
                      style={{ overflowX: "auto" }}
                    >
                      <div className="row">
                        <div className="col">
                          <h5 className="pb-2 mb-0">
                            All Live Matches List
                          </h5>
                        </div>
                      </div>
                      <div className="matchcontainer">
                        {matchData.map((match) => (
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

export default LiveMatches;

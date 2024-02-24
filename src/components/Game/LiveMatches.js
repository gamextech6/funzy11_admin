import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import Header from "../comman/Header";
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
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column bg-white">
            <div id="content">
              <div class="card shadow">
                <div class="card-body">
                  <h3 className="pl-3">Live Match List</h3>
                </div>
              </div>
              <div className="container-fluid p-5">
                <div className="row g-4">
                  {matchData.map((match) => (
                    <div key={match.match_id} className="col-12">
                      <div className="card shadow p-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <img src={match.teama_logo} alt="" width="70" />
                          <h5 className="card-title mb-0">{match.teama_name}</h5>
                          <p className="timeBorder time text-danger pt-3">
                            {match.startdatetime}
                          </p>
                          <h5 className="card-title mb-0">{match.teamb_name}</h5>
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
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </body>
    </div>
  );
}

export default LiveMatches;

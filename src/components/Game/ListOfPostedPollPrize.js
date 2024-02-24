//not in use

import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import Header from "../comman/Header";
import { useParams, Link } from "react-router-dom";
import { fetchPoolContestData, deletePoolContest } from "../../api";
import "./UpCommingGame.css";
import "../dashboard/Dashboard.css";
import "./sb-admin-2.min.css";

function ListOfPostedPollPrize() {
  const { matchId } = useParams();
  const [poolData, setPoolData] = useState(null);

  const fetchData = async (matchId) => {
    try {
      const result = await fetchPoolContestData(matchId);
      console.log(result.data);
      setPoolData(result.data);
    } catch (error) {
      // Handle errors here, if needed
    }
  };

  const deleteContest = async (contestId) => {
    try {
      const result = await deletePoolContest(contestId);
      console.log(result);
      window.location.reload();
      // Handle the result as needed
    } catch (error) {
      // Handle errors here, if needed
    }
  };

  const navigateToOtherPage = async (contestId) => {
    window.location.href = `/add-rank-price/${contestId}`;
  };

  useEffect(() => {
    fetchData(matchId);
  }, [matchId]);

  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column bg-white">
            <div id="content">
              <Header />
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 mb-4 col-sm-12">
                    <div
                      className="table-container"
                      style={{ overflowX: "auto" }}
                    >
                      <div className="row">
                        <div className="col">
                          <h5 className="pb-2 mb-0">Posted Pool List</h5>
                        </div>
                      </div>
                      <hr />
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Match ID</th>
                              <th>Entry Fee</th>
                              <th>Total Spots</th>
                              <th>Done Spots</th>
                              <th>Price Pool</th>
                              <th>Winning Spots</th>
                            </tr>
                          </thead>
                          <tbody>
                            {poolData &&
                              poolData.map((pool) => (
                                <tr key={pool._id}>
                                  <td>{pool.match_id}</td>
                                  <td>{pool.entry_fee}</td>
                                  <td>{pool.total_spots}</td>
                                  <td>{pool.done_spots}</td>
                                  <td>{pool.price_pool}</td>
                                  <td>{pool.winning_spots}</td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() =>
                                        deleteContest(pool._id)
                                      }
                                    >
                                      Delete contest
                                    </button>
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={() =>
                                        navigateToOtherPage(pool._id)
                                      }
                                    >
                                      Add Rank & Price List
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default ListOfPostedPollPrize;


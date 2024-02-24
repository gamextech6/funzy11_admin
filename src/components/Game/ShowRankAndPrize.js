import React, { useState, useEffect } from "react";
import Sidebar from "../comman/Sidebar";
import Modal from "react-modal";
import { useParams, Link } from "react-router-dom";
import { getRankPrice, fetchPoolContestData } from "../../api";
Modal.setAppElement("#root");

function ShowRankAndPrize() {
  const { contest_id } = useParams();
  const { matchId } = useParams();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [rankPrize, setRankPrice] = useState(null);
  const [poolData, setPoolData] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Add any other necessary logic after closing the modal
  };

  const fetchPoolData = async (matchId) => {
    try {
      const result = await fetchPoolContestData(matchId);
      setPoolData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  useEffect(() => {
    const fetchData = async (contest_id) => {
      try {
        const result = await getRankPrice(contest_id);
        console.log(result);
        setRankPrice(result);
      } catch (error) {
        // Handle errors
      }
    };
    fetchData(contest_id);
  }, [contest_id]);

  const navigateToOtherPage = async (contestId) => {
    // Fetch pool data before navigating
    await fetchPoolData(contestId);
    // Now you can use poolData to access pool details
    window.location.href = `/add-rank-price/${contestId}`;
  };

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
                      Post Pool Prize
                    </h4>
                  </ul>
                </nav>
              <div className="container-fluid p-2">
                <div className="row">
                  <div className="col-lg-12 mb-4 col-sm-12">
                    <div className="card shadow p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <img alt="" width="70" />
                        <h5 className="card-title mb-0">teama_s_n</h5>
                        <h5 className="timeBorder time text-danger pt-3">
                          date Time
                        </h5>
                        <h5 className="card-title mb-0">teamb_s_n</h5>
                        <img alt="" width="70" />
                        <Link to={`/post-pool-prize/${matchId}`} className="btn btn-success">
                          Add Another Pool Prize
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 mb-4 col-sm-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-12 mb-4 col-sm-12">
                            <button
                              type="button"
                              className="btn"
                              style={{
                                backgroundColor: "#924ACD",
                                color: "#fff",
                              }}
                              onClick={() => navigateToOtherPage(contest_id)}
                            >
                              Edit 
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4 col-sm-12">
                <div className="card shadow">
                  <div
                    className="card-body p-3"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <p className="card-title pb-2 mb-0">
                      List Of Rank And Prize
                    </p>
                    <hr />
                    <div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Rank</th>
                            <th>Prize</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rankPrize && rankPrize.data ? (
                            Object.entries(rankPrize.data).map(
                              ([rank, price]) => (
                                <tr key={rank}>
                                  <td>{rank}</td>
                                  <td>₹{price}</td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr>
                              <td colSpan="2">No data available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="API Response Modal"
          style={{
            content: {
              width: "25%", // Set the width as you need
              height: "25%", // Set the height as you need
              margin: "auto", // Center the modal horizontally
              backgroundColor: "lightblue", // Set the background color
              borderRadius: "8px", // Set border-radius for rounded corners
              padding: "20px", // Set padding
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Set overlay color with some transparency
            },
          }}
        >
          <h2>Successful</h2>
          <p>Rank & Price Added Successfully</p>
          <button onClick={closeModal} style={{ width: "100px" }}>
            Ok
          </button>
        </Modal>
      </body>
    </div>
  );
}

export default ShowRankAndPrize;

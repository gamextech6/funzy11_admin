import React, { useState, useEffect } from "react";
import Sidebar from "../comman/Sidebar";
import "./UpCommingGame.css";
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import {
  postPrizePool,
  fetchPoolContestData,
  editPoolContest,
  deletePoolContest,
} from "../../api";
import Modal from "react-modal";
Modal.setAppElement("#root");

function PostPrizePool() {
  const [matchData, setMatchData] = useState({});
  const location = useLocation();
  console.log(location.state.teama.logo_url);
  localStorage.setItem("teamaLogo", location.state?.teama.logo_url);
  localStorage.setItem("teamaName", location.state?.teama.short_name);
  localStorage.setItem("startTime", location.state?.date_start_ist);
  localStorage.setItem("teambLogo", location.state?.teamb.logo_url);
  localStorage.setItem("teambName", location.state?.teamb.short_name);
  useEffect(() => {
    setMatchData(location.state);
  }, [location.state]);

  const { matchId } = useParams();
  const [formData, setFormData] = useState({
    prizePool: "",
    entryFee: "",
    totalSpots: "",
    winningPrize: "",
  });
  const [poolData, setPoolData] = useState(null);

  const [editFormData, setEditFormData] = useState({
    prizePool: "",
    entryFee: "",
    totalSpots: "",
    winningPrize: "",
  });

  const fetchData = async (matchId) => {
    try {
      const result = await fetchPoolContestData(matchId);
      setPoolData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContest = async (contestId) => {
    try {
      await deletePoolContest(contestId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToOtherPage = async (contestId) => {
    // localStorage
    window.location.href = `/add-rank-price/${contestId}`;
  };

  useEffect(() => {
    fetchData(matchId);
  }, [matchId]);

  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const newErrors = {};
    if (!formData.prizePool) newErrors.prizePool = "Prize Pool is required";
    if (!formData.entryFee) newErrors.entryFee = "Entry Fee is required";
    if (!formData.totalSpots) newErrors.totalSpots = "Total Spots is required";
    if (!formData.winningPrize)
      newErrors.winningPrize = "Winning Prize is required";

    // If there are errors, set them and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      // Make API call
      const response = await postPrizePool({
        match_id: matchId,
        price_pool_percent: parseInt(formData.prizePool),
        entry_fee: parseInt(formData.entryFee),
        total_spots: parseInt(formData.totalSpots),
        winning_spots_precent: parseInt(formData.winningPrize),
      });
      // Handle the API response here if needed
      console.log("API Response:", response);
      fetchData(matchId);
      setApiResponse(response);

      // Open the modal on successful response
      setIsModalOpen(true);
      setFormData({
        prizePool: "",
        entryFee: "",
        totalSpots: "",
        winningPrize: "",
      });
      setErrors({});
    } catch (error) {
      // Handle API error
      console.error("API Error:", error);
    }
  };

  console.log(matchData);

  const closeModal = () => {
    // Close the modal and reset the API response
    setIsModalOpen(false);
    setApiResponse(null);
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
                    Post Poll Prize
                  </h4>
                </ul>
              </nav>
              <div className="container-fluid p-4 bg-white">
                  <div className="row">
                    <div className="col-lg-12 mb-4 col-sm-12">
                      <div className="card shadow p-3">
                        <div className="d-flex justify-content-between align-items-center ml-5 mr-5">
                          <img
                            src={matchData?.teama?.logo_url}
                            alt=""
                            width="70"
                          />
                          <h5 className="card-title mb-0">
                            {matchData?.teama?.short_name}
                          </h5>
                          <h5
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
                            {matchData?.date_start_ist}
                          </h5>
                          <h5 className="card-title mb-0">
                            {matchData?.teamb?.short_name}
                          </h5>
                          <img
                            src={matchData?.teamb?.logo_url}
                            alt=""
                            width="70"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid bg-white">
                  <div className="row">
                    <div className="col-lg-12 mb-4 col-sm-12">
                      <div className="card shadow m-2">
                        <div className="card-body">
                          <form
                            className="login-form"
                            onSubmit={handleFormSubmit}
                          >
                            <div className="row">
                              <div className="col-lg-12 form-outline">
                                <label
                                  className="form-label"
                                  htmlFor="prizePool"
                                >
                                  Prize Pool Percentage
                                </label>
                                <input
                                  type="text"
                                  id="prizePool"
                                  className={`form-control ${
                                    errors.prizePool ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter a prize pool Percentage"
                                  value={formData.prizePool}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      prizePool: e.target.value,
                                    })
                                  }
                                />
                                {errors.prizePool && (
                                  <div className="invalid-feedback">
                                    {errors.prizePool}
                                  </div>
                                )}
                              </div>
                              <div className="col-lg-12 form-outline mb-4">
                                <label
                                  className="form-label"
                                  htmlFor="entryFee"
                                >
                                  Entry Fee
                                </label>
                                <input
                                  type="text"
                                  id="entryFee"
                                  className={`form-control ${
                                    errors.entryFee ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter an entry fee"
                                  value={formData.entryFee}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      entryFee: e.target.value,
                                    })
                                  }
                                />
                                {errors.entryFee && (
                                  <div className="invalid-feedback">
                                    {errors.entryFee}
                                  </div>
                                )}
                              </div>
                              <div className="col-lg-12 form-outline mb-4">
                                <label
                                  className="form-label"
                                  htmlFor="winningPrize"
                                >
                                  Winning Percentage
                                </label>
                                <input
                                  type="text"
                                  id="winningPrize"
                                  className={`form-control ${
                                    errors.winningPrize ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter winning Percentage"
                                  value={formData.winningPrize}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      winningPrize: e.target.value,
                                    })
                                  }
                                />
                                {errors.winningPrize && (
                                  <div className="invalid-feedback">
                                    {errors.winningPrize}
                                  </div>
                                )}
                              </div>
                              <div className="col-lg-12 form-outline mb-4">
                                <label
                                  className="form-label"
                                  htmlFor="totalSpots"
                                >
                                  Total Spots
                                </label>
                                <input
                                  type="text"
                                  id="totalSpots"
                                  className={`form-control ${
                                    errors.totalSpots ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter total spots"
                                  value={formData.totalSpots}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      totalSpots: e.target.value,
                                    })
                                  }
                                />
                                {errors.totalSpots && (
                                  <div className="invalid-feedback">
                                    {errors.totalSpots}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="mt-4">
                              <button
                                type="submit"
                                className="btn btn-lg"
                                style={{
                                  backgroundColor: "#924ACD",
                                  color: "#fff",
                                }}
                              >
                                Proceed
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <hr />
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

                        <div className="container-fluid p-5">
                          <div className="row g-4">
                            {poolData &&
                              poolData.map((pool) => (
                                <div key={pool._id} className="col-lg-6 mb-4">
                                  <div className="card shadow">
                                    <div className="card-body">
                                      <div
                                        className="row"
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                        }}
                                      >
                                        <div className="col-md-6">
                                          <p className="card-title">
                                            Match ID: {pool.match_id}
                                          </p>
                                          <p className="card-text">
                                            Entry Fee: {pool.entry_fee}
                                          </p>
                                          <p className="card-text">
                                            Done Spots: {pool.done_spots}
                                          </p>
                                        </div>
                                        <div className="col-md-6 pl-5">
                                          <p className="card-text">
                                            Total Spots: {pool.total_spots}
                                          </p>
                                          <p className="card-text">
                                            Price Pool: {pool.price_pool}
                                          </p>
                                          <p className="card-text">
                                            Winning Spots: {pool.winning_spots}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-between align-items-center mt-4">
                                        <button
                                          type="button"
                                          className="btn mr-5"
                                          style={{
                                            backgroundColor: "#BE3431",
                                            color: "#fff",
                                          }}
                                          onClick={() =>
                                            deleteContest(pool._id)
                                          }
                                        >
                                          Delete contest
                                        </button>
                                        <Link
                                          to={`/add-rank-price/${pool._id}`}
                                          state={pool}
                                          className="btn mr-5"
                                          style={{
                                            backgroundColor: "#924ACD",
                                            color: "#fff",
                                          }}
                                        >
                                          Rank & Prize List
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
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
          <p>Poll Posted Successfully</p>
          <button onClick={closeModal} style={{ width: "100px" }}>
            Ok
          </button>
        </Modal>
      </body>
    </div>
  );
}

export default PostPrizePool;

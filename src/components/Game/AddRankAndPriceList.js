import React, { useState, useEffect } from "react";
import Sidebar from "../comman/Sidebar";
import Modal from "react-modal";
import { useParams, Link, useLocation } from "react-router-dom";
import { addPrizeAndPoll, getRankPrice, deletePoolContest } from "../../api";
Modal.setAppElement("#root");

function AddRankAndPriceList() {
  const [teamaLogo, setTeamaLogo] = useState("");
  const [teamaName, setTeamaName] = useState();
  const [startTime, setStartTime] = useState();
  const [teambLogo, setTeambLogo] = useState();
  const [teambName, setTeambName] = useState();

  const { contest_id } = useParams();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    price: "",
  });

  const [poolData, setPoolData] = useState("");
  const location = useLocation();
  useEffect(() => {
    setPoolData(location.state);
  }, [location.state]);

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [rankPrize, setRankPrice] = useState(null);

  useEffect(() => {
    setTeamaLogo(localStorage.getItem("teamaLogo"));
    setTeamaName(localStorage.getItem("teamaName"));
    setStartTime(localStorage.getItem("startTime"));
    setTeambLogo(localStorage.getItem("teambLogo"));
    setTeambName(localStorage.getItem("teambName"));

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

  const deleteContest = async (contestId) => {
    try {
      await deletePoolContest(contestId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const newErrors = {};
    if (!formData.from) newErrors.from = "Rank from is required";
    if (!formData.price) newErrors.price = "Price is required";
    // If there are errors, set them and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Make API call
      const response = await addPrizeAndPoll({
        contest_id: contest_id,
        from: parseInt(formData.from),
        to: parseInt(formData.to),
        price: parseInt(formData.price),
      });
      // Handle the API response here if needed
      console.log("API Response:", response);

      setIsModalOpen(true);

      const updatedResult = await getRankPrice(contest_id);
      setRankPrice(updatedResult);

      setFormData({
        from: "",
        to: "",
        price: "",
      });
      setErrors({});
    } catch (error) {
      // Handle API error
      console.error("API Error:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
                      Add Rank And Prize
                    </h4>
                  </ul>
                </nav>
                <div className="container-fluid bg-white">
                  <div className="row">
                    <div className="col-lg-12 mb-2 col-sm-12">
                      <div className="card shadow p-3 mr-3 ml-3">
                        <div className="d-flex justify-content-between align-items-center ml-4 mr-4">
                          <img src={teamaLogo} alt="" width="70" />
                          <h5 className="card-title mb-0">{teamaName}</h5>
                          <h5 className="time text-danger"
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
                              }}>
                            {startTime}
                          </h5>
                          <h5 className="card-title mb-0">{teambName}</h5>
                          <img src={teambLogo} alt="" width="70" />
                          {/* <Link
                          to={ `/post-pool-prize/${poolData.match_id}` }
                          className="btn"
                          style={{
                            backgroundColor: "#16A341",
                            color: "#fff",
                          }}
                        >
                          Post Poll For This Match
                        </Link> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container-fluid p-3 bg-white">
                  <div className="row">
                    <div className="col-lg-12 mb-2 col-sm-12">
                      <div className="card shadow p-3 mr-3 ml-3">
                        <div className="d-flex justify-content-between align-items-center rounded ml-4 mr-4">
                          <h5 className="card-title text-center m-2">
                            <div className="pb-2">Match ID</div>
                            {poolData.match_id}
                          </h5>
                          <h5 className="card-title text-center mb-0">
                            <div className="pb-2">Entry Fee</div>
                            {poolData.entry_fee}
                          </h5>
                          <h5 className="card-title text-center mb-0">
                            <div className="pb-2">Total Price</div>
                            {poolData.price_pool}
                          </h5>
                          <h5 className="card-title text-center mb-0">
                            <div className="pb-2">Total Spot</div>
                            {poolData.total_spots}
                          </h5>
                          <h5 className="card-title text-center mb-0">
                            <div className="pb-2">Winning Spot</div>
                            {poolData.winning_spots}
                          </h5>
                          <h5 className="card-title text-center mb-0">
                            <div className="pb-2">Done Spot</div>
                            {poolData.done_spots}
                          </h5>
                          {/* <button
                          type="button"
                          className="btn"
                          style={{
                            backgroundColor: "#BE3431",
                            color: "#fff",
                          }}
                          onClick={() => deleteContest(poolData._id)}
                        >
                          Delete contest
                        </button> */}
                          {/* <Link
                          className="btn btn-success"
                          style={{
                            backgroundColor: "#924ACD",
                            color: "#fff",
                          }}
                          disable
                        >
                          Edit
                        </Link> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container-fluid bg-white">
                  <div className="row">
                    <div className="col-lg-12 mb-4 col-sm-12">
                      <div className="card shadow">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-lg-8 mb-4 col-sm-12">
                              <form
                                className="login-form"
                                onSubmit={handleFormSubmit}
                              >
                                <div className="form-outline mb-4">
                                  <label
                                    className="form-label"
                                    htmlFor="prizePool"
                                  >
                                    Rank From
                                  </label>
                                  <input
                                    type="text"
                                    id="prizePool"
                                    className={`form-control ${
                                      errors.from ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter rank from"
                                    value={formData.from}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        from: e.target.value,
                                      })
                                    }
                                  />
                                  {errors.from && (
                                    <div className="invalid-feedback">
                                      {errors.from}
                                    </div>
                                  )}
                                </div>
                                <div className="form-outline mb-4">
                                  <label
                                    className="form-label"
                                    htmlFor="prizePool"
                                  >
                                    Rank To
                                  </label>
                                  <input
                                    type="text"
                                    id="prizePool"
                                    className={`form-control ${
                                      errors.to ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter rank to"
                                    value={formData.to}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        to: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-outline mb-4">
                                  <label
                                    className="form-label"
                                    htmlFor="entryFee"
                                  >
                                    Price
                                  </label>
                                  <input
                                    type="text"
                                    id="entryFee"
                                    className={`form-control ${
                                      errors.price ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        price: e.target.value,
                                      })
                                    }
                                  />
                                  {errors.price && (
                                    <div className="invalid-feedback">
                                      {errors.price}
                                    </div>
                                  )}
                                </div>
                                <div className="text-lg-start mt-4 pt-2">
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
                            <div className="col-lg-4 mb-4 col-sm-12">
                              <div className="card shadow text-center">
                                <div
                                  className="card-body p-3"
                                  style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                                  }}
                                >
                                  <div>
                                    <table
                                      className="table rounded "
                                      style={{
                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                      }}
                                    >
                                      <thead>
                                        <tr>
                                          <th>Rank</th>
                                          <th>Prize</th>
                                        </tr>
                                      </thead>
                                      <tbody className="rounded">
                                        {rankPrize && rankPrize.data ? (
                                          Object.entries(rankPrize.data).map(
                                            ([rank, price]) => (
                                              <tr
                                                key={rank}
                                                style={{
                                                  backgroundColor:
                                                    "rgba(0, 0, 0, 0.05)",
                                                }}
                                                className="rounded"
                                              >
                                                <td>{rank}</td>
                                                <td>₹{price}</td>
                                              </tr>
                                            )
                                          )
                                        ) : (
                                          <tr>
                                            <td
                                              colSpan="2"
                                              style={{
                                                backgroundColor:
                                                  "rgba(0, 0, 0, 0.05)",
                                              }}
                                            >
                                              No data available
                                            </td>
                                          </tr>
                                        )}
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

export default AddRankAndPriceList;

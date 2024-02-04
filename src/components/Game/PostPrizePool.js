import React, { useState, useEffect } from "react";
import Sidebar from "../comman/Sidebar";
import Header from "../comman/Header";
import "./UpCommingGame.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  postPrizePool,
  fetchPoolContestData,
  editPoolContest,
  deletePoolContest,
} from "../../api";
import Modal from "react-modal";
Modal.setAppElement("#root");

function PostPrizePool() {
  const { matchId } = useParams();
  const [formData, setFormData] = useState({
    prizePool: "",
    entryFee: "",
    totalSpots: "",
    winningPrize: "",
  });
  const [poolData, setPoolData] = useState(null);

  const [ediFormData, setEditFormData] = useState({
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
      const result = await deletePoolContest(contestId);
      window.location.reload();
    } catch (error) {
        console.error(error);
    }
  };

  const navigateToOtherPage = async (contestId) => {
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
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 mb-4 col-sm-12">
                    <div
                      className="table-container mb-3"
                      style={{ overflowX: "auto" }}
                    >
                      <div className="row mb-3">
                        <div className="col-lg-2">
                          <h5 className="mt-2 text-center">Post Poll Prize</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 mb-4">
                          <form
                            className="login-form"
                            onSubmit={handleFormSubmit}
                          >
                            <div className="row">
                              <div className="col-lg-6 form-outline mb-4">
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
                              <div className="col-lg-6 form-outline mb-4">
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
                            </div>

                            <div className="row">
                              <div className="col-lg-6 form-outline mb-4">
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
                              <div className="col-lg-6 form-outline mb-4">
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

                            <div className="text-center text-lg-start mt-4 pt-2">
                              <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                              >
                                Proceed
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
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
                                      onClick={() => deleteContest(pool._id)}
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


// import React, { useState, useEffect } from "react";
// import Sidebar from "../comman/Sidebar";
// import Header from "../comman/Header";
// import "./UpCommingGame.css";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import {
//   postPrizePool,
//   fetchPoolContestData,
//   editPoolContest,
//   deletePoolContest,
// } from "../../api";
// import Modal from "react-modal";
// import axios from "axios";
// Modal.setAppElement("#root");

// function PostPrizePool() {
//   const { matchId } = useParams();
//   const [formData, setFormData] = useState({
//     prizePool: "",
//     entryFee: "",
//     totalSpots: "",
//     winningPrize: "",
//   });
//   const [poolData, setPoolData] = useState(null);
//   const [editingContest, setEditingContest] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     prizePool: "",
//     entryFee: "",
//     totalSpots: "",
//     winningPrize: "",
//   });

//   const fetchData = async (matchId) => {
//     try {
//       const result = await fetchPoolContestData(matchId);
//       setPoolData(result.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteContest = async (contestId) => {
//     try {
//       const result = await deletePoolContest(contestId);
//       window.location.reload();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const navigateToOtherPage = async (contestId) => {
//     window.location.href = `/add-rank-price/${contestId}`;
//   };

//   const [errors, setErrors] = useState({});
//   const [apiResponse, setApiResponse] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     if (!formData.prizePool) newErrors.prizePool = "Prize Pool is required";
//     if (!formData.entryFee) newErrors.entryFee = "Entry Fee is required";
//     if (!formData.totalSpots) newErrors.totalSpots = "Total Spots is required";
//     if (!formData.winningPrize)
//       newErrors.winningPrize = "Winning Prize is required";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await postPrizePool({
//         match_id: matchId,
//         price_pool_percent: parseInt(formData.prizePool),
//         entry_fee: parseInt(formData.entryFee),
//         total_spots: parseInt(formData.totalSpots),
//         winning_spots_precent: parseInt(formData.winningPrize),
//       });

//       console.log("API Response:", response);
//       fetchData(matchId);
//       setApiResponse(response);
//       setIsModalOpen(true);
//       setFormData({
//         prizePool: "",
//         entryFee: "",
//         totalSpots: "",
//         winningPrize: "",
//       });
//       setErrors({});
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };

//   const editContest = (contest) => {
//     setEditingContest(contest);
//     setEditFormData({
//       prizePool: contest.price_pool_percent.toString(),
//       entryFee: contest.entry_fee.toString(),
//       totalSpots: contest.total_spots.toString(),
//       winningPrize: contest.winning_spots_precent.toString(),
//     });
//     setIsModalOpen(true);
//   };

//   const handleEditFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await editPoolContest({
//         _id: editingContest._id,
//         price_pool_percent: parseInt(editFormData.prizePool),
//         entry_fee: parseInt(editFormData.entryFee),
//         total_spots: parseInt(editFormData.totalSpots),
//         winning_spots_precent: parseInt(editFormData.winningPrize),
//       });

//       console.log("Edit API Response:", response);
//       fetchData(matchId);
//       setApiResponse(response);
//       setIsModalOpen(false);
//       setEditingContest(null);
//     } catch (error) {
//       console.error("Edit API Error:", error);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setApiResponse(null);
//     setEditingContest(null);
//   };

//   useEffect(() => {
//     fetchData(matchId);
//   }, [matchId]);

//   return (
//     <div>
//       <body id="page-top">
//         <div id="wrapper">
//           <Sidebar />
//           <div id="content-wrapper" className="d-flex flex-column">
//             <div id="content">
//               <Header />
//               <div className="container-fluid">
//                 <div className="row">
//                   <div className="col-lg-12 mb-4 col-sm-12">
//                     <div
//                       className="table-container mb-3"
//                       style={{ overflowX: "auto" }}
//                     >
//                       <div className="row mb-3">
//                         <div className="col-lg-2">
//                           <h5 className="mt-2 text-center">Post Poll Prize</h5>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-lg-12 mb-4">
//                           <form
//                             className="login-form"
//                             onSubmit={handleFormSubmit}
//                           >
//                             {/* ... (form fields for posting) */}
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-12 mb-4 col-sm-12">
//                     <div
//                       className="table-container"
//                       style={{ overflowX: "auto" }}
//                     >
//                       <div className="row">
//                         <div className="col">
//                           <h5 className="pb-2 mb-0">Posted Pool List</h5>
//                         </div>
//                       </div>
//                       <hr />
//                       <div className="table-responsive">
//                         <table className="table table-bordered">
//                           <thead>
//                             <tr>
//                               <th>Match ID</th>
//                               <th>Entry Fee</th>
//                               <th>Total Spots</th>
//                               <th>Done Spots</th>
//                               <th>Price Pool</th>
//                               <th>Winning Spots</th>
//                               <th>Edit</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {poolData &&
//                               poolData.map((pool) => (
//                                 <tr key={pool._id}>
//                                   <td>{pool.match_id}</td>
//                                   <td>{pool.entry_fee}</td>
//                                   <td>{pool.total_spots}</td>
//                                   <td>{pool.done_spots}</td>
//                                   <td>{pool.price_pool}</td>
//                                   <td>{pool.winning_spots}</td>
//                                   <td>
//                                     <button
//                                       type="button"
//                                       className="btn btn-danger"
//                                       onClick={() => deleteContest(pool._id)}
//                                     >
//                                       Delete contest
//                                     </button>
//                                   </td>
//                                   <td>
//                                     <button
//                                       type="button"
//                                       className="btn btn-success"
//                                       onClick={() => editContest(pool)}
//                                     >
//                                       Edit
//                                     </button>
//                                   </td>
//                                 </tr>
//                               ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <footer className="sticky-footer bg-white">
//               <div className="container my-auto">
//                 <div className="copyright text-center my-auto">
//                   <span>Copyright &copy; Your Website 2023</span>
//                 </div>
//               </div>
//             </footer>
//           </div>
//         </div>
//         <a className="scroll-to-top rounded" href="#page-top">
//           <i className="fas fa-angle-up"></i>
//         </a>
//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={closeModal}
//           contentLabel="API Response Modal"
//           style={{
//             content: {
//               width: "25%",
//               height: "25%",
//               margin: "auto",
//               backgroundColor: "lightblue",
//               borderRadius: "8px",
//               padding: "20px",
//             },
//             overlay: {
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//             },
//           }}
//         >
//           {editingContest ? (
//             <div>
//               <h2>Edit Contest</h2>
//               <form onSubmit={handleEditFormSubmit}>
//                 {/* ... (form fields for editing) */}
//                 <button type="submit">Save Changes</button>
//               </form>
//               <button onClick={closeModal}>Cancel</button>
//             </div>
//           ) : (
//             <div>
//               <h2>Successful</h2>
//               <p>Poll Posted Successfully</p>
//               <button onClick={closeModal} style={{ width: "100px" }}>
//                 Ok
//               </button>
//             </div>
//           )}
//         </Modal>
//       </body>
//     </div>
//   );
// }

// export default PostPrizePool;


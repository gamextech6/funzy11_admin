import React, { useState, useEffect } from "react";
import Sidebar from "../comman/Sidebar";
import Modal from "react-modal";
import Header from "../comman/Header";
import { useParams } from "react-router-dom";
import { addPrizeAndPoll, getRankPrice } from "../../api";
Modal.setAppElement("#root");

function AddRankAndPriceList() {
  const { contest_id } = useParams();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [rankPrize, setRankPrice] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Add any other necessary logic after closing the modal
  };
  useEffect(() => {
    const fetchData = async (contest_id) => {
      try {
        const result = await getRankPrice(contest_id);
        console.log(result)
        setRankPrice(result);
      } catch (error) {
        // Handle errors
      }
    };
    fetchData(contest_id);
  }, []);

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
      
      openModal();
      
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
                  <div className="col-lg-6 mb-4 col-sm-12">
                    <div
                      className="table-container mb-3"
                      style={{ overflowX: "auto" }}
                    >
                      <div className="row mb-3">
                        <div className="col">
                          <h5 className="mt-2">Add Rank And Prize</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 mb-4">
                          <form
                            className="login-form"
                            onSubmit={handleFormSubmit}
                          >
                            <div className="form-outline mb-4">
                              <label className="form-label" htmlFor="prizePool">
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
                              <label className="form-label" htmlFor="prizePool">
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
                              {/* {errors.to && <div className="invalid-feedback">{errors.to}</div>} */}
                            </div>
                            <div className="form-outline mb-4">
                              <label className="form-label" htmlFor="entryFee">
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
                  <div className="col-lg-6 mb-4 col-sm-12">
                    <div
                      className="table-container"
                      style={{ overflowX: "auto" }}
                    >
                      <div className="row">
                        <div className="col">
                          <h5 className="pb-2 mb-0">List Of Rank And Price</h5>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <div>
                          {rankPrize && rankPrize.data ? (
                            <div>
                              <h3>{rankPrize.message}</h3>
                              <ul>
                                {console.log(rankPrize.data)}
                                {Object.entries(rankPrize.data).map(
                                  ([rank, price]) => (
                                    <li key={rank}>
                                       {rank}: ₹{price}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          ) : (
                            <p>No data available</p>
                          )}
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

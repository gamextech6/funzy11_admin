import React, { useState } from "react";
import Sidebar from "../comman/Sidebar";
import Modal from "react-modal";
import Header from "../comman/Header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { sendNotificationToAll } from "../../api";

function AllUserNotification() {
  // const { contest_id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Add any other necessary logic after closing the modal
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.message) newErrors.message = "Message is required";

    // If there are errors, set them and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      // Make API call
      const response = await sendNotificationToAll({
        title: parseInt(formData.title), // Convert to integer
        message: parseInt(formData.message),
      });

      // Handle the API response here if needed
      console.log("API Response:", response);

      // Display the modal on successful response
      openModal();

      setFormData({
        title: "",
        message: "",
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
              <div className="card shadow">
                <div className="card-body row p-3">
                  <div className="col-lg-9">
                    <h5 className="mt-2">Add Notification To All User</h5>
                  </div>
                  <div className="col-lg-3">
                    <Link
                      className="text-white btn btn-primary btn-lg"
                      to={`/list-of-all-notification`}
                    >
                      List Of All Notification
                    </Link>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row mt-4">
                      <div className="col-lg-12 mb-4">
                        <div className="card shadow">
                          <div className="card-body">
                            <form
                              className="login-form"
                              onSubmit={handleFormSubmit}
                            >
                              <div className="form-outline mb-4">
                                <label
                                  className="form-label"
                                  htmlFor="prizePool"
                                >
                                  Title
                                </label>
                                <input
                                  type="text"
                                  id="prizePool"
                                  className={`form-control ${
                                    errors.title ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter title"
                                  value={formData.title}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      title: e.target.value,
                                    })
                                  }
                                />
                                {errors.title && (
                                  <div className="invalid-feedback">
                                    {errors.title}
                                  </div>
                                )}
                              </div>
                              <div className="form-outline mb-4">
                                <label
                                  className="form-label"
                                  htmlFor="entryFee"
                                >
                                  Message
                                </label>
                                <input
                                  type="text"
                                  id="entryFee"
                                  className={`form-control ${
                                    errors.message ? "is-invalid" : ""
                                  }`}
                                  placeholder="Enter message"
                                  value={formData.message}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      message: e.target.value,
                                    })
                                  }
                                />
                                {errors.message && (
                                  <div className="invalid-feedback">
                                    {errors.message}
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
          <p>title & message Added Successfully</p>
          <button onClick={closeModal} style={{ width: "100px" }}>
            Ok
          </button>
        </Modal>
      </body>
    </div>
  );
}

export default AllUserNotification;

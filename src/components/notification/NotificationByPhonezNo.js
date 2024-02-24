import React, { useState } from "react";
import Sidebar from "../comman/Sidebar";
import Modal from "react-modal";
import Header from "../comman/Header";
import { Link } from "react-router-dom";
import { sendNotificationToSpecificUser } from "../../api";

function NotificationByPhonezNo() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    title: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await sendNotificationToSpecificUser({
        phoneNumber: formData.phoneNumber,
        title:formData.title, // Convert to integer
        message:formData.message,
      });
      console.log("API Response:", response);
      openModal();
      setFormData({
        phoneNumber: "",
        title: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      console.error("API Error:", error);
    }
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
                   <div className="col-lg-9">
                  <ul className="navbar-nav text-black">
                    <h4
                      className="ml-2"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "30px",
                        fontWeight: "400",
                      }}
                    >
                     Add Notification By Phone No.{" "}
                    </h4>
                  </ul>
                  </div>
                </nav>
              <div className="card shadow m-5">
                <div className="card-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group mb-4">
                      <label htmlFor="prizePool">Phone No.</label>
                      <input
                        type="text"
                        id="prizePool"
                        className={`form-control ${
                          errors.phoneNumber ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Phone No."
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                      {errors.phoneNumber && (
                        <div className="invalid-feedback">
                          {errors.phoneNumber}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="entryFee">Title</label>
                      <input
                        type="text"
                        id="entryFee"
                        className={`form-control ${
                          errors.title ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: e.target.value,
                          })
                        }
                      />
                      {errors.title && (
                        <div className="invalid-feedback">{errors.title}</div>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="entryFee">Message</label>
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
                        <div className="invalid-feedback">{errors.message}</div>
                      )}
                    </div>
                    <div className="text-lg-start mt-4 pt-2">
                      <button type="submit" className="btn btn-lg" style={{
                                    backgroundColor: "#924ACD",
                                    color: "#fff",
                                  }}>
                        Proceed
                      </button>
                    </div>
                  </form>
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
          <p>Title & Message Added Successfully</p>
          <button onClick={closeModal} style={{ width: "100px" }}>
            Ok
          </button>
        </Modal>
      </body>
    </div>
  );
}

export default NotificationByPhonezNo;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../comman/Sidebar';
import Header from '../comman/Header';
import { getUserByPhoneNo, blockUser, unblockUser } from "../../api";

const UserDetails = ({ match }) => {
  const { phoneNumber } = useParams();
  const [phoneNo, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [balance, setBalance] = useState("");
  const [userNa, setUserName] = useState("");
  const [dob, setDob] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const handlegetUserByPhoneNo = async (phoneNumber) => {
    try {
      const result = await getUserByPhoneNo(phoneNumber);
      console.log(result);

      const [user] = result.data;
      setPhoneNumber(user?.phoneNumber);
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setGender(user?.gender);
      setReferrerCode(user?.referrerCode);
      setBalance(user?.balance);
      setUserName(user?.userName);
      setDob(user?.dob);
      setIsBlocked(user?.blocked);
      setIsActive(user?.isActive);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleToggleBlockUser = async () => {
    try {
      if (isBlocked) {
        await unblockUser(phoneNo);
      } else {
        await blockUser(phoneNo);
      }
      setIsBlocked(!isBlocked);
    } catch (error) {
      console.error("Error toggling user block status:", error);
    }
  };

  useEffect(() => {
    handlegetUserByPhoneNo(phoneNumber);
  }, []);

  return (
    <div className="card">
      <body id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" className="bg-white">
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
                    User Details
                  </h4>
                </ul>
              </nav>

              <div
                className="mt-5"
                style={{ marginRight: "200px", marginLeft: "100px" }}
              >
                <div className="row">
                  <div className="col-lg-12 mb-4 col-sm-12">
                    <div
                      className="table-container"
                      style={{ overflowX: "auto" }}
                    >
                      <table
                        className="table text-center align-items-center rounded border "
                        style={{ padding: "2rem", paddingTop: "2rem" }}
                      >
                        <tbody>
                          <tr
                            className="align-items-center"
                            style={{ height: "70px" }}
                          >
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                              className="mt-4"
                            >
                              Phone Number{" "}
                            </td>
                            {phoneNo && (
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                {phoneNo}
                              </td>
                            )}
                          </tr>

                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              First Name{" "}
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              {firstName == null || undefined
                                ? "-"
                                : firstName}
                            </td>
                          </tr>
                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Last Name{" "}
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              {lastName == null || undefined ? "-" : lastName}
                            </td>
                          </tr>

                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Email ID{" "}
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              {gender == null || undefined ? "-" : gender}
                            </td>
                          </tr>

                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Available Balance
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              {balance == null || undefined ? "-" : balance}
                            </td>
                          </tr>
                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Active / Inactive
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              {isActive ? "Active" : "Inactive"}
                            </td>
                          </tr>
                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Block / Unblock
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              <button
                                type="button"
                                className={`btn ${isBlocked ? "btn-success" : "btn-danger"
                                  }`}
                                onClick={handleToggleBlockUser}
                              >
                                {isBlocked ? "Unblock" : "Block"}
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="sticky-footer fixed-bottom bg-white">
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
      </body>
    </div>
  );
};

export default UserDetails;

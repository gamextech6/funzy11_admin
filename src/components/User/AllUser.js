import React, { useEffect, useState } from 'react'
import Sidebar from '../comman/Sidebar';
import Header from '../comman/Header';
import { getAllUser, blockUser, unblockUser, getUserByPhoneNo } from "../../api";
import { Link } from 'react-router-dom';

function AllUser() {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [balance, setBalance] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [phoneNo, setPhoneNo] = useState();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState();
  const [errors, setErrors] = useState({});

  const handelSearch = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!phoneNo) newErrors.phoneNo = "Phone number is required";
    // If there are errors, set them and stop form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const result = await getUserByPhoneNo(phoneNo);
      console.log(result);
      const [user] = result.data;
      setPhoneNumber(user?.phoneNumber);
      setBalance(user?.balance);
      setIsBlocked(user?.blocked);
      // Clear previous errors
      setErrors({});
      // Process the result as needed
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAllUser = async (pageNo) => {
    try {
      const result = await getAllUser(pageNo);
      console.log(result.totalpage);
      setUserData(result.allUser);
      settotalPage(result.totalpage);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleUnblockUser = async (phoneNumber) => {
    try {
      await unblockUser(phoneNumber);
      window.location.reload();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleBlockUser = async (phoneNumber) => {
    try {
      await blockUser(phoneNumber);
      window.location.reload();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      handleAllUser(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      handleAllUser(previousPage);
    }
  };

  useEffect(() => {
    handleAllUser(currentPage);
  }, [currentPage]);

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
                      All Users List{" "}
                    </h4>
                  </ul>

                  <form class="form-inline my-2 my-lg-0" style={{ marginLeft: "55%" }}>
                    <div>
                      <input
                        class={`form-control mr-sm-2 ${errors.phoneNo ? "is-invalid" : ""}`}
                        type="text"
                        placeholder="Enter phone no."
                        aria-label="Search"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />
                      {errors.phoneNo && (
                        <div className="invalid-feedback">{errors.phoneNo}</div>
                      )}
                    </div>

                    <button class="btn btn-outline-success my-2 my-sm-0" onClick={handelSearch} type="submit">Search</button>
                  </form>
                </nav>
                <div className="container text-center p-4">
                  <div className="row">
                    <div className="col-lg-12 mb-4 col-sm-12">
                      <div
                        className="table-container"
                        style={{ overflowX: "auto" }}
                      >
                        <div className="d-flex text-muted">
                          <table
                            className="table  shadow"
                            style={{
                              border: "1px solid #EAECF0",
                              borderRadius: "20px",
                            }}
                          >
                            <thead style={{ backgroundColor: "#F9FAFB" }}>
                              <tr style={{ backgroundColor: "#F9FAFB" }}>
                                <th
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "400",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  Phone Number
                                </th>
                                <th
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "400",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  Available Balance
                                </th>
                                <th
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "400",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  Block / Unblock
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              { phoneNumber == null ? <>{userData.map((row) => (
                                <tr
                                  key={row.id}
                                  className="text-center align-items-center"
                                >
                                  <td
                                    style={{
                                      padding: "1.5rem",
                                      paddingTop: "1.5rem",
                                    }}
                                  >
                                    <Link
                                      className="text-black"
                                      to={`/user-details/${row.phoneNumber}`}
                                    >
                                      +91 {row.phoneNumber}
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      padding: "1.5rem",
                                      paddingTop: "1.5rem",
                                      paddingLeft: "12%",
                                    }}
                                    className="text-left"
                                  >
                                    {" "}
                                    Rs {row.balance}
                                  </td>
                                  <td className="pt-3">
                                    {row.blocked ? (
                                      <button
                                        type="button"
                                        className="btn"
                                        style={{
                                          border: "2px solid #109E38",
                                          color: "#109E38",
                                        }}
                                        onClick={() =>
                                          handleUnblockUser(row.phoneNumber)
                                        }
                                      >
                                        Unblock
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn px-4"
                                        style={{
                                          border: "2px solid #BE3431",
                                          color: "#BE3431",
                                        }}
                                        onClick={() =>
                                          handleBlockUser(row.phoneNumber)
                                        }
                                      >
                                        Block
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                              <td>
                                {" "}
                                <nav>
                                  <ul className="pagination d-flex" style={{ justifyContent: "center", width: "200%" }}>
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                      <a className="page-link" href="#" onClick={handlePreviousPage}>Previous</a>
                                    </li>
                                    {Array.from(Array(totalPage).keys()).map((page) => (
                                      <li key={page} className="page-item">
                                        <a className={`page-link ${currentPage === page + 1 ? 'active' : ''}`} onClick={() => handleAllUser(page + 1)} href="#">
                                          {page + 1}
                                        </a>
                                      </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
                                      <a className="page-link" href="#" onClick={handleNextPage}>Next</a>
                                    </li>
                                  </ul>
                                </nav>
                              </td></>  : <tr className="text-center align-items-center">
                                  <td
                                    style={{
                                      padding: "1.5rem",
                                      paddingTop: "1.5rem",
                                    }}
                                  >
                                    <Link
                                      className="text-black"
                                      to={`/user-details/${phoneNumber}`}
                                    >
                                      +91 {phoneNumber}
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      padding: "1.5rem",
                                      paddingTop: "1.5rem",
                                      paddingLeft: "12%",
                                    }}
                                    className="text-left"
                                  >
                                    {" "}
                                    Rs {balance}
                                  </td>
                                  <td className="pt-3">
                                    {isBlocked ? (
                                      <button
                                        type="button"
                                        className="btn"
                                        style={{
                                          border: "2px solid #109E38",
                                          color: "#109E38",
                                        }}
                                        onClick={() =>
                                          handleUnblockUser(phoneNumber)
                                        }
                                      >
                                        Unblock
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn px-4"
                                        style={{
                                          border: "2px solid #BE3431",
                                          color: "#BE3431",
                                        }}
                                        onClick={() =>
                                          handleBlockUser(phoneNumber)
                                        }
                                      >
                                        Block
                                      </button>
                                    )}
                                  </td>
                                </tr> }
                              
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
      </body>
    </div>
  )
}

export default AllUser
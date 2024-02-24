import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from '../comman/Sidebar';
import Header from '../comman/Header';
import { getTotalUser } from "../../api";

function Dashboard() {
  const [totalUser, setTotalUser] = useState("");
  const [totalBlockUser, setTotalBlockUser] = useState("");
  const [totalActiveUser, setTotalActiveUser] = useState("");
  const handleTotalUserCount = async (event) => {
    try {
      const result = await getTotalUser();
      console.log(result);
      setTotalUser(result.allUserCount);
      setTotalBlockUser(result.blockedCount);
      setTotalActiveUser(result.activeCount)

    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    handleTotalUserCount();
  }, []);

  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <div></div>
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column bg-white">
            <div id="content bg-white" >
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
                    Hello, Welcome to Funzy Dashboard
                  </h4>
                </ul>
              </nav>
              <div className="container-fluid bg-white">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1
                    className="h5 mb-0 text-gray-800"
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "25px",
                      fontWeight: "400",
                    }}
                  >
                    User Details
                  </h1>
                </div>
                <div className="row">
                  <div className="col-xl-9 col-md-6 mb-4">
                    <div className="card shadow h-100 py-2">
                      <div className="row">
                        <div className="col-xl-1 col-md-1 mb-2 mt-2 text-center">
                          {/* <div className="vertical-divider"></div> */}
                        </div>
                        <div className="col-xl-3 col-md-2 mb-2 mt-2 text-center">
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "25px",
                              fontWeight: "600",
                            }}
                          >
                            {totalUser}
                          </div>
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            Total No Of Users
                          </div>
                        </div>
                        <div className="col-xl-1 col-md-1 mb-2 mt-2 text-center">
                          <div className="vertical-divider"></div>
                        </div>

                        <div className="col-xl-3 col-md-3 mb-2 text-center mt-2">
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "25px",
                              fontWeight: "600",
                            }}
                          >
                            {totalActiveUser}
                          </div>
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            Active Users
                          </div>
                        </div>
                        <div className="col-xl-1 col-md-1 mb-2 mt-2 text-center">
                          <div className="vertical-divider"></div>
                        </div>
                        <div className="col-xl-3 col-md-3 mb-2 text-center mt-2">
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "25px",
                              fontWeight: "600",
                            }}
                          >
                            {totalBlockUser}
                          </div>
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            Blocked Users
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1
                    className="h5 mb-0 text-gray-800"
                    style={{
                      fontFamily: "poppins",
                      fontSize: "25px",
                      fontWeight: "400",
                    }}
                  >
                    Earnings
                  </h1>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-md-6 mb-4">
                    <div className="card shadow h-100 py-2">
                      <div className="row">
                        <div className="col-xl-1 col-md-4 mb-4 mt-2 text-center align-items-center">
                          {/* <div className="vertical-divider"></div> */}
                        </div>
                        <div className="col-xl-2 col-md-2 mb-2 mt-2 text-center">
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "25px",
                              fontWeight: "600",
                            }}
                          >
                            5K
                          </div>
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            Today Earning
                          </div>
                        </div>
                        <div className="col-xl-1 col-md-1 mb-2 mt-2 text-center">
                          <div className="vertical-divider"></div>
                        </div>

                        <div className="col-xl-2 col-md-2 mb-2 text-center mt-2">
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "25px",
                              fontWeight: "600",
                            }}
                          >
                            15K
                          </div>
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            Weekly Earning
                          </div>
                        </div>
                        <div className="col-xl-1 col-md-1 mb-2 mt-2 text-center">
                          <div className="vertical-divider"></div>
                        </div>
                        <div className="col-xl-2 col-md-2 mb-2 text-center mt-2">
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "25px",
                              fontWeight: "600",
                            }}
                          >
                            40K
                          </div>
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            Monthly Earning
                          </div>
                        </div>
                        <div className="col-xl-1 col-md-1 mb-2 mt-2 text-center">
                          <div className="vertical-divider"></div>
                        </div>
                        <div className="col-xl-2 col-md-2 mb-2 text-center mt-2">
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "25px",
                              fontWeight: "600",
                            }}
                          >
                            215K
                          </div>
                          <div
                            style={{
                              fontFamily: "Poppins",
                              fontSize: "18px",
                              fontWeight: "400",
                              color: "gray",
                            }}
                          >
                            Annual Earning
                          </div>
                        </div>
                      </div>
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
  )
}

export default Dashboard;

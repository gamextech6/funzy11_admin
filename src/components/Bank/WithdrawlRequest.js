import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import { Link } from "react-router-dom";
import { userWithdrawlRequest, rejectWithdrawl } from "../../api";

function WithdrawalRequest() {
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await userWithdrawlRequest();
        console.log(result.requests);
        setRequestData(result.requests);
      } catch (error) {
        // Handle errors
      }
    };

    fetchDataFromApi();
  }, []);
  const handleRejectWithdrawl = async (withdrawlID) => {
    try {
      await rejectWithdrawl(withdrawlID);
      window.location.reload();
    } catch (error) {
      console.error("Error Aprove Withdrawl:", error);
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
                  <ul className="navbar-nav text-black">
                    <p
                      className="ml-2"
                      style={{
                        fontFamily: "poppins",
                        fontSize: "28.8px",
                        fontWeight: "400",
                        lineHeight: "50.4px",
                        color: "#232D42CC",
                      }}
                    >
                      Withdrawal Request List
                    </p>
                  </ul>
                </nav>
                <div className="container mt-5 bg-white">
                  <div className="row">
                    <div className="col-lg-12 mb-4 col-sm-12">
                      <div className="card-body">
                        <table
                          className="table text-center align-items-center rounded shadow border"
                          style={{ padding: "1.5rem", paddingTop: "1.5rem" }}
                        >
                          <thead
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            <tr>
                              <th
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Phone Number
                              </th>
                              <th
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Available Balance
                              </th>
                              <th
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Requested Amount
                              </th>
                              <th
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Reject
                              </th>
                              <th
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Approve
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {requestData.map((request) => (
                              <tr key={request.id}>
                                <td
                                  style={{
                                    padding: "1.5rem",
                                    paddingTop: "1.5rem",
                                  }}
                                >
                                  +91 {request.phoneNumber}
                                </td>
                                <td
                                  style={{
                                    padding: "1.5rem",
                                    paddingTop: "1.5rem",
                                  }}
                                >
                                  {request.balance}
                                </td>
                                <td
                                  style={{
                                    padding: "1.5rem",
                                    paddingTop: "1.5rem",
                                  }}
                                >
                                  {request.amount}
                                </td>
                                <td
                                  style={{
                                    padding: "1.5rem",
                                    paddingTop: "1.5rem",
                                  }}
                                >
                                  <Link
                                    onClick={() =>
                                      handleRejectWithdrawl(requestData?._id)
                                    }
                                    className="btn btn-danger ml-3 mr-3"
                                    // style={{
                                    //   backgroundColor: "#BE3431",
                                    //   color: "#fff",
                                    // }}
                                  >
                                    Reject
                                  </Link>
                                </td>
                                <td
                                  style={{
                                    padding: "1.5rem",
                                    paddingTop: "1.5rem",
                                  }}
                                >
                                  <Link
                                    to={`/withdrawal-requests-detail/${request.id}`}
                                    className="btn btn-success"
                                    style={{
                                      backgroundColor: "#00A233",
                                      color: "#fff",
                                    }}
                                  >
                                    Approve
                                  </Link>
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
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>
                    Copyright &copy; Your Website {new Date().getFullYear()}
                  </span>
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
}

export default WithdrawalRequest;

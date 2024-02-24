import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import { Link } from "react-router-dom";
import {
  userWithdrawlRequestByWithdrawlID,
  aproveWithdrawl,
  rejectWithdrawl,
} from "../../api";
import { useParams } from "react-router-dom";


function WithdrawalRequest() {
  const { withdrawlID } = useParams();
  const [requestData, setRequestData] = useState({});

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await userWithdrawlRequestByWithdrawlID(withdrawlID);
        const data = JSON.parse(result);
        console.log(data.withdrawalRequest);
        setRequestData(data.withdrawalRequest);
      } catch (error) {
        // Handle errors
      }
    };

    fetchDataFromApi();
  }, [withdrawlID]);

  const handleAproveWithdrawl = async (withdrawlID) => {
    try {
      await aproveWithdrawl(withdrawlID);
      window.location.reload();
    } catch (error) {
      console.error("Error Aprove Withdrawl:", error);
    }
  };

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
                      Bank Details
                    </p>
                  </ul>
                </nav>
                <div className="container mt-5 bg-white">
                  <div className="row">
                    <div className="col-lg-12 mb-4 col-sm-12">
                      <div>
                        <table
                          className="table text-center align-items-center rounded shadow border"
                          style={{ padding: "1.5rem", paddingTop: "1.5rem" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                className="mt-4"
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Phone Number
                              </td>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                {requestData?.phoneNumber}
                              </td>
                            </tr>

                            <tr>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Bank Name
                              </td>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                {requestData?.bankName}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Branch Name
                              </td>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                {requestData?.branchName}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Account Holder Name
                              </td>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                {requestData?.accountHolderName}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Bank Account Number
                              </td>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                {requestData?.bankAccountNumber}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                IFSC Code
                              </td>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                {requestData?.ifscCode}
                              </td>
                            </tr>
                            <tr>
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
                                {requestData?.balance}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                Requested Amount
                              </td>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                {requestData?.amount}
                              </td>
                            </tr>
                            <tr>
                              {requestData.status === "pending" ? (
                                <>
                                  <td
                                    style={{
                                      padding: "1.5rem",
                                      paddingTop: "1.5rem",
                                    }}
                                  >
                                    Take Action
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
                                      className="btn mr-4"
                                      to="/withdrawal-requests"
                                      style={{
                                        backgroundColor: "#BE3431",
                                        color: "#fff",
                                      }}
                                    >
                                      Reject
                                    </Link>
                                    <Link
                                      onClick={() =>
                                        handleAproveWithdrawl(requestData?._id)
                                      }
                                      to="/withdrawal-requests"
                                      className="btn mr-4"
                                      style={{
                                        backgroundColor: "#00A233",
                                        color: "#fff",
                                      }}
                                    >
                                      Approve
                                    </Link>{" "}
                                  </td>
                                </>
                              ) : requestData.status === "approved" ? (
                                <>
                                  <td
                                    style={{
                                      padding: "1.5rem",
                                      paddingTop: "1.5rem",
                                    }}
                                  >
                                    Status
                                  </td>
                                  <td
                                    style={{
                                      padding: "1.5rem",
                                      paddingTop: "1.5rem",
                                    }}
                                  >
                                    <Link
                                      onClick={() =>
                                        handleAproveWithdrawl(requestData?._id)
                                      }
                                      to="/withdrawal-requests"
                                      className="btn disabled"
                                      style={{
                                        backgroundColor: "#00A233",
                                        color: "#fff",
                                      }}
                                    >
                                      Approved
                                    </Link>{" "}
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td
                                    style={{
                                      padding: "1.5rem",
                                      paddingTop: "1.5rem",
                                    }}
                                  >
                                    Take Action
                                  </td>
                                  <td
                                    style={{
                                      padding: "1.5rem",
                                      paddingTop: "1.5rem",
                                    }}
                                  >
                                    <Link
                                      onClick={() =>
                                        handleAproveWithdrawl(requestData?._id)
                                      }
                                      to="/withdrawal-requests"
                                      className="btn"
                                      style={{
                                        backgroundColor: "#00A233",
                                        color: "#fff",
                                      }}
                                    >
                                      Approve
                                    </Link>{" "}
                                  </td>
                                </>
                              )}
                            </tr>
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

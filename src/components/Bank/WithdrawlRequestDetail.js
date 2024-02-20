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
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await userWithdrawlRequestByWithdrawlID(withdrawlID);
        const data = JSON.parse(result);
        console.log(data.withdrawalRequest);
        setRequestData(data.withdrawalRequest);
        setBalance(data.balance || 0);
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
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <div class="card shadow">
                <div class="card-body">
                  <h3 className="pl-3">Withdrawal Request List </h3>
                </div>
              </div>
              <div className="container mt-5">
                <div className="row">
                  <div className="col-lg-12 mb-4 col-sm-12">
                    <div className="card">
                      <div className="card-body">
                        <table
                          className="table text-center align-items-center rounded shadow border"
                          style={{ padding: "2rem", paddingTop: "2rem" }}
                        >
                          <tbody>
                            <tr>
                              <td className="mt-4">Phone Number</td>
                              <td>{requestData?.phoneNumber}</td>
                            </tr>

                            <tr>
                              <td>Bank Name</td>
                              <td>{requestData?.bankName}</td>
                            </tr>
                            <tr>
                              <td>Branch Name</td>
                              <td>{requestData?.branchName}</td>
                            </tr>
                            <tr>
                              <td>Account Holder Name</td>
                              <td>{requestData?.accountHolderName}</td>
                            </tr>
                            <tr>
                              <td>Bank Account Number</td>
                              <td>{requestData?.bankAccountNumber}</td>
                            </tr>
                            <tr>
                              <td>IFSC Code</td>
                              <td>{requestData?.ifscCode}</td>
                            </tr>
                            <tr>
                              <td>Withdrawal Done</td>
                              <td>
                                {requestData?.withdrawl_done ? "Yes" : "No"}
                              </td>
                            </tr>
                            <tr>
                              <td>Available Balance</td>
                              <td>{balance}</td>
                            </tr>
                            <tr>
                              <td>Requested Amount</td>
                              <td>{requestData?.amount}</td>
                            </tr>
                            <tr>
                              <td> Take Action</td>
                              <td>
                                {requestData.status == "pending" ? (
                                  <div>
                                    {" "}
                                    <Link
                                      onClick={() =>
                                        handleRejectWithdrawl(requestData?._id)
                                      }
                                      className="btn btn-danger mr-3"
                                      to="/withdrawal-requests"
                                    >
                                      Reject
                                    </Link>
                                    <Link
                                      onClick={() =>
                                        handleAproveWithdrawl(requestData?._id)
                                      }
                                      to="/withdrawal-requests"
                                      className="btn btn-success"
                                    >
                                      Approve
                                    </Link>{" "}
                                  </div>
                                ) : requestData.status == "approved" ? (
                                  <div>
                                    {" "}
                                    <Link
                                      onClick={() =>
                                        handleRejectWithdrawl(requestData?._id)
                                      }
                                      className="btn btn-danger mr-3 disabled"
                                      to="/withdrawal-requests"
                                    
                                    >
                                      Reject
                                    </Link>
                                    <Link
                                      onClick={() =>
                                        handleAproveWithdrawl(requestData?._id)
                                      }
                                      to="/withdrawal-requests"
                                      className="btn btn-success disabled"
                                    >
                                      Approve
                                    </Link>{" "}
                                  </div>
                                ) : (
                                  <div>
                                    {" "}
                                    <Link
                                      onClick={() =>
                                        handleRejectWithdrawl(requestData?._id)
                                      }
                                      className="btn btn-danger mr-3 disabled"
                                      to="/withdrawal-requests"
                                    >
                                      Reject
                                    </Link>
                                    <Link
                                      onClick={() =>
                                        handleAproveWithdrawl(requestData?._id)
                                      }
                                      to="/withdrawal-requests"
                                      className="btn btn-success"
                                    >
                                      Approve
                                    </Link>{" "}
                                  </div>
                                )}
                              </td>
                            </tr>
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

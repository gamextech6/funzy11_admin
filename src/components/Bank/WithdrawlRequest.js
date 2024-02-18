import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import { Link } from "react-router-dom";
import { userWithdrawlRequest } from "../../api";

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
              <div className="container-fluid p-5">
                <table className="table text-center rounded p-2">
                  <thead>
                    <tr>
                      <th>Phone Number</th>
                      <th>Available Balance</th>
                      <th>Requested Amount</th>
                      <th>Reject</th>
                      <th>Approve</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestData.map((request) => (
                      <tr key={request.id}>
                        <td>{request.phoneNumber}</td>
                        <td>{request.balance}</td>
                        <td>{request.amount}</td>
                        <td>
                          <Link
                            to={`/post-pool-prize/${request.id}`}
                            className="btn btn-danger"
                          >
                            Reject
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/post-pool-prize/${request.id}`}
                            className="btn btn-success"
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

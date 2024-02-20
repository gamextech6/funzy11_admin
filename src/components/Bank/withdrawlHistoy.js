import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import { Link } from "react-router-dom";
import { allWithdrawl } from "../../api";

function WithdrawalRequest() {
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await allWithdrawl();
        console.log(result?.withdrawlList);
        setRequestData(result?.withdrawlList);
      } catch (error) {
        // Handle errors
      }
    };

    fetchDataFromApi();
  }, []);

  const handleLogin = (id) => {
    console.log(id)
    window.location.href = `/withdrawal-requests-detail/$id`;
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
              <div className="container-fluid p-5">
                <table className="table text-center rounded p-2">
                  <thead>
                    <tr>
                      <th>Phone Number</th>
                      <th>Available Balance</th>
                      <th>Requested Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestData.map((request) => (
                      <tr key={request.id}>
                        <td>{request.phoneNumber}</td>
                        <td>{request.balance}</td>
                        <td>{request.amount}</td>
                        <td>
                          {request.status === "approved" ? (
                            <button type="button" className="btn btn-success" 
                            onClick={handleLogin(request.id)}
                            style={{
                              backgroundColor: "#00A233",
                              color: "#fff",
                            }}>
                              Approved
                            </button>
                          ) : request.status === "rejected" ? (
                            <button type="button" className="btn btn-danger" 
                            onClick={handleLogin(request.id)}
                            style={{
                              backgroundColor: "#BE3431",
                              color: "#fff",
                            }}>
                              Rejected
                            </button>
                          ) : (
                            <span>{request.status}</span>
                          )}
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

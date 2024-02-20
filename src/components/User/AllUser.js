import React, { useEffect, useState } from 'react'
import Sidebar from '../comman/Sidebar';
import Header from '../comman/Header';
import { getAllUser, blockUser, unblockUser } from "../../api";
import { Link } from 'react-router-dom';

function AllUser() {
  const [userData, setUserData] = useState([]);
  const handleAllUser = async (event) => {
    try {
      const result = await getAllUser();
      console.log(result.allUser);
      setUserData(result.allUser);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleUnblockUser = async (phoneNumber) => {
    try {
      await unblockUser(phoneNumber);
      window.location.reload();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleBlockUser = async (phoneNumber) => {
    try {
      await blockUser(phoneNumber);
      window.location.reload();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  useEffect(() => {
    handleAllUser();
  }, []);
  return (
    <div>
      <body id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex mb-4 flex-column">
            <div id="content">
            <div class="card shadow">
                <div class="card-body">
                  <h3 className="pl-3">All Users List</h3>
                </div>
              </div>
              <div className="container text-center p-5">
                <div className="row">
                  <div className='col-lg-12 mb-4 col-sm-12'>
                    <div className="table-container" style={{ overflowX: 'auto' }}>
                      <div className="d-flex text-muted">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Phone No.</th>
                              <th>Balance</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userData.map((row) => (
                              <tr  key={row.id}>
                                <td><Link to={`/user-details/${row.phoneNumber}`}>{row.phoneNumber}</Link></td>
                                <td>{row.balance}</td>
                                <td>{row.blocked ? (
                                  <button type="button" className="btn btn-success" onClick={() => handleUnblockUser(row.phoneNumber)}>
                                    Unblock
                                  </button>
                                ) : (
                                  <button type="button" className="btn btn-danger" onClick={() => handleBlockUser(row.phoneNumber)}>
                                    Block
                                  </button>
                                )}</td>
                              </tr>
                            ))}
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
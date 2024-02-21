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
            <div id="content" className='bg-white' style={{}}>
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow" style={{ height: '80px' }}>
                <ul className="navbar-nav text-black">
                  <h4 className='ml-2' style={{ fontFamily: "Poppins", fontSize: "30px", fontWeight: "400" }}>All Users List </h4>
                </ul>
              </nav>
              <div className="container text-center p-4">
                <div className="row">
                  <div className='col-lg-12 mb-4 col-sm-12'>
                    <div className="table-container" style={{ overflowX: 'auto' }}>
                      <div className="d-flex text-muted">
                        <table className="table  shadow" style={{ border: "1px solid #EAECF0", borderRadius: "20px" }}>
                          <thead style={{ backgroundColor: "#F9FAFB" }}>
                            <tr style={{ backgroundColor: "#F9FAFB" }}>
                              <th style={{ fontSize: "18px", fontWeight: "400", fontFamily: "Poppins", }}>Phone Number</th>
                              <th style={{ fontSize: "18px", fontWeight: "400", fontFamily: "Poppins", }}>Available Balance</th>
                              <th style={{ fontSize: "18px", fontWeight: "400", fontFamily: "Poppins", }}>Block / Unblock</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userData.map((row) => (
                              <tr key={row.id} className='text-center align-items-center'>
                                <td style={{ padding: "1.5rem", paddingTop: "1.5rem" }}><Link className='text-black' to={`/user-details/${row.phoneNumber}`}>+91 {row.phoneNumber}</Link></td>
                                <td style={{ padding: "1.5rem", paddingTop: "1.5rem", paddingLeft: "12%" }} className='text-left'> Rs {row.balance}</td>
                                <td className='pt-3'>{row.blocked ? (
                                  <button type="button" className="btn" style={{ border: "1px solid #109E38", color: "#109E38" }} onClick={() => handleUnblockUser(row.phoneNumber)}>
                                    Unblock
                                  </button>
                                ) : (
                                  <button type="button" className="btn px-4" style={{ border: "1px solid #BE3431", color: "#BE3431" }} onClick={() => handleBlockUser(row.phoneNumber)}>
                                    Block
                                  </button>
                                )}</td>
                              </tr>
                            ))}
                            <td> <nav>
                              <ul class="pagination d-flex" style={{justifyContent:"center", width:"200%"}}>
                                <div>
                                  <li class="page-item disabled">
                                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                                  </li>
                                </div>
                                <div style={{display:"flex", flexDirection:"row"}}>
                                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                                </div>
                                <div>
                                  <li class="page-item">
                                    <a class="page-link" href="#">Next</a>
                                  </li>
                                </div>
                              </ul>
                            </nav></td>

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
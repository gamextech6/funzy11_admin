// import React, { useEffect, useState } from "react";
// import Sidebar from "../comman/Sidebar";
// import { useParams } from "react-router-dom";
// import { fetchPoolContestData, deletePoolContest } from "../../api";

// function ListOfAllNotification() {
//   const { matchId } = useParams();
//   const [poolData, setPoolData] = useState(null);

//   const fetchData = async (matchId) => {
//     try {
//       const result = await fetchPoolContestData(matchId);
//       console.log(result.data);
//       setPoolData(result.data);
//     } catch (error) { }
//   };

//   const deleteContest = async (contestId) => {
//     try {
//       const result = await deletePoolContest(contestId);
//       console.log(result);
//       window.location.reload();
//       // Handle the result as needed
//     } catch (error) {
//       // Handle errors here, if needed
//     }
//   };

//   const navigateToOtherPage = async (contestId) => {
//     window.location.href = `/add-rank-price/${contestId}`;
//   };

//   useEffect(() => {
//     fetchData(matchId);
//   }, []);
//   return (
//     <div>
//       <body id="page-top">
//         <div id="wrapper" className="row m-0">
//           <div className="col-lg-2 col-xl-2 col-md-2 col-sm-2 p-0">
//             <Sidebar />
//           </div>
//           <div className="col-lg-10 col-xl-10 col-md-10 col-sm-10 p-0">
//             <div id="content-wrapper" className="d-flex flex-column">
//               <div id="content bg-white">
//                 <div className="container bg-white">
//                   <div className="row">
//                     <div className="col-lg-12 mb-4 col-sm-12">
//                       <div
//                         className="table-container"
//                         style={{ overflowX: "auto" }}
//                       >
//                        <nav
//                   className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
//                   style={{ height: "80px" }}
//                 >
//                   <ul className="navbar-nav text-black">
//                     <p
//                       className="ml-2"
//                       style={{
//                         fontFamily: "poppins",
//                         fontSize: "28.8px",
//                         fontWeight: "400",
//                         lineHeight: "50.4px",
//                         color: "#232D42CC",
//                       }}
//                     >
//                       List Of Specific Users Notification
//                     </p>
//                   </ul>
//                 </nav>
//                         <div className="container-fluid p-5 bg-white">
//                           <table className="table text-center rounded border p-2">
//                             <thead>
//                               <tr>
//                                 <th>Phone Number</th>
//                                 <th>Available Balance</th>
//                                 <th>Requested Amount</th>
//                                 <th>Action</th>
//                               </tr>
//                             </thead>
//                             {/* <tbody>
//                               {requestData.map((request) => (
//                                 <tr key={request.id}>
//                                   <td>{request.phoneNumber}</td>
//                                   <td>{request.balance}</td>
//                                   <td>{request.amount}</td>
//                                   <td>
//                                     {request.status === "approved" ? (
//                                       <button
//                                         type="button"
//                                         className="btn"
//                                         onClick={() => handleLogin(request._id)}
//                                         style={{
//                                           backgroundColor: "#00A233",
//                                           color: "#fff",
//                                         }}
//                                       >
//                                         Approved
//                                       </button>
//                                     ) : request.status === "rejected" ? (
//                                       <button
//                                         type="button"
//                                         className="btn"
//                                         onClick={() => handleLogin(request._id)}
//                                         style={{
//                                           backgroundColor: "#BE3431",
//                                           color: "#fff",
//                                         }}
//                                       >
//                                         Rejected
//                                       </button>
//                                     ) : (
//                                       <span>{request.status}</span>
//                                     )}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody> */}
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <a className="scroll-to-top rounded" href="#page-top">
//           <i className="fas fa-angle-up"></i>
//         </a>
//       </body>
//     </div>
//   );
// }

// export default ListOfAllNotification;


import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
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
    console.log(id);
    window.location.href = `/withdrawal-requests-detail/${id}`;
  };

  return (
    <div>
      <body id="page-top">
        <div id="wrapper" className="row m-0">
          <div className="col-lg-2 col-xl-2 col-md-2 col-sm-2 p-0">
            <Sidebar />
          </div>
          <div className="col-lg-10 col-xl-10 col-md-10 col-sm-10 p-0 bg-white">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content bg-white">
                <nav
                  className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
                  style={{ height: "80px" }}
                >
                  <ul className="navbar-nav text-black">
                    <p
                      className="ml-2"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "30px",
                        fontWeight: "400",
                      }}
                    >
                       List Of All Notification
                    </p>
                  </ul>
                </nav>
                <div className="container-fluid p-5 bg-white">
                  <table className="table text-center rounded border p-2">
                    <thead>
                      <tr>
                        <th>Notification Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {requestData.map((request) => (
                        <tr key={request.id}>
                          <td>{request.phoneNumber}</td>
                          <td>{request.balance}</td>
                          <td>{request.amount}</td>
                          <td>
                            {request.status === "approved" ? (
                              <button
                                type="button"
                                className="btn"
                                onClick={() => handleLogin(request._id)}
                                style={{
                                  backgroundColor: "#00A233",
                                  color: "#fff",
                                }}
                              >
                                Approved
                              </button>
                            ) : request.status === "rejected" ? (
                              <button
                                type="button"
                                className="btn"
                                onClick={() => handleLogin(request._id)}
                                style={{
                                  backgroundColor: "#BE3431",
                                  color: "#fff",
                                }}
                              >
                                Rejected
                              </button>
                            ) : (
                              <span>{request.status}</span>
                            )}
                          </td>
                        </tr>
                      ))} */}
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
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </body>
    </div>
  );
}

export default WithdrawalRequest;

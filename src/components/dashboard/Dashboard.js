import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from '../comman/Sidebar';
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
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                <button
                                    id="sidebarToggleTop"
                                    className="btn btn-link d-md-none rounded-circle mr-3 hide-for-small-screen   "
                                >
                                    <i className="fa fa-bars"></i>
                                </button>
                                <ul className="navbar-nav text-black">
                                    <h4 className='ml-2'>Hello, Welcome to Funzy Dashboard</h4>
                                </ul>
                            </nav>
                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h5 mb-0 text-gray-800">User Details</h1>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2 align-items-center">
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalUser}</div>
                                                        <div className="text-xs font-weight-bold text-uppercase mb-1">
                                                            Total no. of user</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalActiveUser}</div>
                                                        <div className="text-xs font-weight-bold text-uppercase mb-1">
                                                            Tatal no. of Active User</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalBlockUser}</div>
                                                        <div className="text-xs font-weight-bold text-uppercase mb-1">
                                                            Total no. of Blocked User</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h5 mb-0 text-gray-800">Earnings</h1>
                                </div>
                                <div className="row">
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                                        <div className="text-xs font-weight-bold text-uppercase mb-1">
                                                            Earnings (Monthly)</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                                        <div className="text-xs font-weight-bold text-uppercase mb-1">
                                                            Earnings (Annual)</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                    <div className="row no-gutters align-items-center">
                                                            <div className="col-auto">
                                                                <div className="h5 mb-0 ml-2 font-weight-bold text-gray-800">$15,000</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Earnings (Weak)
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                    <div className="row no-gutters align-items-center">
                                                            <div className="col-auto">
                                                                <div className="h5 mb-0 ml-2 font-weight-bold text-gray-800">$5,000</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Earnings (Today)
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col mr-2">
                                                    <div className="row">
                                                            <div className="col-auto text-center">
                                                                <div className="h5 mb-0 font-weight-bold text-gray-800" style={{justifyContent:"space-between"}}>$5,000</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Earnings (Today)
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
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
export default Dashboard;
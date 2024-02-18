import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../asset/logo.png' 
import "./style.css";


function Sidebar() {

    const [style, setStyle] = useState("navbar-nav bg-black sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };

    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    return (
        <div>
            <ul className={style} id="accordionSidebar">

                {/*  <!-- Sidebar - Brand --> */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                    <div className="sidebar-brand-icon">
                        <img src={logo} alt="Logo" style={{ width: "30px", height: "30px" }} />
                    </div>
                    <div className="sidebar-brand-text mx-3">Funzy</div>
                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                    </div>
                </a>
            
                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <a className="nav-link" href="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>

                <hr className="sidebar-divider" />

                {/* <!-- Nav Item - Charts --> */}
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/all-user">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>All User</span></Link>
                </li> */}
                <li className="nav-item colors">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUser"
                        aria-expanded="true" aria-controls="collapseUser">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Users</span>
                    </a>
                    <div id="collapseUser" className="collapse" aria-labelledby="headingUser" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/all-user">All Users</Link>
                        </div>
                    </div>
                </li>
                 <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAdminAgent"
                        aria-expanded="true" aria-controls="collapseAdminAgent">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Game</span>
                    </a>
                    <div id="collapseAdminAgent" className="collapse" aria-labelledby="headingAdminAgent" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/up-comming-game">Up Comming Game</Link>
                            <Link className="collapse-item" to="/live-matches">Live Matches</Link>
                            <Link className="collapse-item" to="/completed-matches">Completed Matches</Link>

                        </div>
                    </div>
                </li>
              <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAgent"
                        aria-expanded="true" aria-controls="collapseAgent">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Notification</span>
                    </a>
                    <div id="collapseAgent" className="collapse" aria-labelledby="headingAgent" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/notification-to-all-user">To All User</Link>
                            <Link className="collapse-item" to="/notification-to-specific-user">To Specific User</Link>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseBank"
                        aria-expanded="true" aria-controls="collapseBank">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Bank Details</span>
                    </a>
                    <div id="collapseBank" className="collapse" aria-labelledby="headingBank" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/withdrawal-requests">Withdrawal Requests</Link>
                            <Link className="collapse-item" to="/admin-bank-details">Transaction History</Link>
                        </div>
                    </div>
                </li>
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />

            </ul>
        </div>
    )
}

export default Sidebar
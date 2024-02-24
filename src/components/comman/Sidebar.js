import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../asset/logo.png';
import dashboardIcon from "../../asset/dashboardIcon.png";
import userIcon from "../../asset/userIcon.png";
import gameIcon from "../../asset/Game.png";
import notificationIcon from "../../asset/notificationIcon.png";
import bankIcon from "../../asset/bankIcon.png";
import signout from "../../asset/signOutImage.png";
import "./style.css";


function Sidebar() {

    const [style, setStyle] = useState("navbar-nav sidebar sidebar-dark accordion border");

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

    const navigateToOtherPage = () => {
        window.location.href = '/';
      };
    return (
        <div>
            <ul className={style} id="accordionSidebar">
                {/*  <!-- Sidebar - Brand --> */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                    <div className="sidebar-brand-icon">
                        <img src={logo} alt="Logo" style={{ width: "30px", height: "30px" }} />
                    </div>
                    <div className="sidebar-brand-text mx-3 text-black" style={{fontSize:"25px", fontFamily: "Poppins",}}>Funzy</div>
                </Link>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <Link className="nav-link" to="/dashboard">
                        <img
                            className="mr-2"
                            src={dashboardIcon}
                            alt="Logo"
                            style={{ width: "10%", height: "10%" }}
                        />
                        <span>Dashboard</span></Link>
                </li>
                {/* <hr className="sidebar-divider" /> */}
                <li className="nav-item colors">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUser"
                        aria-expanded="true" aria-controls="collapseUser">
                        <img
                            className="mr-2"
                            src={userIcon}
                            alt="Logo"
                            style={{ width: "9%", height: "9%" }}
                        />
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
                        <img
                            className="mr-2"
                            src={gameIcon}
                            alt="Logo"
                            style={{ width: "9%", height: "9%" }}
                        />
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
                        <img
                            className="mr-2"
                            src={notificationIcon}
                            alt="Logo"
                            style={{ width: "9%", height: "9%" }}
                        />
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
                        <img
                            className="mr-2"
                            src={bankIcon}
                            alt="Logo"
                            style={{ width: "9%", height: "9%" }}
                        />
                        <span>Bank Details</span>
                    </a>
                    <div id="collapseBank" className="collapse" aria-labelledby="headingBank" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <Link className="collapse-item" to="/withdrawal-requests">Withdrawal Requests</Link>
                            <Link className="collapse-item" to="/transaction-history">Transaction History</Link>
                        </div>
                    </div>
                </li>
                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />
                <button type="button" class="btn btn-secondary mx-2" onClick={navigateToOtherPage} style={{marginTop:"300px"}}>Log Out</button>
            </ul>
            
           
        </div>
    )
}

export default Sidebar
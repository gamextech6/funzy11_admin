import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../asset/logo.png";
import dashboardIcon from "../../asset/dashboardIcon.png";
import userIcon from "../../asset/userIcon.png";
import gameIcon from "../../asset/Game.png";
import notificationIcon from "../../asset/notificationIcon.png";
import bankIcon from "../../asset/bankIcon.png";
import signout from "../../asset/signOutImage.png";
import "./style.css";

function Sidebar() {
  return (
    <div>
      <div className=" sidebar-container d-flex navbar-nav bg-black sidebar sidebar-dark accordion p-0 m-0 w-100vw">
        <ul style={{ padding: "0px", margin: "0px" }} id="accordionSidebar">
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center mt-3"
            to="/dashboard"
          >
            <div className="col-lg-4 col-xl-4 col-md-4 col-sm-4">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "85%", height: "85%", alignItems: "center" }}
              />
            </div>
            <div className="col-lg-7 col-xl-7 col-md-7 col-sm-7 mt-2 p-0 ">
              <h2 style={{ fontSize: "2.5rem" }}>
                <b>Funzy</b>
              </h2>
            </div>
          </Link>
          <hr className="sidebar-divider mt-5 my-3 " />
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
              <img
                className="mr-2"
                src={dashboardIcon}
                alt="Logo"
                style={{ width: "10%", height: "10%" }}
              />
              {/* <i className="fas fa-fw fa-tachometer-alt"></i> */}
              <span>Dashboard</span>
            </Link>
          </li>
          <hr className="sidebar-divider " />
          <li className="nav-item colors">
            <Link
              className="nav-link collapsed"
              to="#"
              data-toggle="collapse"
              data-target="#collapseUser"
              aria-expanded="true"
              aria-controls="collapseUser"
            >
              <img
                className="mr-2"
                src={userIcon}
                alt="Logo"
                style={{ width: "9%", height: "9%" }}
              />
              <span>Users</span>
            </Link>
            <div
              id="collapseUser"
              className="collapse"
              aria-labelledby="headingUser"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white collapse-inner rounded">
                <Link className="collapse-item" to="/all-user">
                  All Users
                </Link>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              to="#"
              data-toggle="collapse"
              data-target="#collapseAdminAgent"
              aria-expanded="true"
              aria-controls="collapseAdminAgent"
            >
              <img
                className="mr-2"
                src={gameIcon}
                alt="Logo"
                style={{ width: "9%", height: "9%" }}
              />
              <span>Game</span>
            </Link>
            <div
              id="collapseAdminAgent"
              className="collapse"
              aria-labelledby="headingAdminAgent"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className="collapse-item" to="/up-comming-game">
                  Up Comming Game
                </Link>
                <Link className="collapse-item" to="/live-matches">
                  Live Matches
                </Link>
                <Link className="collapse-item" to="/completed-matches">
                  Completed Matches
                </Link>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              to="#"
              data-toggle="collapse"
              data-target="#collapseAgent"
              aria-expanded="true"
              aria-controls="collapseAgent"
            >
              <img
                className="mr-2"
                src={notificationIcon}
                alt="Logo"
                style={{ width: "9%", height: "9%" }}
              />
              <span>Notification</span>
            </Link>
            <div
              id="collapseAgent"
              className="collapse"
              aria-labelledby="headingAgent"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className="collapse-item" to="/notification-to-all-user">
                  To All User
                </Link>
                <Link
                  className="collapse-item"
                  to="/notification-to-specific-user"
                >
                  To Specific User
                </Link>
              </div>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              to="#"
              data-toggle="collapse"
              data-target="#collapseBank"
              aria-expanded="true"
              aria-controls="collapseBank"
            >
              <img
                className="mr-2"
                src={bankIcon}
                alt="Logo"
                style={{ width: "9%", height: "9%" }}
              />
              <span>Bank Details</span>
            </Link>
            <div
              id="collapseBank"
              className="collapse"
              aria-labelledby="headingBank"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className="collapse-item" to="/withdrawal-requests">
                  Withdrawal Requests
                </Link>
                <Link className="collapse-item" to="/transaction-history">
                  Transaction History
                </Link>
              </div>
            </div>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
          <Link to="/">
            <img
              className="ml-3 align-content-bottom"
              src={signout}
              alt="Sign Out"
              style={{
                width: "65%",
                height: "35%",
                paddingTop: "40%",
                cursor: "pointer",
                marginTop: "80%",
              }}
            />
          </Link>
        </ul>

        {/* <img className='mr-2' src={signout} alt="Logo" style={{ width: "15px", height: "15px" }} /> */}
      </div>
    </div>
  );
}

export default Sidebar;

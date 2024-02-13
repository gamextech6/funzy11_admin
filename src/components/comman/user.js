import React from "react";

const User = () => {
  return (
    <li className="nav-item dropdown no-arrow">
      {/* <!-- Nav Item - User Information --> */}
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
          Douglas McGee
        </span>
        <img
          className="img-profile rounded-circle"
          src="img/undraw_profile.svg"
        />
      </a>
      {/*  <!-- Dropdown - User Information --> */}
      <div
        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <div className="dropdown-divider"></div>
        <a
          className="dropdown-item"
          href="#"
          data-toggle="modal"
          data-target="#logoutModal"
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
};

export default User;

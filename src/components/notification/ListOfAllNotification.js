import React, { useEffect, useState } from "react";
import Sidebar from "../comman/Sidebar";
import { allNotification, deleteNotification } from "../../api";

function ListOfAllNotification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const result = await allNotification();
                console.log(result?.uniqueMessages);
                setNotifications(result?.uniqueMessages);
            } catch (error) {
                // Handle errors
            }
        };

        fetchDataFromApi();
    }, []);

    const handleDelete = async (message) => {
        try {
            const hi = await deleteNotification(message);
            window.location.reload();
        } catch (error) {
            console.error("Error in Deleting message:", error);
        }
    };

    const handleLogin = (id) => {
        console.log(id);
        window.location.href = `/withdrawal-requests-detail/${id}`;
    };

    const filterNotifications = (notifications) => {
        const sortedNotifications = [...notifications].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        const filteredNotifications = [];
        let prevTime = null;

        sortedNotifications.forEach((notification) => {
            const currTime = new Date(notification.createdAt);
            if (!prevTime || (currTime - prevTime) / 1000 > 10) {
                filteredNotifications.push(notification);
                prevTime = currTime;
            }
        });

        return filteredNotifications;
    };

    const filteredNotifications = filterNotifications(notifications);
    return (
        <div>
            <body id="page-top">
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column bg-white">
                        <div id="content">
                            <nav
                                className="navbar navbar-expand navbar-light bg-white topbar static-top shadow"
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
                            <div className="container-fluid pt-5 bg-white">
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
                                        {filteredNotifications.map((notification) => (
                                            <tr key={notification._id}>
                                                <td>{notification.title}</td>
                                                <td>
                                                    {new Date(
                                                        notification.createdAt
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    {new Date(
                                                        notification.createdAt
                                                    ).toLocaleTimeString()}
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        style={{
                                                            backgroundColor: "#BE3431",
                                                            color: "#fff",
                                                        }}
                                                        onClick={() => handleDelete(notification.message)}
                                                    >
                                                        Delete Message
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <footer className="sticky-footer fixed-bottom bg-white">
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
    )
}

export default ListOfAllNotification
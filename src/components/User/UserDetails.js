import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../comman/Sidebar';
import Header from '../comman/Header';
import { getUserByPhoneNo, blockUser, unblockUser } from "../../api";

const UserDetails = ({ match }) => {
    const { phoneNumber } = useParams();
    // const [userData, setUserData] = useState([]);
    const [phoneNo, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [referrerCode, setReferrerCode] = useState("");
    const [balance, setBalance] = useState("");
    const [userNa, setUserName] = useState("");
    const [dob, setDob] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);

    const handlegetUserByPhoneNo = async (phoneNumber) => {
        try {
            const result = await getUserByPhoneNo(phoneNumber);
            console.log(result);

            const [user] = result.data;
            setPhoneNumber(user?.phoneNumber);
            setFirstName(user?.firstName);
            setLastName(user?.lastName);
            setGender(user?.gender);
            setReferrerCode(user?.referrerCode);
            setBalance(user?.balance);
            setUserName(user?.userName);
            setDob(user?.dob);
            setIsBlocked(user?.blocked);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleToggleBlockUser = async () => {
        try {
            if (isBlocked) {
                await unblockUser(phoneNo);
            } else {
                await blockUser(phoneNo);
            }
            setIsBlocked(!isBlocked);
        } catch (error) {
            console.error('Error toggling user block status:', error);
        }
    };

    useEffect(() => {
        handlegetUserByPhoneNo(phoneNumber);
    }, []);

    return (
        <div>
            <body id="page-top">
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header />
                            <div className="container">
                                <div className="row">
                                    <div className='col-lg-12 mb-4 col-sm-12'>
                                        <div className="table-container" style={{ overflowX: 'auto' }}>
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="pb-2 mb-0">User Details</h5>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="">
                                                {/* Conditionally render each piece of information */}
                                                {firstName && <p><b>First Name :</b> {firstName}</p>}
                                                {lastName && <p><b>Last Name :</b> {lastName}</p>}
                                                {userNa && <p><b>User Name :</b> {userNa}</p>}
                                                {phoneNo && <p><b>Phone No. :</b> {phoneNo}</p>}
                                                {gender && <p><b>Gender :</b> {gender}</p>}
                                                {dob && <p><b>Dob :</b> {dob}</p>}
                                                {balance !== undefined && <p><b>Balance :</b> {balance}</p>}
                                                {referrerCode && <p><b>Referral code :</b> {referrerCode}</p>}
                                                <button
                                                    type="button"
                                                    className={`btn ${isBlocked ? 'btn-success' : 'btn-danger'} mx-5 px-5`}
                                                    onClick={handleToggleBlockUser}
                                                >
                                                    {isBlocked ? 'Unblock' : 'Block'}
                                                </button>
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
    );
};

export default UserDetails;




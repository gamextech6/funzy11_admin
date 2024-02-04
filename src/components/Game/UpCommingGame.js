import React, { useEffect, useState } from 'react'
import Sidebar from '../comman/Sidebar';
import Header from '../comman/Header';
import './UpCommingGame.css';
import { Link } from 'react-router-dom';
import { fetchAllMatchData } from "../../api";

function UpCommingGame() {
    const [natchData, setMatchData] = useState([]);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const result = await fetchAllMatchData();
                console.log(result.response.items);
                setMatchData(result.response.items);
                // Do something with the result
            } catch (error) {
                // Handle errors
            }
        };

        fetchDataFromApi();
    }, []);
    return (
        <div>
            <body id="page-top">
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header />
                            <div className="container-fluid">
                                <div className="row">
                                    <div className='col-lg-12 mb-4'>
                                        <div className="table-container" style={{ overflowX: 'auto' }}>
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="pb-2 mb-0">All Up Comming Game List</h5>
                                                </div>
                                            </div>

                                            <div class="matchcontainer">
                                                {natchData.map(match => (
                                                    <Link to={`/post-pool-prize/${match.match_id}`}>
                                                        <div class="match">
                                                            <div class="matchcenter">
                                                                <div class="matchlefts">
                                                                    <img src={match.teama.logo_url} alt="" width="40" />
                                                                    <h5>{match.teama.short_name}</h5>
                                                                </div>
                                                                <h5 class="time">
                                                                    <p style={{ color: "rgb(225, 0, 0)" }}>{match.date_start_ist}</p>
                                                                </h5>
                                                                <div class="matchrights">
                                                                    <h5>{match.teamb.short_name}</h5>
                                                                    <img src={match.teamb.logo_url} alt="" width="40" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="bottom mb-3">
                                                            <div class="meta">
                                                                <div class="mega">Post Poll For This Match</div>
                                                                {/* <div class="meg">
                                                                <h5 style={{ fontSize: "10px", textTransform: "uppercase" }}>₹59 crores</h5>
                                                            </div> */}
                                                            </div>
                                                            <div class="icon">
                                                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="reacticon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ fontSize: "16px" }}><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2,8 L2,22 L22,22 L22,9 M11,4 L7,8 M2,4 L2,8 L17,8 L21,4 L2,4 Z M16,4 L12,8"></path></svg><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SportsCricketOutlinedIcon" style={{ color: "rgb(89, 89, 89)", fontSize: "20px", marginLeft: "5px" }}>
                                                                    <path d="m15.04 12.79-8.5-8.5C6.35 4.1 6.09 4 5.83 4s-.51.1-.7.29L2.29 7.13c-.39.39-.39 1.03 0 1.42l8.5 8.5c.2.2.45.29.71.29.26 0 .51-.1.71-.29l2.83-2.83c.39-.4.39-1.04 0-1.43zm-3.54 2.13L4.41 7.83l1.42-1.42 7.09 7.09-1.42 1.42zm2.8412 2.8362 1.4142-1.4142 4.2426 4.2426-1.4142 1.4142zM18.5 2C16.57 2 15 3.57 15 5.5S16.57 9 18.5 9 22 7.43 22 5.5 20.43 2 18.5 2zm0 5c-.83 0-1.5-.67-1.5-1.5S17.67 4 18.5 4s1.5.67 1.5 1.5S19.33 7 18.5 7z"></path></svg>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
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

export default UpCommingGame
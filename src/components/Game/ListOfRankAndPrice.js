import React, { useEffect, useState } from 'react';
import Sidebar from '../comman/Sidebar';
import Header from '../comman/Header';
import './UpCommingGame.css';
import { useParams } from 'react-router-dom';
import { deletePoolContest, getRankPrice } from "../../api";

function ListOfRankAndPrice() {
    const { contest_id } = useParams();
    const [rankPrize, setRankPrice] = useState(null);

    useEffect(() => {
        const fetchData = async (contest_id) => {
            try {
                const result = await getRankPrice(contest_id);
                setRankPrice(result);
            } catch (error) {
                // Handle errors
            }
        };
        fetchData(contest_id);
    }, []);

    const deleteContest = async (contestId) => {
        try {
            const result = await deletePoolContest(contestId);
            console.log(result);
            window.location.reload();
            // Handle the result as needed
        } catch (error) {
            // Handle errors here, if needed
        }
    };

    const navigateToOtherPage = async (contestId) => {
        window.location.href = `/add-rank-price/${contestId}`;
    };

    return (
        <div>
            <body id="page-top">
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column bg-white">
                        <div id="content">
                            <Header />
                            <div className="container">
                                <div className="row">
                                    <div className='col-lg-12 mb-4 col-sm-12'>
                                        <div className="table-container" style={{ overflowX: 'auto' }}>
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="pb-2 mb-0">List Of Rank And Price</h5>
                                                </div>
                                            </div>
                                            <hr />
                                            <div>
                                                <div>
                                                    {rankPrize && rankPrize.data ? (
                                                        <div>
                                                            <h3>{rankPrize.data.message}</h3>
                                                            <ul>
                                                                {Object.entries(rankPrize.data.ranksAndPrices).map(([rank, price]) => (
                                                                    <li key={rank}>
                                                                        Rank {rank}: ${price}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ) : (
                                                        <p>No data available</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </body>
        </div>
    )
}

export default ListOfRankAndPrice;

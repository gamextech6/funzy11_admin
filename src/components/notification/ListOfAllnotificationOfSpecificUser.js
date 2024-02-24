import React, { useEffect, useState } from 'react';
import Sidebar from '../comman/Sidebar';
import Header from '../comman/Header';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchPoolContestData, deletePoolContest } from "../../api";



function ListOfAllnotificationOfSpecificUser() {
    const { matchId } = useParams();
    const [poolData, setPoolData] = useState(null);

    const fetchData = async (matchId) => {
        try {
            const result = await fetchPoolContestData(matchId);
            console.log(result.data);
            setPoolData(result.data);
        } catch (error) {
        }
    };

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

    useEffect(() => {
        fetchData(matchId);
    }, []);
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
                                                    <h5 className="pb-2 mb-0">List Of Notifications</h5>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="">
                                                {poolData && (
                                                    <div>
                                                        {poolData.map(pool => (
                                                            <div key={pool._id}>
                                                                <div class="card">
                                                                    <div class="card-body bg-secondary text-white">
                                                                        <p><b>Price Pool Percent:</b> {pool.price_pool_percent}</p>
                                                                        <p><b>Price Pool:</b> {pool.price_pool}</p>
                                                                        <button type="button" className="btn btn-danger" onClick={() => deleteContest(pool._id)}>
                                                                            Delete contest
                                                                        </button>
                                                                        <button type="button" className="btn btn-success" onClick={() => navigateToOtherPage(pool._id)}>
                                                                            Add Rank & Price List
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
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

export default ListOfAllnotificationOfSpecificUser
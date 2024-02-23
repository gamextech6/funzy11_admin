// api.js
import axios from 'axios';

const API_BASE_URL = 'https://crickx.onrender.com';

const handleResponse = (response) => {
  if (response.status !== 200) {
    throw new Error('Network response was not ok.');
  }
  return response.data;
};

export const loginUser = async (username, password) => {
  try {
    const requestOptions = {
      method: 'post',
      url: `${API_BASE_URL}/admin/admin-login`,
      // url: 'http://localhost:80/admin/admin-login', // Replace with your actual API endpoint
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: username,
        password: password,
      },
    };

    const response = await axios(requestOptions);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error during login.');
  }
};

export const getAllUser = async (pageNo) => {
  try {
    const requestOptions = {
      method: 'post',
      url: `${API_BASE_URL}/admin/gettotal-user?page=${pageNo}&limit=10`,
    };

    const response = await axios(requestOptions);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error registering user.');
  }
};

export const getUserByPhoneNo = async (phoneNumber) => {
  try {
    const requestOptions = {
      method: 'post',
      url: `${API_BASE_URL}/admin/getUser/${phoneNumber}`,
    };

    const response = await axios(requestOptions);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error registering user.');
  }
};

export const blockUser = async (phoneNumber) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      phoneNumber,
      blocked: true,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${API_BASE_URL}/admin/block-user`, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    throw new Error('Error blocking user.');
  }
};

export const unblockUser = async (phoneNumber) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      phoneNumber,
      blocked: false,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${API_BASE_URL}/admin/unblock-user`, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    throw new Error('Error blocking user.');
  }
};

export const getTotalUser = async () => {
  try {
    const requestOptions = {
      method: 'post',
      url: `${API_BASE_URL}/admin/gettotal-user`,
    };

    const response = await axios(requestOptions);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error registering user.');
  }
};

export const fetchAllMatchData = async () => {

  try {
    const requestOptions = {
      method: 'post',
      url: `${API_BASE_URL}/admin/seduleMatchData`,
    };

    const response = await axios(requestOptions);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error registering user.');
  }
};

export const postPrizePool = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  return fetch(`${API_BASE_URL}/admin/pool-contest`, requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.error('API Error:', error);
      throw error; // Propagate the error to the caller
    });
};

export const fetchPoolContestData = async (matchId) => {
  try {
    const requestOptions = {
      method: 'post',
      url: `${API_BASE_URL}/admin/getpool-contest/${matchId}`,
    };

    const response = await axios(requestOptions);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error registering user.');
  }
};

export const deletePoolContest = async (contestId) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "_id": contestId
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch(`${API_BASE_URL}/admin/delete-pool-contest`, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addPrizeAndPoll = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  return fetch(`${API_BASE_URL}/admin/pricerank`, requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.error('API Error:', error);
      throw error; // Propagate the error to the caller
    });
};

export const getRankPrice = async (contestId) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    contest_id: contestId,
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${API_BASE_URL}/getRankPrice`, requestOptions);
    const result = await response.json();

    // Handle the response as needed
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Propagate the error to the caller
  }
};

export const sendNotificationToAll = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  return fetch(`${API_BASE_URL}/admin/notifications/send-to-all`, requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.error('API Error:', error);
      throw error; // Propagate the error to the caller
    });
};

export const AllNotificationByPhoneNo = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  return fetch(`${API_BASE_URL}/admin/searchNotifications`, requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.error('API Error:', error);
      throw error; // Propagate the error to the caller
    });
};

export const allNotification = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${API_BASE_URL}/admin/showNotificationMessage`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error; 
  }
};

export const deleteNotification = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "message": data
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${API_BASE_URL}/admin/deleteMessage`, requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.error('API Error:', error);
      throw error; // Propagate the error to the caller
    });
};



export const sendNotificationToSpecificUser = (data) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  return fetch(`${API_BASE_URL}/admin/notifications`, requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.error('API Error:', error);
      throw error; // Propagate the error to the caller
    });
};

export const fetchCompletedMatches = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${API_BASE_URL}/admin/completedMatches`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error; 
  }
};

export const fetchLiveMatches = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${API_BASE_URL}/admin/liveMatches`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error; 
  }
};

export const updateFantasyPoint = async (match_id) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({ match_id });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${API_BASE_URL}/admin/updateFantasyPoints`, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    throw new Error('Error blocking user.');
  }
};

export const editPoolContest = async ( _id, price_pool_percent, entry_fee, total_spots, winning_spots_precent ) => {
  try {
    const requestOptions = {
      method: 'post',
      url: `${API_BASE_URL}/admin/editPoolContest`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        _id,
        price_pool_percent,
        entry_fee,
        total_spots,
        winning_spots_precent,
      },
    };
    const response = await axios(requestOptions);
    return handleResponse(response);
  } catch (error) {
    throw new Error('Error during login.');
  }
};

export const userWithdrawlRequest = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${API_BASE_URL}/admin/userWithdrawlRequest`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const userWithdrawlRequestByWithdrawlID = async (withdrawlID) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      withdrawlID
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${API_BASE_URL}/admin/userWithdrawlRequestByWithdrawlID`, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    throw new Error('Error blocking user.');
  }
};

export const aproveWithdrawl = async (withdrawlID) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      withdrawlID
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${API_BASE_URL}/admin/aproveWithdrawl`, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    throw new Error('Error blocking user.');
  }
};

export const rejectWithdrawl = async (withdrawlID) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      withdrawlID
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${API_BASE_URL}/admin/rejectWithdrawl`, requestOptions);
    const result = await response.text();
    return result;
  } catch (error) {
    throw new Error('Error blocking user.');
  }
};

export const allWithdrawl = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  };
  try {
    const response = await fetch(`${API_BASE_URL}/admin/allWithdrawl`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

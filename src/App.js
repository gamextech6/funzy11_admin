import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./components/login/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import Dashboards from "./Dashboards";
import OtpVarification from "./components/login/OtpVarification";
import AllUser from "./components/User/AllUser";
import UserDetails from './components/User/UserDetails';
import UpCommingGame from "./components/Game/UpCommingGame";
import CompletedMatches from "./components/Game/CompletedMatches";
import PostPrizePool from "./components/Game/PostPrizePool";
import ListOfPostedPollPrize from "./components/Game/ListOfPostedPollPrize";
import AddRankAndPriceList from "./components/Game/AddRankAndPriceList";
import LiveMatches from "./components/Game/LiveMatches";
import AllUserNotification from "./components/notification/AllUserNotification";
import NotificationByPhonezNo from "./components/notification/NotificationByPhonezNo";
import ListOfAllNotification from "./components/notification/ListOfAllNotification";
import ListOfAllnotificationOfSpecificUser from "./components/notification/ListOfAllnotificationOfSpecificUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Dashboards/> */}
        <Route index element={<LoginPage />} />
        <Route path="otp" element={<OtpVarification />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="all-user" element={<AllUser/>} />
        <Route path="up-comming-game" element={<UpCommingGame/>} />
        <Route path="completed-matches" element={<CompletedMatches/>} />
        <Route path="post-pool-prize/:matchId" element={<PostPrizePool/>} />
        <Route path="list-of-posted-poll-prize/:matchId" element={<ListOfPostedPollPrize/>} />
        <Route path="/user-details/:phoneNumber" element={<UserDetails />} />
        <Route path="/add-rank-price/:contest_id" element={<AddRankAndPriceList />} />
        <Route path="/live-matches" element={<LiveMatches />} />
        <Route path="/notification-to-all-user" element={<AllUserNotification/>} />
        <Route path="/notification-to-specific-user" element={<NotificationByPhonezNo/>} />
        <Route path="/list-of-all-notification" element={<ListOfAllNotification/>} />
        <Route path="/list-of-all-notification-specific-user" element={<ListOfAllnotificationOfSpecificUser/>} />
        <Route path="demo" element={<Dashboards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

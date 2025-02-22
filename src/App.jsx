import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layout/SideDrawer";
import Home from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/SignIn";
import SubmitCommission from "./pages/SubmitCommission";
import { useDispatch } from "react-redux";
import { fetchLeaderboard, fetchUser } from "./store/slices/userSlice";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import { getAllAuctionItems } from "./store/slices/auctionSlice";
import Leaderboard from "./pages/Leaderboard";
import Auctions from "./pages/Auctions";
import AuctionItem from "./pages/AuctionItem";
import CreateAuction from "./pages/CreateAuction";
import ViewMyAuctions from "./pages/ViewMyAuctions";
import ViewAuctionDetails from "./pages/ViewAuctionDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
  }, []);

  return (
    <Router>
      {/* Flex container to keep Sidebar on the left and content on the right */}
      <div className="flex h-screen">
        {/* Sidebar (fixed on the left) */}
        <div className="w-[300px] h-full fixed left-0 top-0 bg-gray-200 shadow-lg">
          <SideDrawer />
        </div>

        {/* Main Content Area */}
        <div className="ml-[300px] flex-grow overflow-auto">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/submit-commission" element={<SubmitCommission />} />
            <Route path="/how-it-works-info" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/auction/item/:id" element={<AuctionItem />} />
            <Route path="/create-auction" element={<CreateAuction />} />
            <Route path="/view-my-auctions" element={<ViewMyAuctions />} />
            <Route path="/auction/details/:id" element={<ViewAuctionDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/me" element={<UserProfile />} />
          </Routes>
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default App;

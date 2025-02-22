import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiAuctionFill, RiInstagramFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { FaFacebook, FaUserCircle, FaChevronDown } from "react-icons/fa";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-primary text-white text-3xl p-2 rounded-md hover:bg-blue-800 lg:hidden"
      >
        <GiHamburgerMenu />
      </div>

      {/* Side Drawer */}
      <div
        className={`w-full sm:w-[280px] bg-card h-full fixed top-0 ${show ? "left-0" : "left-[-100%]"} transition-all duration-200 p-4 flex flex-col justify-between lg:left-0 border-r border-border shadow-lg`}
      >
        <div className="relative">
          <Link to="/" className="text-2xl font-extrabold text-primary">
            Make a <span className="text-accent">Bid</span>
          </Link>

          {/* Navigation Links */}
          <ul className="mt-6 space-y-3">
            <li>
              <Link
                to="/auctions"
                className="flex items-center text-lg font-semibold text-foreground hover:text-accent"
              >
                <RiAuctionFill className="mr-2" /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="flex items-center text-lg font-semibold text-foreground hover:text-accent"
              >
                <MdLeaderboard className="mr-2" /> Leaderboard
              </Link>
            </li>

            {/* Conditional Dashboard Link */}
            {isAuthenticated && user?.role === "Super Admin" && (
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center text-lg font-semibold text-foreground hover:text-accent"
                >
                  <MdDashboard className="mr-2" /> Dashboard
                </Link>
              </li>
            )}

            {/* Auctioneer Menu */}
            {isAuthenticated && user?.role === "Auctioneer" && (
              <li>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-lg font-semibold text-foreground hover:text-accent w-full"
                >
                  <FaChevronDown className={`mr-2 transition ${dropdownOpen ? "rotate-180" : ""}`} />
                  Auctioneer Menu
                </button>
                {dropdownOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <Link to="/create-auction" className="flex items-center text-gray-600 hover:text-accent">
                        Create Auction
                      </Link>
                    </li>
                    <li>
                      <Link to="/view-my-auctions" className="flex items-center text-gray-600 hover:text-accent">
                        View My Auctions
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>

          {/* Authentication Buttons */}
          {!isAuthenticated ? (
            <div className="mt-6 flex gap-2">
              <Link to="/sign-up" className="btn btn-primary w-full">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-secondary w-full">
                Login
              </Link>
            </div>
          ) : (
            <div className="mt-6">
              <button onClick={handleLogout} className="btn btn-primary w-full">
                Logout
              </button>
            </div>
          )}

          <hr className="mt-6 border-t-accent" />

          {/* Profile & About Links */}
          <ul className="mt-4 space-y-3">
            {isAuthenticated && (
              <li>
                <Link to="/me" className="flex items-center text-lg font-semibold text-foreground hover:text-accent">
                  <FaUserCircle className="mr-2" /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link to="/about" className="flex items-center text-lg font-semibold text-foreground hover:text-accent">
                About Us
              </Link>
            </li>
          </ul>

          {/* Close Button */}
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[28px] sm:hidden cursor-pointer"
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex gap-2 justify-center mb-2">
            <Link to="/" className="text-gray-500 hover:text-blue-700">
              <FaFacebook className="text-2xl" />
            </Link>
            <Link to="/" className="text-gray-500 hover:text-pink-500">
              <RiInstagramFill className="text-2xl" />
            </Link>
          </div>
          <p className="text-gray-500">&copy; 2025 PrimeBid, LLC.</p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";

const Home = () => {
  const howItWorks = [
    { title: "List Your Items", description: "Sellers post items for bidding." },
    { title: "Start Bidding", description: "Place your best bid to win." },
    { title: "Win & Celebrate", description: "Highest bidder secures the deal." },
    { title: "Easy Payments", description: "Fast & secure transactions." },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <section className="w-full px-6 py-20 flex flex-col min-h-screen justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-[#0B3D91] text-4xl font-extrabold md:text-6xl">Bid with Confidence</h1>
        <h2 className="text-[#FF7F50] text-3xl font-semibold md:text-5xl mt-2">Your Next Big Win Awaits!</h2>
        <p className="text-gray-700 text-lg mt-4">Join the most transparent and thrilling online auction experience.</p>
        <div className="flex gap-6 justify-center mt-6">
          {!isAuthenticated && (
            <>
              <Link
                to="/sign-up"
                className="bg-[#0B3D91] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#082B6F] transition duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="text-[#0B3D91] border-2 border-[#0B3D91] px-6 py-3 rounded-lg hover:bg-[#FF7F50] hover:text-white transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-[#0B3D91] text-2xl font-bold">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {howItWorks.map((step) => (
            <div key={step.title} className="bg-white p-4 rounded-lg shadow-lg">
              <h5 className="font-bold text-lg text-[#0B3D91]">{step.title}</h5>
              <p className="text-gray-600 mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <FeaturedAuctions />
      <UpcomingAuctions />
      <Leaderboard />
    </section>
  );
};

export default Home;

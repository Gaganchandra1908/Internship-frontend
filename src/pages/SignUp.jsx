import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("easypaisaAccountNumber", easypaisaAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated, navigateTo]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card w-full max-w-3xl mx-auto p-6 rounded-md shadow-lg">
        <h1 className="text-primary text-3xl font-bold mb-6 text-center sm:text-4xl md:text-5xl">
          Register
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleRegister}>
          <p className="font-semibold text-xl md:text-2xl">Personal Details</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-base text-muted">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="text-base py-2 bg-transparent border-b border-border focus:outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-base text-muted">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base py-2 bg-transparent border-b border-border focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-base text-muted">Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-base py-2 bg-transparent border-b border-border focus:outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-base text-muted">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-base py-2 bg-transparent border-b border-border focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-base text-muted">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-base py-2 bg-transparent border-b border-border focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-base text-muted">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-base py-2 bg-transparent border-b border-border focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base text-muted">Profile Image</label>
            <div className="flex items-center gap-3">
              <img
                src={
                  profileImagePreview ? profileImagePreview : "/imageHolder.jpg"
                }
                alt="Profile Preview"
                className="w-14 h-14 rounded-full"
              />
              <input type="file" onChange={imageHandler} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-xl md:text-2xl flex flex-col">
              Payment Method Details{" "}
              <span className="text-xs text-muted">
                Fill Payment Details Only If you are registering as an Auctioneer
              </span>
            </label>
            <div className="flex flex-col gap-2">
              <label className="text-base text-muted">Bank Details</label>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="text-base py-2 bg-transparent border-b border-border focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                >
                  <option value="">Select Your Bank</option>
                  <option value="Meezan Bank">Meezan Bank</option>
                  <option value="UBL">UBL</option>
                  <option value="HBL">HBL</option>
                  <option value="Allied Bank">Allied Bank</option>
                </select>
                <input
                  type="text"
                  value={bankAccountNumber}
                  placeholder="IBAN / IFSC"
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="text-base py-2 bg-transparent border-b border-border focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                />
                <input
                  type="text"
                  value={bankAccountName}
                  placeholder="Bank Account UserName"
                  onChange={(e) => setBankAccountName(e.target.value)}
                  className="text-base py-2 bg-transparent border-b border-border focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>
            <div>
              <label className="text-base text-muted font-semibold">
                Easypaisa And Paypal Details
              </label>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                <input
                  type="number"
                  value={easypaisaAccountNumber}
                  placeholder="Easypaisa Account Number"
                  onChange={(e) => setEasypaisaAccountNumber(e.target.value)}
                  className="text-base py-2 bg-transparent border-b border-border focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                />
                <input
                  type="email"
                  value={paypalEmail}
                  placeholder="Paypal Email"
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="text-base py-2 bg-transparent border-b border-border focus:outline-none sm:flex-1"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary w-full text-xl py-2 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;

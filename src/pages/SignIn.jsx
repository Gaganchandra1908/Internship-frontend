import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading, navigateTo]);

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card w-full max-w-md mx-auto p-6 rounded-md shadow-lg">
        <h1 className="text-primary text-3xl font-bold mb-6 text-center sm:text-4xl md:text-5xl">
          Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-base text-muted">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-base py-2 bg-transparent border-b border-border focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base text-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-base py-2 bg-transparent border-b border-border focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full text-xl mt-4"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;

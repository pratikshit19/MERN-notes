import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Notes App</h1>
      <p className="text-gray-600 mb-8">
        Create and manage your notes securely.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-[#2a3046]] text-white px-6 py-2 rounded shadow"
        >
          Login
        </Link>
        <Link
          to="/create-account"
          className="bg-[#2a3046] text-white px-6 py-2 rounded shadow"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Onboarding;

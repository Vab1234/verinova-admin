import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { LockClosedIcon, UserCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { API_BASE_URL } from "../config"; 

const Login = () => {
  const { setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Password required but not validated
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      // console.log(response);
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("userEmail", email);
        navigate("/dashboard");
        return "success";
      }
    } catch (err) {
      setError("Unauthorized:" , err);
      // console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://companieslogo.com/img/orig/UNIONBANK.NS-5bba728d.png?t=1720244494" className="h-10" alt="Verinova Logo" />
            <h1 className="text-2xl font-bold">Verinova</h1>
          </div>
          <div className="text-sm space-x-3">
            <span className="hidden md:inline">24/7 Support</span>
            <span>•</span>
            <span className="hidden md:inline">Toll Free 1800 222 244</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Login Card */}
          <div className="bg-white shadow-xl rounded-xl p-8 border border-blue-50">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              <LockClosedIcon className="h-6 w-6 inline-block mr-2 text-blue-600" />
              Admin Portal
            </h2>

            {/* Show error message if login fails */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <UserCircleIcon className="h-5 w-5 text-blue-500 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    placeholder="Enter Email ID"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="h-5 w-5 text-blue-500 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Security Assurance Section */}
          <div className="bg-blue-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-6">Security Assurance</h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <LockClosedIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">256-bit Encryption</h4>
                  <p className="text-sm text-gray-600 mt-1">All transactions protected with bank-grade security</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Fraud Protection</h4>
                  <p className="text-sm text-gray-600 mt-1">24/7 monitoring for suspicious activities</p>
                </div>
              </div>

              <div className="mt-8 border-t border-blue-200 pt-6">
                <h4 className="text-sm font-semibold text-blue-900 mb-3">Need Assistance?</h4>
                <p className="text-sm text-gray-600">
                  Contact our support team: <br />
                  <span className="font-medium text-blue-600">customercare@verinova.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <span>© {new Date().getFullYear()} Verinova</span>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-blue-200">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-200">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;

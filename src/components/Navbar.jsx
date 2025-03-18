import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="bg-blue-800 text-white p-4 flex justify-between items-center shadow-lg">
      <h2 className="text-xl font-semibold">Verinova Admin Portal</h2>
      <button 
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

export default Navbar;
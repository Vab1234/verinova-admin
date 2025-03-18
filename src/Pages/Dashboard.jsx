import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  const [queries, setQueries] = useState([]); // Pending queries
  const [resolvedQueries, setResolvedQueries] = useState([]); // Resolved queries
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // ✅ Fetch assigned queries for logged-in user
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true); // Start loading
        const userEmail = localStorage.getItem("userEmail"); // 🔹 Assuming user email is stored in localStorage
        if (!userEmail) {
          setError("User not logged in.");
          navigate("/")
          return;
        }

        const response = await axios.post(
          `${API_BASE_URL}/get-assigned-tickets`,
          { email: userEmail }, // Send user email to get assigned tickets
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("🟢 API Response:", response.data);

        if (!response.data || !Array.isArray(response.data.tickets)) {
          throw new Error("Invalid API response format!");
        }

        // ✅ Separate unresolved and resolved tickets
        setQueries(response.data.tickets.filter((q) => q.status === "Unresolved"));
        setResolvedQueries(response.data.tickets.filter((q) => q.status === "Resolved"));
      } catch (err) {
        console.error("❌ Error fetching tickets:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTickets();
  }, []);

  // ✅ Mark ticket as resolved
  const toggleResolved = async (id) => {
    try {
      await axios.post(
        `${API_BASE_URL}/update-ticket-status`,
        { _id: id, status: "Resolved" },
        { headers: { "Content-Type": "application/json" } }
      );

      // Move the ticket from unresolved to resolved list
      setQueries((prev) => prev.filter((q) => q._id !== id));
      const resolvedTicket = queries.find((q) => q._id === id);
      if (resolvedTicket) {
        setResolvedQueries((prev) => [...prev, { ...resolvedTicket, status: "Resolved" }]);
      }
    } catch (error) {
      console.error("❌ Error resolving ticket:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Assigned Tickets Management</h2>
  
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading tickets...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <>
                {/* Pending Tickets Section */}
                <div className="bg-white rounded-xl shadow-sm mb-8 border border-gray-200">
                  <div className="p-6 border-b border-gray-200 bg-blue-50 rounded-t-xl">
                    <h3 className="text-lg font-semibold text-blue-800">
                      ⚠️ Pending Tickets ({queries.length})
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {queries.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        No pending tickets found
                      </div>
                    ) : (
                      queries.map((query) => (
                        <div
                          key={query._id}
                          className="group flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-all shadow-sm"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-4">
                              <span className={`w-1 h-14 rounded-lg ${query?.category?.toLowerCase().includes("loan") ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                              <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-semibold text-gray-900">
                                    {query?.name || "Unknown User"}
                                  </h3>
                                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    CIBIL: {query?.accountInfo?.credit_score || "N/A"}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {query?.category || "No Category"}
                                  </span>
                                  <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                    Status: {query?.status || "N/A"}
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mt-1 italic">
                                  "{query?.description || "No description provided"}"
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleResolved(query._id)}
                            className="p-2 hover:bg-green-50 rounded-full transition-colors group-hover:scale-110"
                            title="Mark as resolved"
                          >
                            <CheckCircleIcon className="w-6 h-6 text-green-600" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
  
                {/* Resolved Tickets Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200 bg-green-50 rounded-t-xl">
                    <h3 className="text-lg font-semibold text-green-800">
                      ✅ Resolved Tickets ({resolvedQueries.length})
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {resolvedQueries.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        No resolved tickets found
                      </div>
                    ) : (
                      resolvedQueries.map((query) => (
                        <div 
                          key={query._id} 
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 opacity-90 hover:opacity-100 transition-opacity"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-4">
                              <span className="w-1 h-14 rounded-lg bg-green-500"></span>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="font-medium text-gray-700 line-through">
                                    {query.name}
                                  </h3>
                                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    {query.category}
                                  </span>
                                </div>
                                <p className="text-gray-500 text-sm">{query.description}</p>
                              </div>
                            </div>
                          </div>
                          <span className="text-green-600">
                            <CheckBadgeIcon className="w-6 h-6" />
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

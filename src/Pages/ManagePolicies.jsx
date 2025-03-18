import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/Navbar';
import { FaPlus } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

const ManagePolicies = () => {
  const { policies, addPolicy } = useAppContext();
  const [newPolicyName, setNewPolicyName] = useState('');
  const [newPolicyDetails, setNewPolicyDetails] = useState('');

  const handleAddPolicy = () => {
    if (newPolicyName.trim() === '' || newPolicyDetails.trim() === '') return;
    addPolicy({
      id: Date.now(),
      name: newPolicyName,
      details: newPolicyDetails
    });
    setNewPolicyName('');
    setNewPolicyDetails('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
              Policy Management
            </h2>

            <div className="bg-white rounded-lg shadow-sm mb-8 border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">
                  Existing Policies ({policies.length})
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-2">{policy.name}</h4>
                    <p className="text-gray-600 text-sm">{policy.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Policy</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Policy Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newPolicyName}
                  onChange={(e) => setNewPolicyName(e.target.value)}
                />
                <textarea
                  placeholder="Policy Details"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                  value={newPolicyDetails}
                  onChange={(e) => setNewPolicyDetails(e.target.value)}
                />
                <button 
                  onClick={handleAddPolicy}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <FaPlus className="w-4 h-4" /> Add Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePolicies;
import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/Navbar';
import { FaPlus } from 'react-icons/fa';

const NonCustomers = () => {
  const [nonCustomers, setNonCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '9876543210' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '9123456789' },
  ]);

  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');

  const handleAddCustomer = () => {
    if (newCustomerName.trim() === '' || newCustomerEmail.trim() === '' || newCustomerPhone.trim() === '') return;
    const newCustomer = {
      id: Date.now(),
      name: newCustomerName,
      email: newCustomerEmail,
      phone: newCustomerPhone,
    };
    setNonCustomers([...nonCustomers, newCustomer]);
    setNewCustomerName('');
    setNewCustomerEmail('');
    setNewCustomerPhone('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
              Non-Customers Management
            </h2>

            <div className="bg-white rounded-lg shadow-sm mb-8 border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">
                  Registered Non-Customers ({nonCustomers.length})
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {nonCustomers.map((customer) => (
                  <div key={customer.id} className="p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                    <h4 className="font-medium text-gray-900 mb-1">{customer.name}</h4>
                    <p className="text-gray-600 text-sm">Email: {customer.email}</p>
                    <p className="text-gray-600 text-sm">Phone: {customer.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonCustomers;
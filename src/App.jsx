import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ManageLoans from './Pages/ManageLoans';
import ManagePolicies from './Pages/ManagePolicies';
import React from 'react';
import { AppProvider } from './context/AppContext';
import NonCustomers from './Pages/NonCustomers';
function App() {
  return (
    <AppProvider>
      <Router>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-loans" element={<ManageLoans />} />
            <Route path="/manage-policies" element={<ManagePolicies />} />
            <Route path="/non-customers" element={<NonCustomers />} />
         </Routes>
      </Router>
    </AppProvider>
  );
}
export default App;

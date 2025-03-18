// src/context/AppContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const initialQueries = [
  { id: 1, user: "John Doe", type: "Fraud", cibil: 750, query: "Possible fraud transaction detected.", resolved: false },
  { id: 2, user: "Jane Smith", type: "Home Loan", cibil: 680, query: "Need help with home loan application.", resolved: false },
  { id: 3, user: "Alice Brown", type: "Fraud", cibil: 800, query: "Unauthorized loan taken on my name!", resolved: false },
  { id: 4, user: "Bob Johnson", type: "House Loan", cibil: 720, query: "Looking for a loan to buy a house.", resolved: false },
];

const initialPolicies = [
  { id: 1, name: "Privacy Policy", details: "Details about privacy policy." },
  { id: 2, name: "Loan Policy", details: "Details about loan policy." },
];

const initialLoans = [
  { id: 1, name: "Home Loan", details: "Details about home loan." },
  { id: 2, name: "Car Loan", details: "Details about car loan." },
];

export const AppProvider = ({ children }) => {
  // 🔹 Add user state
  const [user, setUser] = useState(null);

  // State initialization
  const [policies, setPolicies] = useState([]);
  const [loans, setLoans] = useState([]);
  const [queries, setQueries] = useState([]);

  // Load initial data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const savedPolicies = JSON.parse(localStorage.getItem("bankPolicies")) || initialPolicies;
        const savedLoans = JSON.parse(localStorage.getItem("bankLoans")) || initialLoans;
        const savedQueries = JSON.parse(localStorage.getItem("bankQueries")) || initialQueries;

        setPolicies(savedPolicies);
        setLoans(savedLoans);
        setQueries(savedQueries);
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        setPolicies(initialPolicies);
        setLoans(initialLoans);
        setQueries(initialQueries);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage on changes
  useEffect(() => {
    localStorage.setItem("bankPolicies", JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem("bankLoans", JSON.stringify(loans));
  }, [loans]);

  useEffect(() => {
    localStorage.setItem("bankQueries", JSON.stringify(queries));
  }, [queries]);

  // Policy actions
  const addPolicy = (newPolicy) => {
    setPolicies((prev) => [...prev, { ...newPolicy, id: Date.now() }]);
  };

  // Loan actions
  const addLoan = (newLoan) => {
    setLoans((prev) => [...prev, { ...newLoan, id: Date.now() }]);
  };

  // Query actions
  const toggleResolved = (id) => {
    setQueries((prev) =>
      prev.map((q) => (q.id === id ? { ...q, resolved: !q.resolved } : q))
    );
  };

  const addQuery = (newQuery) => {
    setQueries((prev) => [...prev, { ...newQuery, id: Date.now() }]);
  };

  return (
    <AppContext.Provider
      value={{
        // 🔹 User state
        user,
        setUser,

        // State
        policies,
        loans,
        queries,

        // Actions
        addPolicy,
        addLoan,
        toggleResolved,
        addQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

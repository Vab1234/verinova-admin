import React from "react";
import { Link } from "react-router-dom";
import { 
  ChartBarIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  BuildingLibraryIcon,
  UsersIcon
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <BuildingLibraryIcon className="w-8 h-8 text-white" />
        <h2 className="text-xl font-bold">Bank Admin</h2>
      </div>
      <ul className="space-y-2">
        <li>
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg transition-all"
          >
            <ChartBarIcon className="w-5 h-5" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/manage-loans" 
            className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg transition-all"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Manage Loans
          </Link>
        </li>
        <li>
          <Link 
            to="/manage-policies" 
            className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg transition-all"
          >
            <ClipboardDocumentCheckIcon className="w-5 h-5" />
            Manage Policies
          </Link>
        </li>
        <li>
          <Link 
            to="/non-customers" 
            className="flex items-center gap-3 p-3 hover:bg-red-500 rounded-md transition-all bg-red-400"
          >
            <UsersIcon className="w-5 h-5" />
            Non-Union Bank Customers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

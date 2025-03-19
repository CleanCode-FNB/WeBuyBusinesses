import { useState } from "react";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Buyer", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Seller", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Buyer", status: "Inactive" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "Seller", status: "Active" }
  ]);

  const [businesses, setBusinesses] = useState([
    { id: 1, name: "Tech Solutions", category: "IT Services", price: "$450,000", status: "For Sale" },
    { id: 2, name: "Fresh Bites", category: "Restaurant", price: "$275,000", status: "For Sale" },
    { id: 3, name: "Green Landscaping", category: "Home Services", price: "$120,000", status: "Pending" },
    { id: 4, name: "Modern Fitness", category: "Health & Wellness", price: "$350,000", status: "Sold" }
  ]);

  const [activeTab, setActiveTab] = useState("users");

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const deleteBusiness = (id) => {
    setBusinesses(businesses.filter(business => business.id !== id));
  };

  const editUser = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const editBusiness = (id) => {
    alert(`Edit business with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar and Main Content Container */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 h-screen fixed overflow-y-auto">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-white mb-6">WeBuyBusinesses</h1>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-start px-3 py-2 text-white hover:bg-gray-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                Dashboard
              </button>
              <button className="w-full flex items-center justify-start px-3 py-2 text-white hover:bg-gray-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Users
              </button>
              <button className="w-full flex items-center justify-start px-3 py-2 text-white hover:bg-gray-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                  <path d="M16 3v4"></path>
                  <path d="M8 3v4"></path>
                  <path d="M4 11h16"></path>
                </svg>
                Businesses
              </button>
              <button className="w-full flex items-center justify-start px-3 py-2 text-white hover:bg-gray-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                Analytics
              </button>
              <button className="w-full flex items-center justify-start px-3 py-2 text-white hover:bg-gray-800 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
              </button>
            </div>
          </div>
          <div className="p-4 absolute bottom-0 w-full">
            <button className="w-full flex items-center justify-start px-3 py-2 text-white hover:bg-gray-800 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Log Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex space-x-4">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add New
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-3xl font-bold">{users.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Businesses</p>
                  <p className="text-3xl font-bold">{businesses.length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                    <path d="M16 3v4"></path>
                    <path d="M8 3v4"></path>
                    <path d="M4 11h16"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Listings</p>
                  <p className="text-3xl font-bold">
                    {businesses.filter(b => b.status === "For Sale").length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Transactions</p>
                  <p className="text-3xl font-bold">
                    {businesses.filter(b => b.status === "Sold").length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="8 12 12 16 16 12"></polyline>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6 border-b">
            <div className="flex">
              <button 
                className={`py-2 px-4 font-medium text-lg ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
              <button 
                className={`py-2 px-4 font-medium text-lg ${activeTab === 'businesses' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('businesses')}
              >
                Businesses
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'users' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {users.map(user => (
                  <div key={user.id} className="overflow-hidden bg-white rounded-lg shadow-md">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Email:</span>
                          <span>{user.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Role:</span>
                          <span>{user.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 flex space-x-2">
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" 
                          onClick={() => editUser(user.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" 
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'businesses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businesses.map(business => (
                  <div key={business.id} className="overflow-hidden bg-white rounded-lg shadow-md">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="text-xl font-semibold">{business.name}</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Category:</span>
                          <span>{business.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Price:</span>
                          <span className="font-medium">{business.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            business.status === "For Sale" ? "bg-green-100 text-green-800" : 
                            business.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {business.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 flex space-x-2">
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" 
                          onClick={() => editBusiness(business.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" 
                          onClick={() => deleteBusiness(business.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
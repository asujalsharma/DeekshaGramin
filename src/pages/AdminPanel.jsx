import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy user data
const dummyUsers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    mobile: "9876543210",
    aadhar: "123456789012",
    pan: "ABCDE1234F",
    registeredDate: "2025-01-15"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    mobile: "8765432109",
    aadhar: "234567890123",
    pan: "BCDEF2345G",
    registeredDate: "2025-02-20"
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    mobile: "7654321098",
    aadhar: "345678901234",
    pan: "",
    registeredDate: "2025-03-10"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    mobile: "6543210987",
    aadhar: "",
    pan: "DEFGH4567J",
    registeredDate: "2025-04-05"
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    mobile: "9123456780",
    aadhar: "456789012345",
    pan: "EFGHI5678K",
    registeredDate: "2025-05-12"
  },
  {
    id: 6,
    name: "Anjali Desai",
    email: "anjali.desai@example.com",
    mobile: "8234567890",
    aadhar: "567890123456",
    pan: "",
    registeredDate: "2025-06-18"
  },
  {
    id: 7,
    name: "Rohit Gupta",
    email: "rohit.gupta@example.com",
    mobile: "7345678901",
    aadhar: "",
    pan: "GHIJK7890M",
    registeredDate: "2025-07-22"
  },
  {
    id: 8,
    name: "Pooja Verma",
    email: "pooja.verma@example.com",
    mobile: "6456789012",
    aadhar: "678901234567",
    pan: "HIJKL8901N",
    registeredDate: "2025-08-30"
  },
  {
    id: 9,
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
    mobile: "9567890123",
    aadhar: "789012345678",
    pan: "",
    registeredDate: "2025-09-14"
  },
  {
    id: 10,
    name: "Neha Joshi",
    email: "neha.joshi@example.com",
    mobile: "8678901234",
    aadhar: "",
    pan: "JKLMN9012P",
    registeredDate: "2025-10-08"
  }
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const [users] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter users based on search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
              <p className="text-gray-600 mt-1">Manage registered users</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-blue-600">{users.length}</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, or mobile number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-600">
              Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Aadhar
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    PAN
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Registered Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.mobile}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.aadhar ? (
                          <span>{user.aadhar}</span>
                        ) : (
                          <span className="text-gray-400 italic">Not provided</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.pan ? (
                          <span className="font-mono">{user.pan}</span>
                        ) : (
                          <span className="text-gray-400 italic">Not provided</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(user.registeredDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Users with Aadhar</h3>
            <p className="text-3xl font-bold text-green-600">
              {users.filter(u => u.aadhar).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Users with PAN</h3>
            <p className="text-3xl font-bold text-purple-600">
              {users.filter(u => u.pan).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Complete Profiles</h3>
            <p className="text-3xl font-bold text-blue-600">
              {users.filter(u => u.aadhar && u.pan).length}
            </p>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">User ID</p>
                  <p className="text-lg text-gray-900">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Registration Date</p>
                  <p className="text-lg text-gray-900">
                    {new Date(selectedUser.registeredDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">Full Name</p>
                <p className="text-lg text-gray-900">{selectedUser.name}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">Email Address</p>
                <p className="text-lg text-gray-900">{selectedUser.email}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">Mobile Number</p>
                <p className="text-lg text-gray-900">{selectedUser.mobile}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">Aadhar Number</p>
                <p className="text-lg text-gray-900">
                  {selectedUser.aadhar || <span className="text-gray-400 italic">Not provided</span>}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">PAN Card</p>
                <p className="text-lg text-gray-900 font-mono">
                  {selectedUser.pan || <span className="text-gray-400 italic">Not provided</span>}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

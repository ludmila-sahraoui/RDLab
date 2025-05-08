import React, { useState } from 'react';
import { FiPlus, FiX } from "react-icons/fi";
import SearchBar from '../components/SearchBar';
import FilterBtn from '../components/FilterBtn';

// Role Colors Map
const roleColors = {
  "Engineer": "bg-purple-100 text-purple-700",
  "Researcher": "bg-green-100 text-green-700",
  "Intern": "bg-yellow-100 text-yellow-700",
};

const ManageRolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [privileges] = useState([
    'View Dashboard',
    'Manage Users',
    'Edit Settings',
    'Create Reports',
    'Upload Files',
    'Access to Drilling Knowledge Base',
  ]);

  const handleAddRole = () => {
    if (roleName && selectedPrivileges.length > 0) {
      const newRole = {
        name: roleName,
        privileges: selectedPrivileges,
        users: Math.floor(Math.random() * 100),
      };
      setRoles([...roles, newRole]);
      setRoleName('');
      setSelectedPrivileges([]);
      setIsModalOpen(false);
    }
  };

  const handleSelectPrivilege = (privilege) => {
    setSelectedPrivileges((prev) =>
      prev.includes(privilege)
        ? prev.filter((p) => p !== privilege)
        : [...prev, privilege]
    );
  };

  return (
    <div className="bg-white px-[3%] h-screen w-full flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4">
        <h3 className="mx-8 font-semibold text-2xl">Manage Roles</h3>
      </div>

      {/* Controls */}
      <div className="mx-8 flex flex-col md:flex-row md:items-center md:justify-between p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <SearchBar className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" />
          <FilterBtn className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" />
        </div>
      </div>

      {/* Modal to add Role */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-purple-medium bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md relative flex flex-col items-center gap-6">
            
            {/* X Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setIsModalOpen(false)}
            >
              <FiX size={24} />
            </button>

            {/* Title */}
            <h3 className="text-xl font-semibold">New Role</h3>

            {/* Role Name Input */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600 mb-1">Role Name</label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter role name"
              />
            </div>

            {/* Privileges Selection */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-600 mb-1">Select Privileges</label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3 space-y-2">
                {privileges.map((privilege, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPrivileges.includes(privilege)}
                      onChange={() => handleSelectPrivilege(privilege)}
                      className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm">{privilege}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Done Button */}
            <button
              onClick={handleAddRole}
              className="w-full bg-purple-dark hover:bg-purple-medium text-white text-sm font-semibold py-3 rounded-md transition duration-300"
            >
              Done
            </button>

          </div>
        </div>
      )}

      {/* Roles Table */}
      <div className="m-8 w-full h-full overflow-y-auto">

        {/* Add Role Button */}
        <div className="mr-6 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-dark text-white rounded-md hover:bg-purple-medium transition duration-300"
          >
            Add Role
            <FiPlus className="h-5 w-5" />
          </button>
        </div>

        {/* Table */}
        <div className="rounded-lg mr-8 mt-4">
          {/* Table Header */}
          <div className="grid grid-cols-3 items-start py-4 border-b border-gray-200 px-4 pr-8">
            <div className="flex items-center text-sm font-semibold">Role Name</div>
            <div className="flex items-center text-sm font-semibold">Privileges</div>
            <div className="flex items-center text-sm font-semibold">Number of Users</div>
          </div>

          {/* Table Rows */}
          {roles.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No roles created yet.
            </div>
          ) : (
            roles.map((role, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center py-4 border-b border-gray-200 px-4 pr-8"
              >
                {/* Role Name */}
                <div className="flex items-center">
                  <span className={`text-sm px-3 py-1 rounded-full ${roleColors[role.name] || "bg-gray-100 text-gray-700"}`}>
                    {role.name}
                  </span>
                </div>

                {/* Privileges */}
                <div className="flex items-center text-sm text-gray-700">
                  <ul className="space-y-1">
                    {role.privileges.map((privilege, idx) => (
                      <li key={idx} className="text-sm">{privilege}</li>
                    ))}
                  </ul>
                </div>

                {/* Number of Users */}
                <div className="flex items-center text-sm text-gray-700">{role.users}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRolesPage;

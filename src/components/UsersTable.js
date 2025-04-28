import React, { useState } from 'react';
import { Pencil, XCircle, Ban, CheckCircle } from "lucide-react";

const roleColors = {
  "Engineer": "bg-purple-100 text-purple-700",
  "Researcher": "bg-green-100 text-green-700",
  "Intern": "bg-yellow-100 text-yellow-700",
};

const availableRoles = Object.keys(roleColors);

const UserTable = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "Olivia Bennett", email: "olivia.bennett@petrotechmail.com", role: "Engineer", status: "Logged In", avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    { id: 2, name: "Ayesha Khan", email: "ayesha.k@drillstream.net", role: "Researcher", status: "Logged In", avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    { id: 3, name: "Marcus Feldman", email: "mfeldman89@geoworks.io", role: "Intern", status: "Not Logged In", avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    { id: 4, name: "Lucas McAllister", email: "lucas.mcallister@gitrack.org", role: "Intern", status: "Not Logged In", avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    { id: 5, name: "Elena Zhang", email: "e.zhang@energygrid.tech", role: "Researcher", status: "Logged In", avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    { id: 6, name: "Rafael Sousa", email: "rafael.s@pipeline360.co", role: "Engineer", status: "Not Logged In", avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
  ]);
  const [deactivatedUsers, setDeactivatedUsers] = useState([]); // New state to track deactivated users

  const handleRoleChange = (e, userId) => {
    const newRole = e.target.value;
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
    setEditingRoleId(null);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsPopupOpen(true);
  };

  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    setDeactivatedUsers((prev) => prev.filter((id) => id !== userId)); // Clean up
  };

  const handleToggleDeactivate = (userId) => {
    setDeactivatedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId) // Reactivate
        : [...prev, userId] // Deactivate
    );
  };

  return (
    <div className="w-[95%] mx-8">
      <div className="rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-[50px_1fr_2fr_1fr_1fr_100px] bg-green-dark h-14 rounded-t-lg border-b border-gray-200 px-4">
          <div className="flex items-center text-sm font-semibold"></div>
          <div className="flex items-center text-sm font-semibold">Name</div>
          <div className="flex items-center text-sm font-semibold">Email</div>
          <div className="flex items-center text-sm font-semibold">Status</div>
          <div className="flex items-center text-sm font-semibold">Role</div>
          <div className="flex items-center text-sm font-semibold"></div>
        </div>

        {/* Table Rows */}
        {users.map((row) => {
          const isDeactivated = deactivatedUsers.includes(row.id);
          return (
            <div
              key={row.id}
              className={`grid grid-cols-[50px_1fr_2fr_1fr_1fr_100px] items-center h-16 border-b border-gray-200 px-4 transition ${isDeactivated ? "opacity-60" : ""}`}
            >
              {/* Avatar */}
              <div className="flex items-center">
                <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full" />
              </div>

              {/* Name */}
              <div className="flex items-center text-sm text-gray-700">{row.name}</div>

              {/* Email */}
              <div className="flex items-center text-sm text-gray-700">{row.email}</div>

              {/* Status */}
              <div className="flex items-center text-sm text-gray-700">{row.status}</div>

              {/* Role */}
              <div className="flex items-center text-sm text-gray-700">
                {editingRoleId === row.id ? (
                  <select
                    value={row.role}
                    onChange={(e) => handleRoleChange(e, row.id)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {availableRoles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                ) : (
                  <div
                    onClick={() => editingRoleId === row.id ? setEditingRoleId(null) : setEditingRoleId(row.id)}
                    className={`px-2 py-1 rounded-full text-xs cursor-pointer ${roleColors[row.role]}`}
                  >
                    {row.role}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Pencil
                  className="text-purple-dark cursor-pointer hover:text-purple-medium"
                  title="Edit"
                  onClick={() => handleEditClick(row)}
                  size={18}
                />
                {isDeactivated ? (
                  <CheckCircle
                    className="text-green-700 cursor-pointer hover:text-green-800"
                    title="Activate"
                    onClick={() => handleToggleDeactivate(row.id)}
                    size={18}
                  />
                ) : (
                  <Ban
                    className="text-purple-dark cursor-pointer hover:text-purple-medium"
                    title="Deactivate"
                    onClick={() => handleToggleDeactivate(row.id)}
                    size={18}
                  />
                )}
                <XCircle
                  className="text-purple-dark cursor-pointer hover:text-purple-medium"
                  title="Delete"
                  onClick={() => handleDelete(row.id)}
                  size={18}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTable;

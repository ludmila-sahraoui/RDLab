import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [users, setUsers] = useState([]);
  const [deactivatedUsers, setDeactivatedUsers] = useState([]);

  // Fetch users from FastAPI
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/admin/users/', {
          withCredentials: true 
        });
        const formattedUsers = res.data.users.map((u) => ({
          id: u.userID,
          name: u.name,
          email: u.email,
          role: u.role,
          status: "Not Logged In", 
          avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
    setDeactivatedUsers((prev) => prev.filter((id) => id !== userId));
  };

  const handleToggleDeactivate = (userId) => {
    setDeactivatedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
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
              <div className="flex items-center">
                <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full" />
              </div>
              <div className="flex items-center text-sm text-gray-700">{row.name}</div>
              <div className="flex items-center text-sm text-gray-700">{row.email}</div>
              <div className="flex items-center text-sm text-gray-700">{row.status}</div>
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
                    onClick={() => setEditingRoleId(row.id)}
                    className={`px-2 py-1 rounded-full text-xs cursor-pointer ${roleColors[row.role]}`}
                  >
                    {row.role}
                  </div>
                )}
              </div>
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

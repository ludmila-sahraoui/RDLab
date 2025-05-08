import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import UserTable from "../components/UsersTable";
import RoleAssignmentPopup from "../components/EditRoleModal";
import NotificationPanel from "../components/NotificationPanel";
import SearchBar from '../components/SearchBar';
import FilterBtn from '../components/FilterBtn';
import DropdownMenuButton from '../components/DropDownBtn';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Olivia Bennett", email: "olivia.bennett@petrotechmail.com", role: "Engineer", status: "Logged In", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Ayesha Khan", email: "ayesha.k@drillstream.net", role: "Researcher", status: "Logged In", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Marcus Feldman", email: "mfeldman89@geoworks.io", role: "Intern", status: "Not Logged In", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 4, name: "Lucas McAllister", email: "lucas.mcallister@gitrack.org", role: "Intern", status: "Not Logged In", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
    { id: 5, name: "Elena Zhang", email: "e.zhang@energygrid.tech", role: "Researcher", status: "Logged In", avatar: "https://randomuser.me/api/portraits/women/5.jpg" },
    { id: 6, name: "Rafael Sousa", email: "rafael.s@pipeline360.co", role: "Engineer", status: "Not Logged In", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
  ]);
  const [notifications, setNotifications] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(""); // Added state for status filter
  const [selectedRole, setSelectedRole] = useState(""); // Added state for role filter

  const roles = ['Admin', 'Engineer', 'Manager', 'Operator'];
  const statusOptions = ['Logged In', 'Not Logged In'];

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
  };

  const filteredUsers = users.filter((user) => {
    const isStatusMatch = selectedStatus ? user.status === selectedStatus : true;
    const isRoleMatch = selectedRole ? user.role === selectedRole : true;
    return isStatusMatch && isRoleMatch;
  });

  const handleEditRole = (user) => {
    setEditingUser(user);
    setEditModalOpen(true);
  };

  const handleSaveRole = (userId, newRoles) => {
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRoles.join(', ') } : user));
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleInactivateUser = (userId) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'Inactive' } : user));
  };

  const handleApprove = (notif) => {
    setEditingUser({ ...notif });
    setEditModalOpen(true);
    setNotifications(notifications.filter(n => n !== notif));
  };

  const handleReject = (notif) => {
    setNotifications(notifications.filter(n => n !== notif));
  };

  return (
    <div className="bg-white pl-[3%] h-screen w-full flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4">
        <h3 className="mx-8 font-semibold text-2xl">Manage Users</h3>
        <button 
          onClick={() => setNotificationOpen(!isNotificationOpen)}
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Bell size={24} />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </button>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT SIDE: Main content */}
        <div className={`flex flex-col flex-1 transition-all duration-300 ${isNotificationOpen ? 'w-2/3' : 'w-full'}`}>
          
          {/* Controls */}
          <div className="mx-8 flex flex-col md:flex-row md:items-center md:justify-between p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <SearchBar className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" />
              <FilterBtn className="bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto" />
            </div>
          </div>

          {/* Dropdowns */}
          <div className="mx-8 flex items-center gap-2 p-4">
            <DropdownMenuButton
              label="Filter by status"
              items={statusOptions.map(status => ({ label: status, value: status }))}
              onSelect={handleStatusFilter}
            />
            <DropdownMenuButton
              label="Filter by role"
              items={roles.map(role => ({ label: role, value: role }))}
              onSelect={handleRoleFilter}
            />
          </div>

          {/* Table */}
          <div className="flex-1 overflow-x-auto p-4">
            <UserTable  />
          </div>
        </div>

        {/* RIGHT SIDE: Notification panel */}
        {isNotificationOpen && (
          <div className="w-1/3 h-full bg-white border rounded-lg shadow mb-8 flex flex-col p-4">
            <NotificationPanel 
              notifications={notifications} 
              onApprove={handleApprove} 
              onReject={handleReject} 
            />
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {isEditModalOpen && (
        <RoleAssignmentPopup 
          user={editingUser}
          onSave={handleSaveRole}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ManageUsersPage;

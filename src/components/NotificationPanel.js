import React, { useState } from 'react';
import BtnStyle1 from './BtnStyleOne';
import BtnStyle2 from './BtnStyleTwo';
import { X } from "lucide-react"; 

const availableRoles = ["Enginner", "Intern", "Researcher"];

export const notifications = [
  {
    id: 1,
    type: "account",
    message: "User Olivia Bennett has created an account. Approval pending.",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    userId: 1,
    status: "pending",
    name: "Olivia Bennett",
    email: "olivia@example.com",
  },
  {
    id: 2,
    type: "account",
    message: "User Ayesha Khan has created an account. Approval pending.",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    userId: 2,
    status: "pending",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
  },
  {
    id: 3,
    type: "account",
    message: "User Sarah Lee has created an account. Approval pending.",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    userId: 3,
    status: "pending",
    name: "Sarah Lee",
    email: "sarah@example.com",
  },
  {
    id: 4,
    type: "account",
    message: "User Emma Johnson has created an account. Approval pending.",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    userId: 4,
    status: "pending",
    name: "Emma Johnson",
    email: "emma@example.com",
  },
  {
    id: 5,
    type: "account",
    message: "User Zoe Martinez has created an account. Approval pending.",
    avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    userId: 5,
    status: "pending",
    name: "Zoe Martinez",
    email: "zoe@example.com",
  },
];

const NotificationPanel = () => {
    const [notificationsList, setNotificationsList] = useState(notifications);
    const [usersList, setUsersList] = useState([]); 
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");
  
    const handleApprove = (notification) => {
      setSelectedNotification(notification);
    };
  
    const handleReject = (id) => {
      setNotificationsList((prev) => prev.filter((notification) => notification.id !== id));
    };
  
    const handleConfirmRole = () => {
      if (selectedRole && selectedNotification) {
        setUsersList((prev) => [
          ...prev,
          { ...selectedNotification, role: selectedRole },
        ]);
        setNotificationsList((prev) =>
          prev.filter((notification) => notification.id !== selectedNotification.id)
        );
        setSelectedNotification(null);
        setSelectedRole("");
      }
    };
  
    const handleCancelRoleSelection = () => {
      setSelectedNotification(null);
      setSelectedRole("");
    };
  
    return (
      <div className="w-full h-full p-1 flex justify-center">
        <div className="max-w-3xl w-full h-[600px] overflow-y-auto flex flex-col gap-6">
          {notificationsList.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-xl shadow-md p-2 flex flex-col gap-4 transition hover:shadow-lg"
            >
              {/* Top Part */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={notification.avatar}
                    alt={notification.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 text-sm font-medium">{notification.message}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <div><span className="font-semibold">Name:</span> {notification.name}</div>
                    <div><span className="font-semibold">Email:</span> {notification.email}</div>
                  </div>
                </div>
              </div>
  
              {/* Bottom Part: Smaller Buttons */}
              <div className="flex gap-6 h-[25%] justify-center">
                <BtnStyle1
                  label="Approve"
                  onClick={() => handleApprove(notification)}
                  className="text-sm"
                />
                <BtnStyle2
                  label="Reject"
                  onClick={() => handleReject(notification.id)}
                  className="text-sm"
                />
              </div>
            </div>
          ))}
        </div>
  
        {/* Popup */}
        {selectedNotification && (
        <div className="fixed inset-0 bg-purple-medium bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md relative flex flex-col items-center gap-6">
            {/* X Button */}
            <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                onClick={handleCancelRoleSelection}
            >
                <X size={24} />
            </button>

            {/* Avatar */}
            <img
                src={selectedNotification.avatar}
                alt={selectedNotification.name}
                className="w-20 h-20 rounded-full object-cover"
            />

            {/* Name */}
            <h2 className="text-xl font-semibold">{selectedNotification.name}</h2>

            {/* Role Selection */}
            <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
                <option value="">Select Role</option>
                {availableRoles.map((role) => (
                <option key={role} value={role}>{role}</option>
                ))}
            </select>

            {/* Done Button */}
            <BtnStyle1
                label="Done"
                onClick={handleConfirmRole}
                className="w-full text-sm px-4 py-2 mt-2"
            />
            </div>
        </div>
        )}

      </div>
    );
  };
  
  export default NotificationPanel;
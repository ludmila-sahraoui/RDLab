import React from 'react';

const RoleAssignmentPopup = ({ user, closePopup }) => {
  // Check if 'user' is null or undefined before accessing properties like 'role'
  if (!user) {
    return null; // You can return null to render nothing if 'user' is not available
  }

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="text-xl font-semibold">Assign Role to {user.name}</h2>
        <div className="role-form">
          <label className="block text-sm">Role</label>
          <select className="p-2 border rounded-lg" defaultValue={user.role}>
            <option>Drilling Engineer</option>
            <option>Geoscientist</option>
            <option>Field Operator</option>
            <option>Reservoir Engineer</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded mt-4"
          onClick={closePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RoleAssignmentPopup;

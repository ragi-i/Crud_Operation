// UserDetails.jsx

import React from 'react';

const UserDetails = ({ userDetails }) => {
  return (
    <aside className="user-details">
      <h2>User Details</h2>
      <ul>
        <li><strong>Name:</strong> {userDetails.name}</li>
        <li><strong>Email:</strong> {userDetails.email}</li>
        <li><strong>Contact:</strong> {userDetails.contact}</li>
      </ul>
    </aside>
  );
};

export default UserDetails;

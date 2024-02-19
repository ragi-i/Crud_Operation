// MyPoliciesModal.jsx

import React from 'react';

const MyPoliciesModal = ({ onClose, myPolicies }) => {
  return (
    <div className="my-policies-modal">
      <div className="my-policies-modal-content">
        <h2>My Policies</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Coverage Amount</th>
              <th>Premium Amount</th>
            </tr>
          </thead>
          <tbody>
            {myPolicies.map(policy => (
              <tr key={policy.policyId}>
                <td>{policy.name}</td>
                <td>{policy.coverageAmount}</td>
                <td>{policy.premiumAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MyPoliciesModal;


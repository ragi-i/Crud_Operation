// ClaimForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './ClaimForm.css';

const ClaimForm = ({ userId, policies }) => {
    const [formData, setFormData] = useState({
        policyId: '', // Initialize policyId with an empty string
        amountRequested: '',
        details: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { policyId, amountRequested, details } = formData;
            // Make sure policyId is selected from available policies
            if (!policies.some(policy => policy.policyId === policyId)) {
                throw new Error('Invalid Policy ID');
            }
            // Submit claim data
            const response = await axios.post('http://localhost:8080/user/claim', {
                userId,
                policyId,
                amountRequested,
                details
            });
            console.log(response.data);
            // Clear form data after successful submission
            setFormData({
                policyId: '', // Reset policyId after submission
                amountRequested: '',
                details: ''
            });
        } catch (error) {
            console.error('Error submitting claim:', error);
            // Handle error
        }
    };

    return (
        <div className="claim-form">
            <h2>Make Claim</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select Policy:</label>
                    <select name="policyId" value={formData.policyId} onChange={handleChange}>
                        <option value="">Select</option>
                        {policies.map(policy => (
                            <option key={policy.policyId} value={policy.policyId}>{policy.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Amount Requested:</label>
                    <input type="number" name="amountRequested" value={formData.amountRequested} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Details:</label>
                    <textarea name="details" value={formData.details} onChange={handleChange} />
                </div>
                <button type="submit">Submit Claim</button>
            </form>
        </div>
    );
};

export default ClaimForm;

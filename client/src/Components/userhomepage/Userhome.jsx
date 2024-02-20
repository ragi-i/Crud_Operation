import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserHomePage = () => {
    const [policies, setPolicies] = useState([]);
    const [myPolicies,setMyPolicies]=useState([]);

    useEffect(() => {
        // Fetch all policies from the backend
        axios.get('http://localhost:8080/user/policy')
        .then(response => {
            // console.log(response.data); 
            setPolicies(response?.data?.policies);
       
        })
        .catch(error => {
            console.error('Error fetching policies:', error);
            // Handle errors here if needed
        });

        
        console.log("****",policies);
           
    }, []);
    
    console.log("----->>>", policies)

    const handleAddToMyPolicies = (policyId) => {
     
            // Check if the policy is already in myPolicies
            if (myPolicies.some(p => p.policyId === policyId)) {
                return;
            }
        
            // Find the policy in policies
            const policyToAdd = policies.find(policy => policy.policyId === policyId);
            if (policyToAdd) {
                // Add the policy to myPolicies
                setMyPolicies(prevPolicies => [...prevPolicies, policyToAdd]);
                const email = localStorage.getItem('email');
                console.log("this is email", email)
                // Send a POST request to add the policy to the user's profile
                axios.post('http://localhost:8080/user/selectPolicy', {
                    email,
                    policyId
                })
                .then(response => {
                    // Handle success response if needed
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle error response if needed
                    console.error('Error adding policy to user profile:', error);
                });
            }
        

  alert(`Policy ${policyId} added to your policies`);
    };


    return (
        <div>
            <h1>All Policies</h1>
            <table>
                <thead>
                    <tr>
                        <th>PolicyId</th>
                        <th>Name</th>
                        <th>Coverage Amount</th>
                        <th>Premium Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {policies?.map(policy => (
                        <tr key={policy.policyId}>
                            <tr>{policy.policyId}</tr>
                            <td>{policy.name}</td>
                            <td>{policy.coverageAmount}</td>
                            <td>{policy.premiumAmount}</td>
                            <td>
                                <button
                                    className="add-button"
                                    onClick={() => handleAddToMyPolicies(policy.policyId)}
                                    disabled={false} >
                                    Add to My Policies
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserHomePage;







































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Userhome.css';

// const UserHomePage = () => {
//     const [policies, setPolicies] = useState([]);
//     const [myPolicies, setMyPolicies] = useState([]);
   
//     useEffect(() => {
//         axios.get('http://localhost:8080/user/policy')
//             .then(response => setPolicies(response?.data?.policies))
//             .catch(error => console.error('Error fetching policies:', error));
//     }, []);

//     const handleAddToMyPolicies = (policyId) => {
//         // Check if the policy is already in myPolicies
//         if (myPolicies.some(p => p.policyId === policyId)) {
//             return;
//         }

//         // Find the policy in policies
//         const policyToAdd = policies.find(policy => policy.policyId === policyId);
//         if (policyToAdd) {
//             // Add the policy to myPolicies
//             setMyPolicies(prevPolicies => [...prevPolicies, policyToAdd]);
//         }
//     };

//     return (
//         <div className="user-home-container">
//             <div className="all-policies">
//                 <h2>All Policies</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Policy Id</th>
//                             <th>Name</th>
//                             <th>Coverage Amount</th>
//                             <th>Premium Amount</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {policies.map(policy => (
//                             <tr key={policy.policyId}>
//                                 <td>{policy.policyId}</td>
//                                 <td>{policy.name}</td>
//                                 <td>{policy.coverageAmount}</td>
//                                 <td>{policy.premiumAmount}</td>
//                                 <td>
//                                     <button
//                                         className={`add-button ${myPolicies.some(p => p.policyId === policy.policyId) ? 'added' : ''}`}
//                                         onClick={() => handleAddToMyPolicies(policy.policyId)}
//                                         disabled={myPolicies.some(p => p.policyId === policy.policyId)}
//                                     >
//                                         {myPolicies.some(p => p.policyId === policy.policyId) ? 'Added' : 'Add to My Policies'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserHomePage;
























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UserDetails from './UserDetails';
// import MyPoliciesModal from './MyPoliciesModal';
// import ClaimForm from './ClaimForm'; // Import the ClaimForm component
// import './Userhome.css';

// const UserHomePage = () => {
//     const [policies, setPolicies] = useState([]);
//     const [myPolicies, setMyPolicies] = useState([]);
//     // const [userDetails, setUserDetails] = useState({});
//     const [myClaims, setMyClaims] = useState([]);
//     const [showMyPoliciesModal, setShowMyPoliciesModal] = useState(false);

//     useEffect(() => {
//         axios.get('http://localhost:8080/user/policy')
//             .then(response => setPolicies(response?.data?.policies))
//             .catch(error => console.error('Error fetching policies:', error));

//         axios.get('http://localhost:8080/user/details')
//             .then(response => setUserDetails(response?.data))
//             .catch(error => console.error('Error fetching user details:', error));
//     }, []);

//     // const handleAddToMyPolicies = (policyId) => {
//     //     const policyToAdd = policies.find(policy => policy.policyId === policyId);
//     //     if (policyToAdd) {
//     //         setMyPolicies(prevPolicies => [...prevPolicies, policyToAdd]);
//     //         addToMyClaims(policyToAdd);
//     //     }
//     // };

//     // const addToMyClaims = (policy) => {
//     //     setMyClaims(prevClaims => [...prevClaims, policy]);
//     // };

//     return (
//         <div className="user-home-container">
//             {/* User Details Section */}
//             {/* <div className="user-details">
//                 <UserDetails userDetails={userDetails} />
//             </div> */}

//             {/* All Policies Section */}
//             <div className="all-policies">
//                 <h2>All Policies</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Coverage Amount</th>
//                             <th>Premium Amount</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {policies.map(policy => (
//                             <tr key={policy.policyId}>
//                                 <td>{policy.name}</td>
//                                 <td>{policy.coverageAmount}</td>
//                                 <td>{policy.premiumAmount}</td>
//                                 <td>
//                                     <button
//                                         className={`add-button ${myPolicies.some(p => p.policyId === policy.policyId) ? 'added' : ''}`}
//                                         onClick={() => handleAddToMyPolicies(policy.policyId)}
//                                         disabled={myPolicies.some(p => p.policyId === policy.policyId)}
//                                     >
//                                         {myPolicies.some(p => p.policyId === policy.policyId) ? 'Added' : 'Add to My Policies'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Claim Form Section */}
//             {/* <ClaimForm userId={userDetails.email} policies={myPolicies} /> */}
            
//             {/* My Claims Section */}
//             {/* <div className="my-policies-table">
//                 <h2>My Policies</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Coverage Amount</th>
//                             <th>Premium Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {myClaims.map(policy => (
//                             <tr key={policy.policyId}>
//                                 <td>{policy.name}</td>
//                                 <td>{policy.coverageAmount}</td>
//                                 <td>{policy.premiumAmount}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div> */}
//         </div>
//     );
// };

// export default UserHomePage;

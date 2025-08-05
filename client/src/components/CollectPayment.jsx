// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Layout from "../components/Layout/Layout";
// import { mockMembers } from "../data/mockData"; // Import mock data

// const CollectPayment = () => {
//   const navigate = useNavigate();

//   const [selectedMember, setSelectedMember] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [paymentType, setPaymentType] = useState("");
//   const [paymentAmount, setPaymentAmount] = useState(0);
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [receiptNumber, setReceiptNumber] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // Generate initial receipt number
//   useEffect(() => {
//     const now = new Date();
//     const newReceiptNumber = `RCP${now.getFullYear()}${String(
//       now.getMonth() + 1
//     ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
//       Math.floor(Math.random() * 9999)
//     ).padStart(4, "0")}`;
//     setReceiptNumber(newReceiptNumber);
//   }, []);

//   // Filter members based on search query
//   const filteredMembers = mockMembers.filter(
//     (member) =>
//       member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       member.id.toString().includes(searchQuery)
//   );

//   // Handle member selection
//   const handleSelectMember = (member) => {
//     setSelectedMember(member);
//     setSearchQuery(`${member.name} (${member.id})`);
//     updatePaymentSummary(member);
//     setPaymentAmount(0); // Reset amount initially
//   };

//   // Update payment summary
//   const updatePaymentSummary = (member) => {
//     const feeAmount = member.monthlyFee || 0;
//     const fineAmount = member.outstandingFines || 0;
//     document.getElementById("feeAmount").textContent = `₹${feeAmount}`;
//     document.getElementById("fineAmount").textContent = `₹${fineAmount}`;
//     document.getElementById("totalAmount").textContent = `₹${feeAmount + fineAmount}`;
//     document.getElementById("memberInfo").classList.add("show");
//     document.getElementById("paymentSummary").classList.add("show");
//     if (member.outstandingFines > 0) {
//       document.getElementById("outstandingFines").classList.add("show");
//     }
//   };

//   // Handle payment type change
//   const handlePaymentTypeChange = (e) => {
//     setPaymentType(e.target.value);
//     if (selectedMember) {
//       switch (e.target.value) {
//         case "fee":
//           setPaymentAmount(selectedMember.monthlyFee);
//           break;
//         case "fine":
//           setPaymentAmount(selectedMember.outstandingFines);
//           break;
//         case "both":
//           setPaymentAmount(selectedMember.monthlyFee + selectedMember.outstandingFines);
//           break;
//         default:
//           setPaymentAmount(0);
//       }
//     }
//     document.getElementById("collectButton").disabled = !e.target.value || paymentAmount === 0;
//   };

//   // Handle form reset
//   const resetForm = () => {
//     setSelectedMember(null);
//     setSearchQuery("");
//     setPaymentType("");
//     setPaymentAmount(0);
//     setPaymentMethod("cash");
//     setErrorMessage("");
//     setSuccessMessage("");
//     document.getElementById("memberInfo").classList.remove("show");
//     document.getElementById("paymentSummary").classList.remove("show");
//     document.getElementById("outstandingFines").classList.remove("show");
//     document.getElementById("receiptInfo").classList.remove("show");
//     document.getElementById("paymentAmount").disabled = true;
//     document.getElementById("collectButton").disabled = true;

//     const now = new Date();
//     const newReceiptNumber = `RCP${now.getFullYear()}${String(
//       now.getMonth() + 1
//     ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
//       Math.floor(Math.random() * 9999)
//     ).padStart(4, "0")}`;
//     setReceiptNumber(newReceiptNumber);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedMember) {
//       const paymentData = {
//         member: selectedMember,
//         type: paymentType,
//         amount: paymentAmount,
//         method: paymentMethod,
//         receiptNumber,
//         date: new Date(),
//       };

//       console.log("Payment collected:", paymentData);
//       setSuccessMessage(
//         `Payment of ₹${paymentAmount} collected successfully from ${selectedMember.name}!`
//       );
//       document.getElementById("receiptInfo").classList.add("show");

//       setTimeout(() => {
//         if (
//           confirm(
//             "Payment collected successfully! Collect another payment?"
//           )
//         ) {
//           resetForm();
//         } else {
//           navigate("/librarian-dashboard");
//         }
//       }, 2000);
//     } else {
//       setErrorMessage("Please select a member to proceed.");
//     }
//   };

//   // Hide search results when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest(".form-group")) {
//         document.getElementById("memberResults").style.display = "none";
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <Layout showHeader={true} userRole="Librarian" userName="Sarah Johnson">
//       <main
//         style={{
//           padding: "2rem 0",
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "1000px",
//             margin: "0 auto",
//             padding: "0 20px",
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: "2rem",
//               borderRadius: "10px",
//               border: "1px solid #e9ecef",
//               boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
//               marginBottom: "2rem",
//               textAlign: "center",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "2rem",
//                 color: "#333",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Collect Payment
//             </h1>
//             <p
//               style={{
//                 color: "#666",
//                 fontSize: "1.1rem",
//               }}
//             >
//               Process membership fee and fine payments from library members
//             </p>
//           </div>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "2rem",
//               marginBottom: "2rem",
//             }}
//           >
//             <div
//               style={{
//                 background: "#fff",
//                 padding: "2rem",
//                 borderRadius: "10px",
//                 border: "1px solid #e9ecef",
//                 boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <div
//                 style={{
//                   background: errorMessage ? "#f8d7da" : "transparent",
//                   border: errorMessage ? "1px solid #f5c6cb" : "none",
//                   color: errorMessage ? "#721c24" : "inherit",
//                   padding: errorMessage ? "0.75rem" : "0",
//                   borderRadius: "5px",
//                   marginBottom: errorMessage ? "1rem" : "0",
//                   display: errorMessage ? "block" : "none",
//                 }}
//                 id="errorMessage"
//               >
//                 {errorMessage}
//               </div>
//               <div
//                 style={{
//                   background: successMessage ? "#d4edda" : "transparent",
//                   border: successMessage ? "1px solid #c3e6cb" : "none",
//                   color: successMessage ? "#155724" : "inherit",
//                   padding: successMessage ? "0.75rem" : "0",
//                   borderRadius: "5px",
//                   marginBottom: successMessage ? "1rem" : "0",
//                   display: successMessage ? "block" : "none",
//                 }}
//                 id="successMessage"
//               >
//                 {successMessage}
//               </div>

//               <form id="paymentForm" onSubmit={handleSubmit}>
//                 <div
//                   style={{
//                     color: "#333",
//                     marginBottom: "1rem",
//                     paddingBottom: "0.5rem",
//                     borderBottom: "2px solid #e9ecef",
//                   }}
//                 >
//                   <h2>Member Information</h2>
//                 </div>

//                 <div
//                   style={{
//                     marginBottom: "1.5rem",
//                   }}
//                 >
//                   <label
//                     style={{
//                       display: "block",
//                       marginBottom: "0.5rem",
//                       fontWeight: "500",
//                       color: "#333",
//                     }}
//                     htmlFor="memberSearch"
//                   >
//                     Search Member <span style={{ color: "#dc3545" }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="memberSearch"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Enter member ID, name, or email..."
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem",
//                       border: "2px solid #e9ecef",
//                       borderRadius: "5px",
//                       fontSize: "1rem",
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#333")}
//                     onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
//                   />
//                   <div
//                     id="memberResults"
//                     style={{
//                       maxHeight: "200px",
//                       overflowY: "auto",
//                       border: "1px solid #e9ecef",
//                       borderRadius: "5px",
//                       background: "#fff",
//                       display: searchQuery.length >= 2 && filteredMembers.length > 0 ? "block" : "none",
//                     }}
//                   >
//                     {filteredMembers.map((member) => (
//                       <div
//                         key={member.id}
//                         className="search-result-item"
//                         onClick={() => handleSelectMember(member)}
//                         style={{
//                           padding: "0.75rem",
//                           borderBottom: "1px solid #e9ecef",
//                           cursor: "pointer",
//                           transition: "background-color 0.3s ease",
//                         }}
//                         onMouseOver={(e) => (e.target.style.background = "#f8f9fa")}
//                         onMouseOut={(e) => (e.target.style.background = "transparent")}
//                       >
//                         {member.name} ({member.id}) - Status: {member.status.toUpperCase()}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     color: "#333",
//                     marginBottom: "1rem",
//                     paddingBottom: "0.5rem",
//                     borderBottom: "2px solid #e9ecef",
//                   }}
//                 >
//                   <h2>Payment Details</h2>
//                 </div>

//                 <div
//                   style={{
//                     marginBottom: "1.5rem",
//                   }}
//                 >
//                   <label
//                     style={{
//                       display: "block",
//                       marginBottom: "0.5rem",
//                       fontWeight: "500",
//                       color: "#333",
//                     }}
//                     htmlFor="paymentType"
//                   >
//                     Payment Type <span style={{ color: "#dc3545" }}>*</span>
//                   </label>
//                   <select
//                     id="paymentType"
//                     value={paymentType}
//                     onChange={handlePaymentTypeChange}
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem",
//                       border: "2px solid #e9ecef",
//                       borderRadius: "5px",
//                       fontSize: "1rem",
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#333")}
//                     onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
//                   >
//                     <option value="">Select Payment Type</option>
//                     <option value="fee">Monthly Membership Fee</option>
//                     <option value="fine">Late Return Fine</option>
//                     <option value="both">Fee + Fine (Combined)</option>
//                   </select>
//                 </div>

//                 <div
//                   style={{
//                     marginBottom: "1.5rem",
//                   }}
//                 >
//                   <label
//                     style={{
//                       display: "block",
//                       marginBottom: "0.5rem",
//                       fontWeight: "500",
//                       color: "#333",
//                     }}
//                     htmlFor="paymentAmount"
//                   >
//                     Amount (₹) <span style={{ color: "#dc3545" }}>*</span>
//                   </label>
//                   <input
//                     type="number"
//                     id="paymentAmount"
//                     value={paymentAmount}
//                     onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
//                     step="0.01"
//                     min="0"
//                     placeholder="0.00"
//                     required
//                     disabled={!selectedMember}
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem",
//                       border: "2px solid #e9ecef",
//                       borderRadius: "5px",
//                       fontSize: "1rem",
//                       transition: "border-color 0.3s ease",
//                       backgroundColor: !selectedMember ? "#f8f9fa" : "transparent",
//                       color: !selectedMember ? "#666" : "#333",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#333")}
//                     onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
//                   />
//                 </div>

//                 <div
//                   style={{
//                     marginBottom: "1.5rem",
//                   }}
//                 >
//                   <label
//                     style={{
//                       display: "block",
//                       marginBottom: "0.5rem",
//                       fontWeight: "500",
//                       color: "#333",
//                     }}
//                     htmlFor="paymentMethod"
//                   >
//                     Payment Method
//                   </label>
//                   <select
//                     id="paymentMethod"
//                     value={paymentMethod}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem",
//                       border: "2px solid #e9ecef",
//                       borderRadius: "5px",
//                       fontSize: "1rem",
//                       transition: "border-color 0.3s ease",
//                     }}
//                     onFocus={(e) => (e.target.style.borderColor = "#333")}
//                     onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
//                   >
//                     <option value="cash">Cash</option>
//                     <option value="card">Debit/Credit Card</option>
//                     <option value="upi">UPI</option>
//                     <option value="netbanking">Net Banking</option>
//                   </select>
//                 </div>

//                 <div
//                   style={{
//                     marginBottom: "1.5rem",
//                   }}
//                 >
//                   <label
//                     style={{
//                       display: "block",
//                       marginBottom: "0.5rem",
//                       fontWeight: "500",
//                       color: "#333",
//                     }}
//                     htmlFor="receiptNumber"
//                   >
//                     Receipt Number
//                   </label>
//                   <input
//                     type="text"
//                     id="receiptNumber"
//                     value={receiptNumber}
//                     readOnly
//                     style={{
//                       width: "100%",
//                       padding: "0.75rem",
//                       border: "2px solid #e9ecef",
//                       borderRadius: "5px",
//                       fontSize: "1rem",
//                       transition: "border-color 0.3s ease",
//                       backgroundColor: "#f8f9fa",
//                       color: "#666",
//                     }}
//                   />
//                 </div>

//                 <div
//                   id="paymentSummary"
//                   style={{
//                     background: "#e9ecef",
//                     padding: "1.5rem",
//                     borderRadius: "8px",
//                     marginBottom: "1.5rem",
//                     display: selectedMember ? "block" : "none",
//                   }}
//                 >
//                   <h3
//                     style={{
//                       color: "#333",
//                       marginBottom: "1rem",
//                     }}
//                   >
//                     Payment Summary
//                   </h3>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: "0.5rem",
//                       paddingBottom: "0.5rem",
//                       borderBottom: "1px solid #dee2e6",
//                     }}
//                   >
//                     <span>Membership Fee:</span>
//                     <span id="feeAmount">₹0</span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: "0.5rem",
//                       paddingBottom: "0.5rem",
//                       borderBottom: "1px solid #dee2e6",
//                     }}
//                   >
//                     <span>Outstanding Fines:</span>
//                     <span id="fineAmount">₹0</span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: "0.5rem",
//                       paddingBottom: "0.5rem",
//                       borderBottom: "2px solid #333",
//                       fontWeight: "bold",
//                       fontSize: "1.1rem",
//                       marginTop: "1rem",
//                     }}
//                   >
//                     <span>Total Amount:</span>
//                     <span id="totalAmount">₹0</span>
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "1rem",
//                     justifyContent: "center",
//                     marginTop: "2rem",
//                   }}
//                 >
//                   <button
//                     type="submit"
//                     className="btn"
//                     id="collectButton"
//                     disabled={!selectedMember || !paymentType || paymentAmount === 0}
//                     style={{
//                       padding: "0.75rem 1.5rem",
//                       background: !selectedMember || !paymentType || paymentAmount === 0 ? "#ccc" : "#333",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "5px",
//                       fontSize: "1rem",
//                       fontWeight: "500",
//                       cursor: !selectedMember || !paymentType || paymentAmount === 0 ? "not-allowed" : "pointer",
//                       transition: "background-color 0.3s ease",
//                     }}
//                     onMouseOver={(e) => {
//                       if (!selectedMember || !paymentType || paymentAmount === 0) return;
//                       e.target.style.background = "#555";
//                     }}
//                     onMouseOut={(e) => {
//                       if (!selectedMember || !paymentType || paymentAmount === 0) return;
//                       e.target.style.background = "#333";
//                     }}
//                   >
//                     Collect Payment
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={resetForm}
//                     style={{
//                       padding: "0.75rem 1.5rem",
//                       background: "transparent",
//                       color: "#333",
//                       border: "2px solid #333",
//                       borderRadius: "5px",
//                       fontSize: "1rem",
//                       fontWeight: "500",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseOver={(e) => {
//                       e.target.style.background = "#333";
//                       e.target.style.color = "#fff";
//                     }}
//                     onMouseOut={(e) => {
//                       e.target.style.background = "transparent";
//                       e.target.style.color = "#333";
//                     }}
//                   >
//                     Reset Form
//                   </button>
//                 </div>
//               </form>

//               <div
//                 id="receiptInfo"
//                 style={{
//                   background: "#f8f9fa",
//                   padding: "1rem",
//                   borderRadius: "5px",
//                   marginTop: "1rem",
//                   fontSize: "0.9rem",
//                   color: "#666",
//                   display: successMessage ? "block" : "none",
//                 }}
//               >
//                 <strong>Payment Successful!</strong><br />
//                 Receipt has been generated. Please provide a copy to the member.
//               </div>
//             </div>

//             <div
//               style={{
//                 background: "#fff",
//                 padding: "2rem",
//                 borderRadius: "10px",
//                 border: "1px solid #e9ecef",
//                 boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <h2
//                 style={{
//                   color: "#333",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 Member Details
//               </h2>

//               <div
//                 id="memberInfo"
//                 style={{
//                   background: "#f8f9fa",
//                   padding: "1.5rem",
//                   borderRadius: "8px",
//                   border: "1px solid #e9ecef",
//                   marginBottom: "1.5rem",
//                   display: selectedMember ? "block" : "none",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     marginBottom: "1rem",
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontSize: "1.2rem",
//                       fontWeight: "bold",
//                       color: "#333",
//                     }}
//                   >
//                     {selectedMember ? selectedMember.name : ""}
//                   </div>
//                   <div
//                     style={{
//                       padding: "0.3rem 0.8rem",
//                       borderRadius: "15px",
//                       fontSize: "0.8rem",
//                       fontWeight: "500",
//                       textTransform: "uppercase",
//                       background:
//                         selectedMember?.status === "active"
//                           ? "#d4edda"
//                           : selectedMember?.status === "due"
//                           ? "#fff3cd"
//                           : "#f8d7da",
//                       color:
//                         selectedMember?.status === "active"
//                           ? "#155724"
//                           : selectedMember?.status === "due"
//                           ? "#856404"
//                           : "#721c24",
//                     }}
//                   >
//                     {selectedMember?.status?.toUpperCase() || ""}
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//                     gap: "1rem",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: "0.8rem",
//                         color: "#666",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         marginBottom: "0.2rem",
//                       }}
//                     >
//                       Member ID
//                     </span>
//                     <span
//                       style={{
//                         fontWeight: "500",
//                         color: "#333",
//                       }}
//                     >
//                       {selectedMember?.id || ""}
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: "0.8rem",
//                         color: "#666",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         marginBottom: "0.2rem",
//                       }}
//                     >
//                       Email
//                     </span>
//                     <span
//                       style={{
//                         fontWeight: "500",
//                         color: "#333",
//                       }}
//                     >
//                       {selectedMember?.email || ""}
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: "0.8rem",
//                         color: "#666",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         marginBottom: "0.2rem",
//                       }}
//                     >
//                       Phone
//                     </span>
//                     <span
//                       style={{
//                         fontWeight: "500",
//                         color: "#333",
//                       }}
//                     >
//                       {selectedMember?.phone || ""}
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: "0.8rem",
//                         color: "#666",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         marginBottom: "0.2rem",
//                       }}
//                     >
//                       Last Payment
//                     </span>
//                     <span
//                       style={{
//                         fontWeight: "500",
//                         color: "#333",
//                       }}
//                     >
//                       {selectedMember
//                         ? new Date(selectedMember.lastPayment).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                           })
//                         : ""}
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: "0.8rem",
//                         color: "#666",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         marginBottom: "0.2rem",
//                       }}
//                     >
//                       Books Issued
//                     </span>
//                     <span
//                       style={{
//                         fontWeight: "500",
//                         color: "#333",
//                       }}
//                     >
//                       {selectedMember ? "2" : ""}
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: "0.8rem",
//                         color: "#666",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         marginBottom: "0.2rem",
//                       }}
//                     >
//                       Membership Expires
//                     </span>
//                     <span
//                       style={{
//                         fontWeight: "500",
//                         color: selectedMember
//                           ? new Date(selectedMember.lastPayment).setMonth(
//                               new Date(selectedMember.lastPayment).getMonth() + 1
//                             ) < new Date()
//                             ? "#dc3545"
//                             : "#333"
//                           : "#333",
//                       }}
//                     >
//                       {selectedMember
//                         ? new Date(
//                             new Date(selectedMember.lastPayment).setMonth(
//                               new Date(selectedMember.lastPayment).getMonth() + 1
//                             )
//                           ).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                           }) +
//                           (new Date(selectedMember.lastPayment).setMonth(
//                             new Date(selectedMember.lastPayment).getMonth() + 1
//                           ) < new Date()
//                             ? " (Expired)"
//                             : "")
//                         : ""}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 id="outstandingFines"
//                 style={{
//                   background: "#fff3cd",
//                   border: "1px solid #ffeaa7",
//                   borderRadius: "8px",
//                   padding: "1.5rem",
//                   marginBottom: "1.5rem",
//                   display: selectedMember && selectedMember.outstandingFines > 0 ? "block" : "none",
//                 }}
//               >
//                 <h3
//                   style={{
//                     color: "#856404",
//                     marginBottom: "1rem",
//                   }}
//                 >
//                   Outstanding Fines
//                 </h3>
//                 {selectedMember?.outstandingFines > 0 && (
//                   <>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         padding: "0.75rem",
//                         borderBottom: "1px solid #f0e68c",
//                         marginBottom: "0.5rem",
//                       }}
//                     >
//                       <div
//                         style={{
//                           fontWeight: "500",
//                           color: "#333",
//                         }}
//                       >
//                         Design Patterns (19 days late)
//                       </div>
//                       <div
//                         style={{
//                           fontWeight: "bold",
//                           color: "#dc3545",
//                         }}
//                       >
//                         ₹95
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         padding: "0.75rem",
//                         borderBottom: "1px solid #f0e68c",
//                         marginBottom: "0.5rem",
//                       }}
//                     >
//                       <div
//                         style={{
//                           fontWeight: "500",
//                           color: "#333",
//                         }}
//                       >
//                         Code Complete (9 days late)
//                       </div>
//                       <div
//                         style={{
//                           fontWeight: "bold",
//                           color: "#dc3545",
//                         }}
//                       >
//                         ₹45
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         padding: "0.75rem",
//                         borderBottom: "none",
//                         marginBottom: "0",
//                       }}
//                     >
//                       <div
//                         style={{
//                           fontWeight: "500",
//                           color: "#333",
//                         }}
//                       >
//                         <strong>Total Fines</strong>
//                       </div>
//                       <div
//                         style={{
//                           fontWeight: "bold",
//                           color: "#dc3545",
//                         }}
//                       >
//                         <strong>₹{selectedMember.outstandingFines}</strong>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </Layout>
//   );
// };

// export default CollectPayment;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockMembers } from "../data/mockData"; // Import mock data

const CollectPayment = () => {
  const navigate = useNavigate();

  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [receiptNumber, setReceiptNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Generate initial receipt number
  useEffect(() => {
    const now = new Date();
    const newReceiptNumber = `RCP${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
      Math.floor(Math.random() * 9999)
    ).padStart(4, "0")}`;
    setReceiptNumber(newReceiptNumber);
  }, []);

  // Filter members based on search query
  const filteredMembers = mockMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toString().includes(searchQuery)
  );

  // Handle member selection
  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setSearchQuery(`${member.name} (${member.id})`);
    updatePaymentSummary(member);
    setPaymentAmount(0); // Reset amount initially
  };

  // Update payment summary
  const updatePaymentSummary = (member) => {
    const feeAmount = member.monthlyFee || 0;
    const fineAmount = member.outstandingFines || 0;
    document.getElementById("feeAmount").textContent = `₹${feeAmount}`;
    document.getElementById("fineAmount").textContent = `₹${fineAmount}`;
    document.getElementById("totalAmount").textContent = `₹${
      feeAmount + fineAmount
    }`;
    document.getElementById("memberInfo").classList.add("show");
    document.getElementById("paymentSummary").classList.add("show");
    if (member.outstandingFines > 0) {
      document.getElementById("outstandingFines").classList.add("show");
    }
  };

  // Handle payment type change
  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
    if (selectedMember) {
      switch (e.target.value) {
        case "fee":
          setPaymentAmount(selectedMember.monthlyFee);
          break;
        case "fine":
          setPaymentAmount(selectedMember.outstandingFines);
          break;
        case "both":
          setPaymentAmount(
            selectedMember.monthlyFee + selectedMember.outstandingFines
          );
          break;
        default:
          setPaymentAmount(0);
      }
    }
    document.getElementById("collectButton").disabled =
      !e.target.value || paymentAmount === 0;
  };

  // Handle form reset
  const resetForm = () => {
    setSelectedMember(null);
    setSearchQuery("");
    setPaymentType("");
    setPaymentAmount(0);
    setPaymentMethod("cash");
    setErrorMessage("");
    setSuccessMessage("");
    document.getElementById("memberInfo").classList.remove("show");
    document.getElementById("paymentSummary").classList.remove("show");
    document.getElementById("outstandingFines").classList.remove("show");
    document.getElementById("receiptInfo").classList.remove("show");
    document.getElementById("paymentAmount").disabled = true;
    document.getElementById("collectButton").disabled = true;

    const now = new Date();
    const newReceiptNumber = `RCP${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}${String(
      Math.floor(Math.random() * 9999)
    ).padStart(4, "0")}`;
    setReceiptNumber(newReceiptNumber);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMember) {
      const paymentData = {
        member: selectedMember,
        type: paymentType,
        amount: paymentAmount,
        method: paymentMethod,
        receiptNumber,
        date: new Date(),
      };

      console.log("Payment collected:", paymentData);
      setSuccessMessage(
        `Payment of ₹${paymentAmount} collected successfully from ${selectedMember.name}!`
      );
      document.getElementById("receiptInfo").classList.add("show");

      setTimeout(() => {
        if (
          confirm("Payment collected successfully! Collect another payment?")
        ) {
          resetForm();
        } else {
          navigate("/librarian-dashboard");
        }
      }, 2000);
    } else {
      setErrorMessage("Please select a member to proceed.");
    }
  };

  // Hide search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".form-group")) {
        document.getElementById("memberResults").style.display = "none";
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        backgroundColor: "#f8f9fa",
        color: "#333",
        lineHeight: 1.6,
      }}
    >
      <header
        style={{
          background: "#fff",
          borderBottom: "2px solid #e9ecef",
          padding: "1rem 0",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Library Management System
            </div>
            <Link
              to={"/librarian-dashboard"}
              style={{
                color: "#333",
                textDecoration: "none",
                padding: "0.5rem 1rem",
                border: "1px solid #e9ecef",
                borderRadius: "5px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.borderColor = "#333")}
              onMouseOut={(e) => (e.target.style.borderColor = "#e9ecef")}
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main
        style={{
          padding: "2rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              border: "1px solid #e9ecef",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              Collect Payment
            </h1>
            <p
              style={{
                color: "#666",
                fontSize: "1.1rem",
              }}
            >
              Process membership fee and fine payments from library members
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "10px",
                border: "1px solid #e9ecef",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  background: errorMessage ? "#f8d7da" : "transparent",
                  border: errorMessage ? "1px solid #f5c6cb" : "none",
                  color: errorMessage ? "#721c24" : "inherit",
                  padding: errorMessage ? "0.75rem" : "0",
                  borderRadius: "5px",
                  marginBottom: errorMessage ? "1rem" : "0",
                  display: errorMessage ? "block" : "none",
                }}
                id="errorMessage"
              >
                {errorMessage}
              </div>
              <div
                style={{
                  background: successMessage ? "#d4edda" : "transparent",
                  border: successMessage ? "1px solid #c3e6cb" : "none",
                  color: successMessage ? "#155724" : "inherit",
                  padding: successMessage ? "0.75rem" : "0",
                  borderRadius: "5px",
                  marginBottom: successMessage ? "1rem" : "0",
                  display: successMessage ? "block" : "none",
                }}
                id="successMessage"
              >
                {successMessage}
              </div>

              <form id="paymentForm" onSubmit={handleSubmit}>
                <div
                  style={{
                    color: "#333",
                    marginBottom: "1rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "2px solid #e9ecef",
                  }}
                >
                  <h2>Member Information</h2>
                </div>

                <div
                  style={{
                    marginBottom: "1.5rem",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                    htmlFor="memberSearch"
                  >
                    Search Member <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="memberSearch"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter member ID, name, or email..."
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e9ecef",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#333")}
                    onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                  />
                  <div
                    id="memberResults"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      border: "1px solid #e9ecef",
                      borderRadius: "5px",
                      background: "#fff",
                      display:
                        searchQuery.length >= 2 && filteredMembers.length > 0
                          ? "block"
                          : "none",
                    }}
                  >
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="search-result-item"
                        onClick={() => handleSelectMember(member)}
                        style={{
                          padding: "0.75rem",
                          borderBottom: "1px solid #e9ecef",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.background = "#f8f9fa")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.background = "transparent")
                        }
                      >
                        {member.name} ({member.id}) - Status:{" "}
                        {member.status.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    color: "#333",
                    marginBottom: "1rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "2px solid #e9ecef",
                  }}
                >
                  <h2>Payment Details</h2>
                </div>

                <div
                  style={{
                    marginBottom: "1.5rem",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                    htmlFor="paymentType"
                  >
                    Payment Type <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <select
                    id="paymentType"
                    value={paymentType}
                    onChange={handlePaymentTypeChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e9ecef",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#333")}
                    onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                  >
                    <option value="">Select Payment Type</option>
                    <option value="fee">Monthly Membership Fee</option>
                    <option value="fine">Late Return Fine</option>
                    <option value="both">Fee + Fine (Combined)</option>
                  </select>
                </div>

                <div
                  style={{
                    marginBottom: "1.5rem",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                    htmlFor="paymentAmount"
                  >
                    Amount (₹) <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="paymentAmount"
                    value={paymentAmount}
                    onChange={(e) =>
                      setPaymentAmount(parseFloat(e.target.value) || 0)
                    }
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                    disabled={!selectedMember}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e9ecef",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      transition: "border-color 0.3s ease",
                      backgroundColor: !selectedMember
                        ? "#f8f9fa"
                        : "transparent",
                      color: !selectedMember ? "#666" : "#333",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#333")}
                    onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                  />
                </div>

                <div
                  style={{
                    marginBottom: "1.5rem",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                    htmlFor="paymentMethod"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e9ecef",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      transition: "border-color 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#333")}
                    onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Debit/Credit Card</option>
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                  </select>
                </div>

                <div
                  style={{
                    marginBottom: "1.5rem",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                    htmlFor="receiptNumber"
                  >
                    Receipt Number
                  </label>
                  <input
                    type="text"
                    id="receiptNumber"
                    value={receiptNumber}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e9ecef",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      transition: "border-color 0.3s ease",
                      backgroundColor: "#f8f9fa",
                      color: "#666",
                    }}
                  />
                </div>

                <div
                  id="paymentSummary"
                  style={{
                    background: "#e9ecef",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                    display: selectedMember ? "block" : "none",
                  }}
                >
                  <h3
                    style={{
                      color: "#333",
                      marginBottom: "1rem",
                    }}
                  >
                    Payment Summary
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid #dee2e6",
                    }}
                  >
                    <span>Membership Fee:</span>
                    <span id="feeAmount">₹0</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid #dee2e6",
                    }}
                  >
                    <span>Outstanding Fines:</span>
                    <span id="fineAmount">₹0</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "2px solid #333",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      marginTop: "1rem",
                    }}
                  >
                    <span>Total Amount:</span>
                    <span id="totalAmount">₹0</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    marginTop: "2rem",
                  }}
                >
                  <button
                    type="submit"
                    className="btn"
                    id="collectButton"
                    disabled={
                      !selectedMember || !paymentType || paymentAmount === 0
                    }
                    style={{
                      padding: "0.75rem 1.5rem",
                      background:
                        !selectedMember || !paymentType || paymentAmount === 0
                          ? "#ccc"
                          : "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor:
                        !selectedMember || !paymentType || paymentAmount === 0
                          ? "not-allowed"
                          : "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      if (
                        !selectedMember ||
                        !paymentType ||
                        paymentAmount === 0
                      )
                        return;
                      e.target.style.background = "#555";
                    }}
                    onMouseOut={(e) => {
                      if (
                        !selectedMember ||
                        !paymentType ||
                        paymentAmount === 0
                      )
                        return;
                      e.target.style.background = "#333";
                    }}
                  >
                    Collect Payment
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetForm}
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: "transparent",
                      color: "#333",
                      border: "2px solid #333",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = "#333";
                      e.target.style.color = "#fff";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.color = "#333";
                    }}
                  >
                    Reset Form
                  </button>
                </div>
              </form>

              <div
                id="receiptInfo"
                style={{
                  background: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "5px",
                  marginTop: "1rem",
                  fontSize: "0.9rem",
                  color: "#666",
                  display: successMessage ? "block" : "none",
                }}
              >
                <strong>Payment Successful!</strong>
                <br />
                Receipt has been generated. Please provide a copy to the member.
              </div>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "10px",
                border: "1px solid #e9ecef",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  color: "#333",
                  marginBottom: "1rem",
                }}
              >
                Member Details
              </h2>

              <div
                id="memberInfo"
                style={{
                  background: "#f8f9fa",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #e9ecef",
                  marginBottom: "1.5rem",
                  display: selectedMember ? "block" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {selectedMember ? selectedMember.name : ""}
                  </div>
                  <div
                    style={{
                      padding: "0.3rem 0.8rem",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      background:
                        selectedMember?.status === "active"
                          ? "#d4edda"
                          : selectedMember?.status === "due"
                          ? "#fff3cd"
                          : "#f8d7da",
                      color:
                        selectedMember?.status === "active"
                          ? "#155724"
                          : selectedMember?.status === "due"
                          ? "#856404"
                          : "#721c24",
                    }}
                  >
                    {selectedMember?.status?.toUpperCase() || ""}
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "0.2rem",
                      }}
                    >
                      Member ID
                    </span>
                    <span
                      style={{
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      {selectedMember?.id || ""}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "0.2rem",
                      }}
                    >
                      Email
                    </span>
                    <span
                      style={{
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      {selectedMember?.email || ""}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "0.2rem",
                      }}
                    >
                      Phone
                    </span>
                    <span
                      style={{
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      {selectedMember?.phone || ""}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "0.2rem",
                      }}
                    >
                      Last Payment
                    </span>
                    <span
                      style={{
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      {selectedMember
                        ? new Date(
                            selectedMember.lastPayment
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "0.2rem",
                      }}
                    >
                      Books Issued
                    </span>
                    <span
                      style={{
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      {selectedMember ? "2" : ""}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "0.2rem",
                      }}
                    >
                      Membership Expires
                    </span>
                    <span
                      style={{
                        fontWeight: "500",
                        color: selectedMember
                          ? new Date(selectedMember.lastPayment).setMonth(
                              new Date(selectedMember.lastPayment).getMonth() +
                                1
                            ) < new Date()
                            ? "#dc3545"
                            : "#333"
                          : "#333",
                      }}
                    >
                      {selectedMember
                        ? new Date(
                            new Date(selectedMember.lastPayment).setMonth(
                              new Date(selectedMember.lastPayment).getMonth() +
                                1
                            )
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }) +
                          (new Date(selectedMember.lastPayment).setMonth(
                            new Date(selectedMember.lastPayment).getMonth() + 1
                          ) < new Date()
                            ? " (Expired)"
                            : "")
                        : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div
                id="outstandingFines"
                style={{
                  background: "#fff3cd",
                  border: "1px solid #ffeaa7",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                  display:
                    selectedMember && selectedMember.outstandingFines > 0
                      ? "block"
                      : "none",
                }}
              >
                <h3
                  style={{
                    color: "#856404",
                    marginBottom: "1rem",
                  }}
                >
                  Outstanding Fines
                </h3>
                {selectedMember?.outstandingFines > 0 && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.75rem",
                        borderBottom: "1px solid #f0e68c",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        Design Patterns (19 days late)
                      </div>
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#dc3545",
                        }}
                      >
                        ₹95
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.75rem",
                        borderBottom: "1px solid #f0e68c",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        Code Complete (9 days late)
                      </div>
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#dc3545",
                        }}
                      >
                        ₹45
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.75rem",
                        borderBottom: "none",
                        marginBottom: "0",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        <strong>Total Fines</strong>
                      </div>
                      <div
                        style={{
                          fontWeight: "bold",
                          color: "#dc3545",
                        }}
                      >
                        <strong>₹{selectedMember.outstandingFines}</strong>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollectPayment;

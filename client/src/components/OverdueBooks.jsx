// // import React, { useState } from "react";
// // // import "../styles/overduebooks.css";

// // const overdueBooksData = [
// //   {
// //     id: 1,
// //     bookTitle: "The Great Gatsby",
// //     bookAuthor: "F. Scott Fitzgerald",
// //     memberName: "Alice Johnson",
// //     memberId: "M123",
// //     overdueDays: 10,
// //     priority: "critical",
// //     fineAmount: 25.0,
// //   },
// //   {
// //     id: 2,
// //     bookTitle: "1984",
// //     bookAuthor: "George Orwell",
// //     memberName: "Bob Smith",
// //     memberId: "M456",
// //     overdueDays: 5,
// //     priority: "high",
// //     fineAmount: 12.5,
// //   },
// //   {
// //     id: 3,
// //     bookTitle: "To Kill a Mockingbird",
// //     bookAuthor: "Harper Lee",
// //     memberName: "Clara Davis",
// //     memberId: "M789",
// //     overdueDays: 3,
// //     priority: "medium",
// //     fineAmount: 7.5,
// //   },
// // ];

// // const priorityLabels = {
// //   critical: {
// //     label: "Critical",
// //     className: "overdue-critical priority-critical",
// //   },
// //   high: { label: "High", className: "overdue-high priority-high" },
// //   medium: { label: "Medium", className: "overdue-medium" },
// // };

// // export default function OverdueBooksPage() {
// //   const [filters, setFilters] = useState({
// //     memberName: "",
// //     bookTitle: "",
// //     priority: "",
// //   });

// //   const handleFilterChange = (e) => {
// //     const { name, value } = e.target;
// //     setFilters((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const filteredBooks = overdueBooksData.filter((book) => {
// //     return (
// //       book.memberName
// //         .toLowerCase()
// //         .includes(filters.memberName.toLowerCase()) &&
// //       book.bookTitle.toLowerCase().includes(filters.bookTitle.toLowerCase()) &&
// //       (filters.priority === "" || book.priority === filters.priority)
// //     );
// //   });

// //   return (
// //     <>
// //       <style>
// //         {`
// //         .overdue-critical {
// //   background-color: #fee2e2;
// // }

// // .priority-critical {
// //   background-color: #fee2e2;
// // }

// // .overdue-high {
// //   background-color: #fef3c7;
// // }

// // .priority-high {
// //   background-color: #fef3c7;
// // }

// // .overdue-medium {
// //   background-color: #d1fae5;
// // }

// // .overdue-badge {
// //   padding: 0.25rem 0.5rem;
// //   border-radius: 0.25rem;
// //   font-size: 0.875rem;
// //   font-weight: 500;
// // }

// // .book-info, .member-info {
// //   min-width: 200px;
// // }

// // .book-title, .member-name {
// //   font-weight: 500;
// // }

// // .book-author, .member-id {
// //   font-size: 0.875rem;
// //   color: #4b5563;
// // }

// // .fine-amount, .actions-cell {
// //   min-width: 100px;
// // }

// // .btn {
// //   padding: 0.5rem 1rem;
// //   border-radius: 0.25rem;
// //   font-size: 0.875rem;
// //   font-weight: 500;
// // }

// // .btn-small {
// //   padding: 0.25rem 0.5rem;
// // }

// // .btn-collect {
// //   background-color: #059669;
// //   color: white;
// // }

// // .btn-collect:hover {
// //   background-color: #047857;
// // }`}
// //       </style>
// //       <div className="container mx-auto p-4">
// //         <header className="mb-6">
// //           <div className="header-content flex justify-between items-center">
// //             <div className="logo text-2xl font-bold">Library Admin</div>
// //             <a href="#" className="back-link text-blue-600 hover:underline">
// //               ← Back to Dashboard
// //             </a>
// //           </div>
// //         </header>

// //         <main className="main-content">
// //           <section className="page-header mb-6">
// //             <div className="header-content-page">
// //               <div className="page-title-section">
// //                 <h1 className="text-3xl font-bold">Overdue Books</h1>
// //                 <p className="text-gray-600">
// //                   Manage and collect fines for overdue books.
// //                 </p>
// //               </div>
// //             </div>
// //           </section>

// //           <div className="alert-urgent flex items-center p-4 mb-6 bg-yellow-100 border border-yellow-400 rounded">
// //             <span className="alert-icon mr-2">⚠️</span>
// //             <p>Some books are critically overdue! Take immediate action.</p>
// //           </div>

// //           <div className="summary-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //             <div className="summary-card p-4 bg-white shadow rounded">
// //               <div className="summary-number text-2xl font-bold">
// //                 {overdueBooksData.length}
// //               </div>
// //               <div className="summary-label text-gray-600">Total Overdue</div>
// //             </div>
// //             <div className="summary-card p-4 bg-white shadow rounded">
// //               <div className="summary-number critical text-2xl font-bold text-red-600">
// //                 {
// //                   overdueBooksData.filter((b) => b.priority === "critical")
// //                     .length
// //                 }
// //               </div>
// //               <div className="summary-label text-gray-600">Critical</div>
// //             </div>
// //             <div className="summary-card p-4 bg-white shadow rounded">
// //               <div className="summary-number warning text-2xl font-bold text-yellow-600">
// //                 {overdueBooksData.filter((b) => b.priority === "high").length}
// //               </div>
// //               <div className="summary-label text-gray-600">High Priority</div>
// //             </div>
// //             <div className="summary-card p-4 bg-white shadow rounded">
// //               <div className="summary-number text-2xl font-bold">
// //                 {overdueBooksData.filter((b) => b.priority === "medium").length}
// //               </div>
// //               <div className="summary-label text-gray-600">Medium Priority</div>
// //             </div>
// //           </div>

// //           <section className="filters-section mb-6">
// //             <div className="filters-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //               <div className="filter-group">
// //                 <label
// //                   htmlFor="memberName"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Member Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="memberName"
// //                   name="memberName"
// //                   value={filters.memberName}
// //                   onChange={handleFilterChange}
// //                   placeholder="Search by member name"
// //                   className="mt-1 p-2 border rounded w-full"
// //                 />
// //               </div>

// //               <div className="filter-group">
// //                 <label
// //                   htmlFor="bookTitle"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Book Title
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="bookTitle"
// //                   name="bookTitle"
// //                   value={filters.bookTitle}
// //                   onChange={handleFilterChange}
// //                   placeholder="Search by book title"
// //                   className="mt-1 p-2 border rounded w-full"
// //                 />
// //               </div>

// //               <div className="filter-group">
// //                 <label
// //                   htmlFor="priority"
// //                   className="block text-sm font-medium text-gray-700"
// //                 >
// //                   Priority
// //                 </label>
// //                 <select
// //                   id="priority"
// //                   name="priority"
// //                   value={filters.priority}
// //                   onChange={handleFilterChange}
// //                   className="mt-1 p-2 border rounded w-full"
// //                 >
// //                   <option value="">All</option>
// //                   <option value="critical">Critical</option>
// //                   <option value="high">High</option>
// //                   <option value="medium">Medium</option>
// //                 </select>
// //               </div>

// //               <div className="filter-group">
// //                 <button
// //                   className="btn mt-6 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// //                   type="button"
// //                   onClick={() =>
// //                     setFilters({ memberName: "", bookTitle: "", priority: "" })
// //                   }
// //                 >
// //                   Clear Filters
// //                 </button>
// //               </div>
// //             </div>
// //           </section>

// //           <section className="overdue-section">
// //             <div className="section-header flex justify-between items-center mb-4">
// //               <h2 className="text-2xl font-bold">Overdue Books List</h2>
// //               <div className="results-info text-gray-600">
// //                 Showing {filteredBooks.length} of {overdueBooksData.length}{" "}
// //                 overdue books
// //               </div>
// //             </div>

// //             <table className="overdue-table w-full border-collapse">
// //               <thead>
// //                 <tr className="bg-gray-100">
// //                   <th className="p-3 text-left">Book Info</th>
// //                   <th className="p-3 text-left">Member Info</th>
// //                   <th className="p-3 text-left">Overdue Days</th>
// //                   <th className="p-3 text-left">Priority</th>
// //                   <th className="p-3 text-left">Fine</th>
// //                   <th className="p-3 text-left">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {filteredBooks.length === 0 ? (
// //                   <tr>
// //                     <td colSpan="6" className="text-center p-8 text-gray-600">
// //                       No overdue books match your filters.
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   filteredBooks.map((book) => (
// //                     <tr
// //                       key={book.id}
// //                       className={
// //                         book.priority === "critical"
// //                           ? "priority-critical"
// //                           : book.priority === "high"
// //                           ? "priority-high"
// //                           : ""
// //                       }
// //                     >
// //                       <td className="book-info p-3">
// //                         <div className="book-title font-medium">
// //                           {book.bookTitle}
// //                         </div>
// //                         <div className="book-author text-gray-600">
// //                           {book.bookAuthor}
// //                         </div>
// //                       </td>
// //                       <td className="member-info p-3">
// //                         <div className="member-name font-medium">
// //                           {book.memberName}
// //                         </div>
// //                         <div className="member-id text-gray-600">
// //                           {book.memberId}
// //                         </div>
// //                       </td>
// //                       <td className="p-3">{book.overdueDays}</td>
// //                       <td className="p-3">
// //                         <span
// //                           className={`overdue-badge ${
// //                             priorityLabels[book.priority].className
// //                           }`}
// //                         >
// //                           {priorityLabels[book.priority].label}
// //                         </span>
// //                       </td>
// //                       <td className="fine-amount p-3">
// //                         ${book.fineAmount.toFixed(2)}
// //                       </td>
// //                       <td className="actions-cell p-3">
// //                         <button
// //                           className="btn btn-small btn-collect p-2 bg-green-600 text-white rounded hover:bg-green-700"
// //                           onClick={() =>
// //                             alert(`Collected fine from ${book.memberName}`)
// //                           }
// //                         >
// //                           Collect Fine
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </section>
// //         </main>
// //       </div>
// //     </>
// //   );
// // }

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/overduebooks.css"; // Import the external stylesheet

// const overdueBooksData = [
//   {
//     id: 1,
//     bookTitle: "The Great Gatsby",
//     bookAuthor: "F. Scott Fitzgerald",
//     memberName: "Alice Johnson",
//     memberId: "M123",
//     overdueDays: 10,
//     priority: "critical",
//     fineAmount: 25.0,
//   },
//   {
//     id: 2,
//     bookTitle: "1984",
//     bookAuthor: "George Orwell",
//     memberName: "Bob Smith",
//     memberId: "M456",
//     overdueDays: 5,
//     priority: "high",
//     fineAmount: 12.5,
//   },
//   {
//     id: 3,
//     bookTitle: "To Kill a Mockingbird",
//     bookAuthor: "Harper Lee",
//     memberName: "Clara Davis",
//     memberId: "M789",
//     overdueDays: 3,
//     priority: "medium",
//     fineAmount: 7.5,
//   },
// ];

// const priorityLabels = {
//   critical: {
//     label: "Critical",
//     className: "overdue-critical priority-critical",
//   },
//   high: { label: "High", className: "overdue-high priority-high" },
//   medium: { label: "Medium", className: "overdue-medium" },
// };

// export default function OverdueBooksPage() {
//   const [filters, setFilters] = useState({
//     memberName: "",
//     bookTitle: "",
//     priority: "",
//   });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const filteredBooks = overdueBooksData.filter((book) => {
//     return (
//       book.memberName
//         .toLowerCase()
//         .includes(filters.memberName.toLowerCase()) &&
//       book.bookTitle.toLowerCase().includes(filters.bookTitle.toLowerCase()) &&
//       (filters.priority === "" || book.priority === filters.priority)
//     );
//   });

//   return (
//     <>
//       <style>{`
//     /* src/styles/overduebooks.css */
// .overdue-critical,
// .priority-critical {
//   background-color: #fee2e2;
// }

// .overdue-high,
// .priority-high {
//   background-color: #fef3c7;
// }

// .overdue-medium {
//   background-color: #d1fae5;
// }

// .overdue-badge {
//   padding: 0.25rem 0.5rem;
//   border-radius: 0.25rem;
//   font-size: 0.875rem;
//   font-weight: 500;
// }

// .book-info,
// .member-info {
//   min-width: 200px;
// }

// .book-title,
// .member-name {
//   font-weight: 500;
// }

// .book-author,
// .member-id {
//   font-size: 0.875rem;
//   color: #4b5563;
// }

// .fine-amount,
// .actions-cell {
//   min-width: 100px;
// }

// .btn {
//   padding: 0.5rem 1rem;
//   border-radius: 0.25rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
// }

// .btn-small {
//   padding: 0.25rem 0.5rem;
// }

// .btn-collect {
//   background-color: #059669;
//   color: white;
//   border: none;
// }

// .btn-collect:hover {
//   background-color: #047857;
// }

// /* Additional styles to replace Tailwind classes for robustness */
// .overdue-table {
//   width: 100%;
//   border-collapse: collapse;
// }

// .overdue-table th,
// .overdue-table td {
//   padding: 0.75rem;
//   text-align: left;
// }

// .overdue-table thead tr {
//   background-color: #f3f4f6;
// }

// .alert-urgent {
//   display: flex;
//   align-items: center;
//   padding: 1rem;
//   margin-bottom: 1.5rem;
//   background-color: #fef3c7;
//   border: 1px solid #facc15;
//   border-radius: 0.25rem;
// }

// .alert-icon {
//   margin-right: 0.5rem;
// }

// .summary-card {
//   padding: 1rem;
//   background-color: white;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   border-radius: 0.25rem;
// }

// .summary-number.critical {
//   color: #dc2626;
// }

// .summary-number.warning {
//   color: #d97706;
// }

// .filters-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1rem;
// }

// .filter-group input,
// .filter-group select,
// .filter-group button {
//   padding: 0.5rem;
//   border: 1px solid #d1d5db;
//   border-radius: 0.25rem;
//   width: 100%;
//   font-size: 0.875rem;
// }

// .filter-group button {
//   background-color: #2563eb;
//   color: white;
//   border: none;
// }

// .filter-group button:hover {
//   background-color: #1d4ed8;
// }`}</style>
//       <div
//         style={{
//           margin: 0,
//           padding: 0,
//           boxSizing: "border-box",
//           fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//           backgroundColor: "#f8f9fa",
//           color: "#333",
//           lineHeight: 1.6,
//         }}
//       >
//         <header
//           style={{
//             background: "#fff",
//             borderBottom: "2px solid #e9ecef",
//             padding: "1rem 0",
//             boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <div
//             style={{
//               maxWidth: "1400px",
//               margin: "0 auto",
//               padding: "0 20px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <div
//                 style={{
//                   fontSize: "1.5rem",
//                   fontWeight: "bold",
//                   color: "#333",
//                 }}
//               >
//                 Library Management System
//               </div>
//               <Link
//                 to={"/librarian-dashboard"}
//                 style={{
//                   color: "#333",
//                   textDecoration: "none",
//                   padding: "0.5rem 1rem",
//                   border: "1px solid #e9ecef",
//                   borderRadius: "5px",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseOver={(e) => (e.target.style.borderColor = "#333")}
//                 onMouseOut={(e) => (e.target.style.borderColor = "#e9ecef")}
//               >
//                 ← Back to Dashboard
//               </Link>
//             </div>
//           </div>
//         </header>
//         <main className="main-content" style={{ padding: "2rem 0" }}>
//           <div
//             className="container mx-auto p-4"
//             style={{ maxWidth: "1400px", padding: "0 20px" }}
//           >
//             <section className="page-header mb-6">
//               <div className="header-content-page">
//                 <div className="page-title-section">
//                   <h1
//                     style={{
//                       fontSize: "2rem",
//                       color: "#333",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Overdue Books
//                   </h1>
//                   <p style={{ color: "#666", fontSize: "1.1rem" }}>
//                     Manage and collect fines for overdue books.
//                   </p>
//                 </div>
//               </div>
//             </section>

//             <div className="alert-urgent flex items-center p-4 mb-6">
//               <span className="alert-icon mr-2">⚠️</span>
//               <p>Some books are critically overdue! Take immediate action.</p>
//             </div>

//             <div className="summary-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               <div className="summary-card p-4">
//                 <div className="summary-number text-2xl font-bold">
//                   {overdueBooksData.length}
//                 </div>
//                 <div className="summary-label text-gray-600">Total Overdue</div>
//               </div>
//               <div className="summary-card p-4">
//                 <div className="summary-number critical text-2xl font-bold text-red-600">
//                   {
//                     overdueBooksData.filter((b) => b.priority === "critical")
//                       .length
//                   }
//                 </div>
//                 <div className="summary-label text-gray-600">Critical</div>
//               </div>
//               <div className="summary-card p-4">
//                 <div className="summary-number warning text-2xl font-bold text-yellow-600">
//                   {overdueBooksData.filter((b) => b.priority === "high").length}
//                 </div>
//                 <div className="summary-label text-gray-600">High Priority</div>
//               </div>
//               <div className="summary-card p-4">
//                 <div className="summary-number text-2xl font-bold">
//                   {
//                     overdueBooksData.filter((b) => b.priority === "medium")
//                       .length
//                   }
//                 </div>
//                 <div className="summary-label text-gray-600">
//                   Medium Priority
//                 </div>
//               </div>
//             </div>

//             <section className="filters-section mb-6">
//               <div className="filters-grid">
//                 <div className="filter-group">
//                   <label
//                     htmlFor="memberName"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Member Name
//                   </label>
//                   <input
//                     type="text"
//                     id="memberName"
//                     name="memberName"
//                     value={filters.memberName}
//                     onChange={handleFilterChange}
//                     placeholder="Search by member name"
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                 </div>

//                 <div className="filter-group">
//                   <label
//                     htmlFor="bookTitle"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Book Title
//                   </label>
//                   <input
//                     type="text"
//                     id="bookTitle"
//                     name="bookTitle"
//                     value={filters.bookTitle}
//                     onChange={handleFilterChange}
//                     placeholder="Search by book title"
//                     className="mt-1 p-2 border rounded w-full"
//                   />
//                 </div>

//                 <div className="filter-group">
//                   <label
//                     htmlFor="priority"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Priority
//                   </label>
//                   <select
//                     id="priority"
//                     name="priority"
//                     value={filters.priority}
//                     onChange={handleFilterChange}
//                     className="mt-1 p-2 border rounded w-full"
//                   >
//                     <option value="">All</option>
//                     <option value="critical">Critical</option>
//                     <option value="high">High</option>
//                     <option value="medium">Medium</option>
//                   </select>
//                 </div>

//                 <div className="filter-group">
//                   <button
//                     className="btn mt-6 p-2"
//                     type="button"
//                     onClick={() =>
//                       setFilters({
//                         memberName: "",
//                         bookTitle: "",
//                         priority: "",
//                       })
//                     }
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               </div>
//             </section>

//             <section className="overdue-section">
//               <div className="section-header flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold">Overdue Books List</h2>
//                 <div className="results-info text-gray-600">
//                   Showing {filteredBooks.length} of {overdueBooksData.length}{" "}
//                   overdue books
//                 </div>
//               </div>

//               <table className="overdue-table w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="p-3 text-left">Book Info</th>
//                     <th className="p-3 text-left">Member Info</th>
//                     <th className="p-3 text-left">Overdue Days</th>
//                     <th className="p-3 text-left">Priority</th>
//                     <th className="p-3 text-left">Fine</th>
//                     <th className="p-3 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredBooks.length === 0 ? (
//                     <tr>
//                       <td colSpan="6" className="text-center p-8 text-gray-600">
//                         No overdue books match your filters.
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredBooks.map((book) => (
//                       <tr
//                         key={book.id}
//                         className={
//                           book.priority === "critical"
//                             ? "priority-critical"
//                             : book.priority === "high"
//                             ? "priority-high"
//                             : ""
//                         }
//                       >
//                         <td className="book-info p-3">
//                           <div className="book-title font-medium">
//                             {book.bookTitle}
//                           </div>
//                           <div className="book-author text-gray-600">
//                             {book.bookAuthor}
//                           </div>
//                         </td>
//                         <td className="member-info p-3">
//                           <div className="member-name font-medium">
//                             {book.memberName}
//                           </div>
//                           <div className="member-id text-gray-600">
//                             {book.memberId}
//                           </div>
//                         </td>
//                         <td className="p-3">{book.overdueDays}</td>
//                         <td className="p-3">
//                           <span
//                             className={`overdue-badge ${
//                               priorityLabels[book.priority].className
//                             }`}
//                           >
//                             {priorityLabels[book.priority].label}
//                           </span>
//                         </td>
//                         <td className="fine-amount p-3">
//                           ₹{book.fineAmount.toFixed(2)}
//                         </td>
//                         <td className="actions-cell p-3">
//                           <button
//                             className="btn btn-small btn-collect p-2"
//                             onClick={() =>
//                               alert(`Collected fine from ${book.memberName}`)
//                             }
//                           >
//                             Collect Fine
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </section>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";

const overdueBooksData = [
  {
    id: 1,
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
    memberName: "Alice Johnson",
    memberId: "M123",
    copyId: "#007",
    dueDate: "July 15, 2025",
    overdueDays: 10,
    priority: "critical",
    fineAmount: 25.0,
  },
  {
    id: 2,
    bookTitle: "1984",
    bookAuthor: "George Orwell",
    memberName: "Bob Smith",
    memberId: "M456",
    copyId: "#003",
    dueDate: "July 18, 2025",
    overdueDays: 5,
    priority: "high",
    fineAmount: 12.5,
  },
  {
    id: 3,
    bookTitle: "To Kill a Mockingbird",
    bookAuthor: "Harper Lee",
    memberName: "Clara Davis",
    memberId: "M789",
    copyId: "#002",
    dueDate: "July 20, 2025",
    overdueDays: 3,
    priority: "medium",
    fineAmount: 7.5,
  },
];

const priorityLabels = {
  critical: {
    label: "Critical",
    background: "#f8d7da",
    color: "#721c24",
    rowBackground: "#fff5f5",
    borderLeft: "4px solid #dc3545",
  },
  high: {
    label: "High",
    background: "#fff3cd",
    color: "#856404",
    rowBackground: "#fffbf0",
    borderLeft: "4px solid #ffc107",
  },
  medium: {
    label: "Medium",
    background: "#ffeaa7",
    color: "#856404",
    rowBackground: "transparent",
    borderLeft: "none",
  },
};

export default function OverdueBooksPage() {
  const [filters, setFilters] = useState({
    memberName: "",
    bookTitle: "",
    priority: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredBooks = overdueBooksData.filter((book) => {
    return (
      book.memberName
        .toLowerCase()
        .includes(filters.memberName.toLowerCase()) &&
      book.bookTitle.toLowerCase().includes(filters.bookTitle.toLowerCase()) &&
      (filters.priority === "" || book.priority === filters.priority)
    );
  });

  const collectFine = (memberName) => {
    alert(`Collected fine from ${memberName}`);
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
          style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}
            >
              Library Management System
            </div>
            <Link
              to="/librarian-dashboard"
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

      <main style={{ padding: "2rem 0" }}>
        <div
          style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 20px" }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              border: "1px solid #e9ecef",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "2rem",
                    color: "#333",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Overdue Books
                </h1>
                <p style={{ color: "#666", fontSize: "1.1rem" }}>
                  Track and manage books past their return due date
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#f8d7da",
              border: "1px solid #f5c6cb",
              color: "#721c24",
              padding: "1rem",
              borderRadius: "5px",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }}
          >
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>🚨</div>
            <div>
              <strong>Urgent Action Required:</strong>{" "}
              {overdueBooksData.filter((b) => b.priority === "critical").length}{" "}
              books are critically overdue (15+ days). Please contact members
              immediately and collect outstanding fines.
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
                textAlign: "center",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#dc3545",
                }}
              >
                {overdueBooksData.length}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Total Overdue
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
                textAlign: "center",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#dc3545",
                }}
              >
                {
                  overdueBooksData.filter((b) => b.priority === "critical")
                    .length
                }
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Critical (15+ days)
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
                textAlign: "center",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#ffc107",
                }}
              >
                {overdueBooksData.filter((b) => b.priority === "high").length}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                High Priority (7+ days)
              </div>
            </div>
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
                textAlign: "center",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                ₹
                {overdueBooksData
                  .reduce((sum, book) => sum + book.fineAmount, 0)
                  .toFixed(2)}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Total Fines Due
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "10px",
              border: "1px solid #e9ecef",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                alignItems: "end",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                    color: "#333",
                  }}
                  htmlFor="priority"
                >
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={filters.priority}
                  onChange={handleFilterChange}
                  style={{
                    padding: "0.6rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#333")}
                  onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                >
                  <option value="">All Overdue Books</option>
                  <option value="critical">Critical (15+ days)</option>
                  <option value="high">High (7-14 days)</option>
                  <option value="medium">Medium (1-6 days)</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                    color: "#333",
                  }}
                  htmlFor="memberName"
                >
                  Member
                </label>
                <input
                  type="text"
                  id="memberName"
                  name="memberName"
                  value={filters.memberName}
                  onChange={handleFilterChange}
                  placeholder="Search by member name or ID..."
                  style={{
                    padding: "0.6rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#333")}
                  onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                    color: "#333",
                  }}
                  htmlFor="bookTitle"
                >
                  Book
                </label>
                <input
                  type="text"
                  id="bookTitle"
                  name="bookTitle"
                  value={filters.bookTitle}
                  onChange={handleFilterChange}
                  placeholder="Search by book title..."
                  style={{
                    padding: "0.6rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#333")}
                  onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                  onClick={() =>
                    setFilters({ memberName: "", bookTitle: "", priority: "" })
                  }
                  style={{
                    padding: "0.6rem 1.2rem",
                    background: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#555")}
                  onMouseOut={(e) => (e.target.style.background = "#333")}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              border: "1px solid #e9ecef",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "1px solid #e9ecef",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  color: "#333",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Overdue Books List
              </h2>
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                Showing {filteredBooks.length} of {overdueBooksData.length}{" "}
                overdue books
              </span>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f9fa" }}>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Book Details
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Member
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Copy ID
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Due Date
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Days Overdue
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Priority
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Fine Amount
                  </th>
                  <th
                    style={{
                      padding: "1rem",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        padding: "2rem",
                        textAlign: "center",
                        color: "#666",
                      }}
                    >
                      No overdue books match your filters.
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book) => (
                    <tr
                      key={book.id}
                      style={{
                        borderBottom: "1px solid #e9ecef",
                        background: priorityLabels[book.priority].rowBackground,
                        borderLeft: priorityLabels[book.priority].borderLeft,
                        transition: "background 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#f8f9fa")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background =
                          priorityLabels[book.priority].rowBackground)
                      }
                    >
                      <td style={{ padding: "1rem", minWidth: "200px" }}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              fontWeight: 500,
                              color: "#333",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {book.bookTitle}
                          </div>
                          <div
                            style={{
                              fontSize: "0.9rem",
                              color: "#666",
                              fontStyle: "italic",
                            }}
                          >
                            by {book.bookAuthor}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "1rem", minWidth: "200px" }}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            style={{
                              fontWeight: 500,
                              color: "#333",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {book.memberName}
                          </div>
                          <div style={{ fontSize: "0.9rem", color: "#666" }}>
                            {book.memberId}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <strong>{book.copyId}</strong>
                      </td>
                      <td style={{ padding: "1rem" }}>{book.dueDate}</td>
                      <td
                        style={{
                          padding: "1rem",
                          color:
                            book.priority === "critical"
                              ? "#dc3545"
                              : book.priority === "high"
                              ? "#ffc107"
                              : "#856404",
                          fontWeight: "bold",
                        }}
                      >
                        {book.overdueDays} days
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span
                          style={{
                            padding: "0.3rem 0.8rem",
                            borderRadius: "15px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            background:
                              priorityLabels[book.priority].background,
                            color: priorityLabels[book.priority].color,
                          }}
                        >
                          {priorityLabels[book.priority].label}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "1rem",
                          fontWeight: 500,
                          fontSize: "1.1rem",
                          color: "#dc3545",
                          minWidth: "100px",
                        }}
                      >
                        ₹{book.fineAmount.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "1rem",
                          display: "flex",
                          gap: "0.5rem",
                          minWidth: "100px",
                          flexDirection:
                            window.innerWidth <= 768 ? "column" : "row",
                        }}
                      >
                        <button
                          onClick={() => collectFine(book.memberName)}
                          style={{
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.8rem",
                            borderRadius: "3px",
                            background: "#dc3545",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.background = "#c82333")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.background = "#dc3545")
                          }
                        >
                          Collect Fine
                        </button>
                        <button
                          onClick={() => alert(`Contacted ${book.memberName}`)}
                          style={{
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.8rem",
                            borderRadius: "3px",
                            background: "transparent",
                            color: "#333",
                            border: "2px solid #333",
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
                          Contact
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

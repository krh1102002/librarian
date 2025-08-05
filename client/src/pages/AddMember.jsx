// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Layout from "../components/Layout/Layout";

// const AddMember = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.fullName || !formData.email || !formData.phone) {
//       alert("All fields are required");
//       return;
//     }

//     // Registration logic (simulated as per original alert)
//     console.log("Registration attempt:", formData);
//     alert(
//       "Registration functionality will be implemented with backend integration"
//     );

//     // Navigate to dashboard after submission (simulating success)
//     navigate("/librarian-dashboard");
//   };

//   return (
//     <Layout showHeader={true} userRole="Librarian" userName="Sarah Johnson">
//       <div
//         style={{
//           position: "absolute",
//           top: "2rem",
//           left: "2rem",
//         }}
//       >
//         <Link
//           to="/librarian-dashboard"
//           style={{
//             color: "#333",
//             textDecoration: "none",
//             fontSize: "0.9rem",
//             padding: "0.5rem 1rem",
//             border: "1px solid #e9ecef",
//             borderRadius: "5px",
//             background: "#fff",
//             transition: "all 0.3s ease",
//           }}
//           onMouseOver={(e) => (e.target.style.borderColor = "#333")}
//           onMouseOut={(e) => (e.target.style.borderColor = "#e9ecef")}
//         >
//           ← Dashboard
//         </Link>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "calc(100vh - 4rem)", // Adjust for header height (2rem top padding + 2rem bottom padding from Layout)
//           padding: "1rem",
//         }}
//       >
//         <div
//           style={{
//             background: "#fff",
//             padding: "3rem 2.5rem",
//             borderRadius: "10px",
//             border: "1px solid #e9ecef",
//             boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//             width: "100%",
//             maxWidth: "500px",
//             margin: "1rem",
//           }}
//         >
//           <div
//             style={{
//               textAlign: "center",
//               marginBottom: "2rem",
//             }}
//           >
//             <h1
//               style={{
//                 fontSize: "1.8rem",
//                 color: "#333",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Add New Member
//             </h1>
//             <p
//               style={{
//                 color: "#666",
//                 fontSize: "0.9rem",
//               }}
//             >
//               Create new member account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} id="registerForm">
//             <div
//               style={{
//                 marginBottom: "1.5rem",
//               }}
//             >
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontWeight: "500",
//                   color: "#333",
//                 }}
//                 htmlFor="fullName"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="fullName"
//                 name="fullName"
//                 placeholder="Enter your full name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "2px solid #e9ecef",
//                   borderRadius: "5px",
//                   fontSize: "1rem",
//                   transition: "border-color 0.3s ease",
//                 }}
//                 onFocus={(e) => (e.target.style.borderColor = "#333")}
//                 onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
//               />
//             </div>

//             <div
//               style={{
//                 marginBottom: "1.5rem",
//               }}
//             >
//               <label
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontWeight: "500",
//                   color: "#333",
//                 }}
//                 htmlFor="email"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "2px solid #e9ecef",
//                   borderRadius: "5px",
//                   fontSize: "1rem",
//                   transition: "border-color 0.3s ease",
//                 }}
//                 onFocus={(e) => (e.target.style.borderColor = "#333")}
//                 onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
//               />
//             </div>

//             <div
//               style={{
//                 marginBottom: "1.5rem",
//                 display: "grid",
//                 gridTemplateColumns: "1fr",
//                 gap: "1rem",
//               }}
//             >
//               <div>
//                 <label
//                   style={{
//                     display: "block",
//                     marginBottom: "0.5rem",
//                     fontWeight: "500",
//                     color: "#333",
//                   }}
//                   htmlFor="phone"
//                 >
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   placeholder="Your phone number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem",
//                     border: "2px solid #e9ecef",
//                     borderRadius: "5px",
//                     fontSize: "1rem",
//                     transition: "border-color 0.3s ease",
//                   }}
//                   onFocus={(e) => (e.target.style.borderColor = "#333")}
//                   onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
//                 />
//               </div>
//             </div>

//             <div
//               style={{
//                 fontSize: "0.85rem",
//                 color: "#666",
//                 marginBottom: "1.5rem",
//                 lineHeight: "1.4",
//               }}
//             >
//               The default password will be same as email id. Member can change
//               it from his profile settings.
//             </div>

//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 padding: "0.75rem",
//                 background: "#333",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "5px",
//                 fontSize: "1rem",
//                 fontWeight: "500",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//               }}
//               onMouseOver={(e) => (e.target.style.background = "#555")}
//               onMouseOut={(e) => (e.target.style.background = "#333")}
//             >
//               Create Account
//             </button>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AddMember;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddMember = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("All fields are required");
      return;
    }

    // Registration logic (simulated as per original alert)
    console.log("Registration attempt:", formData);
    alert(
      "Registration functionality will be implemented with backend integration"
    );

    // Navigate to dashboard after submission (simulating success)
    navigate("/librarian-dashboard");
  };

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
            maxWidth: "1000px",
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
              padding: "3rem 2.5rem",
              borderRadius: "10px",
              border: "1px solid #e9ecef",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "500px",
              margin: "1rem auto",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              <h1
                style={{
                  fontSize: "1.8rem",
                  color: "#333",
                  marginBottom: "0.5rem",
                }}
              >
                Add New Member
              </h1>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                Create new member account
              </p>
            </div>

            <form onSubmit={handleSubmit} id="registerForm">
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
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
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
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
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
              </div>

              <div
                style={{
                  marginBottom: "1.5rem",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
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
                </div>
              </div>

              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#666",
                  marginBottom: "1.5rem",
                  lineHeight: "1.4",
                }}
              >
                The default password will be same as email id. Member can change
                it from his profile settings.
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.background = "#555")}
                onMouseOut={(e) => (e.target.style.background = "#333")}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddMember;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../components/Layout/Layout";

// export default function AddBookForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     bookTitle: "",
//     author: "",
//     subject: "",
//     isbn: "",
//     price: "",
//     description: "",
//     copyOption: "later",
//     copyCount: 1,
//     defaultRack: "",
//   });

//   const [messages, setMessages] = useState({ error: "", success: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCopyOption = (e) => {
//     setFormData((prev) => ({ ...prev, copyOption: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setMessages({ error: "", success: "" });

//     const {
//       bookTitle,
//       author,
//       subject,
//       isbn,
//       price,
//       copyOption,
//       copyCount,
//       defaultRack,
//     } = formData;

//     if (!bookTitle || !author || !subject || !isbn || !price) {
//       setMessages({
//         error: "Please fill in all required fields.",
//         success: "",
//       });
//       return;
//     }

//     const isbnPattern = /^978-\d{10}$/;
//     if (!isbnPattern.test(isbn)) {
//       setMessages({
//         error: "Please enter a valid ISBN in format: 978-XXXXXXXXX",
//         success: "",
//       });
//       return;
//     }

//     if (parseFloat(price) <= 0) {
//       setMessages({ error: "Price must be greater than 0.", success: "" });
//       return;
//     }

//     if (copyOption === "now" && (!copyCount || !defaultRack)) {
//       setMessages({
//         error: "Please specify copy count and rack location.",
//         success: "",
//       });
//       return;
//     }

//     console.log("Book data submitted:", formData);
//     setMessages({
//       error: "",
//       success: `Book "${bookTitle}" has been successfully added to the library!`,
//     });

//     setTimeout(() => {
//       if (
//         window.confirm(
//           "Book added successfully! Would you like to add another book?"
//         )
//       ) {
//         setFormData({
//           bookTitle: "",
//           author: "",
//           subject: "",
//           isbn: "",
//           price: "",
//           description: "",
//           copyOption: "later",
//           copyCount: 1,
//           defaultRack: "",
//         });
//       } else {
//         navigate("/books-catalog");
//       }
//     }, 1500);
//   };

//   return (
//     <Layout>
//       <div
//         style={{
//           background: "#fff",
//           padding: "3rem",
//           borderRadius: "10px",
//           border: "1px solid #e9ecef",
//           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <div style={{ textAlign: "center", marginBottom: "2rem" }}>
//           <h1 style={{ fontSize: "2rem", color: "#333" }}>Add New Book</h1>
//           <p style={{ color: "#666", fontSize: "1.1rem" }}>
//             Register a new book title in the library system
//           </p>
//         </div>

//         {messages.error && (
//           <div
//             style={{
//               background: "#f8d7da",
//               padding: "1rem",
//               borderRadius: 5,
//               color: "#721c24",
//               marginBottom: 16,
//             }}
//           >
//             {messages.error}
//           </div>
//         )}
//         {messages.success && (
//           <div
//             style={{
//               background: "#d4edda",
//               padding: "1rem",
//               borderRadius: 5,
//               color: "#155724",
//               marginBottom: 16,
//             }}
//           >
//             {messages.success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: "2rem" }}>
//             <h2
//               style={{
//                 fontSize: "1.3rem",
//                 color: "#333",
//                 borderBottom: "2px solid #e9ecef",
//                 paddingBottom: "0.5rem",
//                 marginBottom: "1rem",
//               }}
//             >
//               Book Information
//             </h2>

//             <div style={{ marginBottom: "1.5rem" }}>
//               <label>
//                 Book Title <span style={{ color: "#dc3545" }}>*</span>
//               </label>
//               <input
//                 type="text"
//                 name="bookTitle"
//                 value={formData.bookTitle}
//                 onChange={handleChange}
//                 placeholder="Enter the complete book title"
//                 required
//                 style={inputStyle}
//               />
//               <div style={helpTextStyle}>
//                 Enter the full title as it appears on the book cover
//               </div>
//             </div>

//             <div style={formRowStyle}>
//               <div style={{ marginBottom: "1.5rem" }}>
//                 <label>
//                   Author <span style={{ color: "#dc3545" }}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                   placeholder="Author name(s)"
//                   required
//                   style={inputStyle}
//                 />
//                 <div style={helpTextStyle}>
//                   For multiple authors, separate with commas
//                 </div>
//               </div>

//               <div style={{ marginBottom: "1.5rem" }}>
//                 <label>
//                   Subject <span style={{ color: "#dc3545" }}>*</span>
//                 </label>
//                 <select
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   style={inputStyle}
//                 >
//                   <option value="">Select Subject</option>
//                   <option value="programming">Programming</option>
//                   <option value="science">Science</option>
//                   <option value="mathematics">Mathematics</option>
//                   <option value="literature">Literature</option>
//                   <option value="history">History</option>
//                   <option value="philosophy">Philosophy</option>
//                   <option value="business">Business</option>
//                   <option value="arts">Arts</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div style={formRowStyle}>
//               <div style={{ marginBottom: "1.5rem" }}>
//                 <label>
//                   ISBN <span style={{ color: "#dc3545" }}>*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="isbn"
//                   value={formData.isbn}
//                   onChange={handleChange}
//                   placeholder="978-XXXXXXXXX"
//                   required
//                   style={inputStyle}
//                 />
//                 <div style={helpTextStyle}>
//                   13-digit ISBN number (including hyphens)
//                 </div>
//               </div>
//               <div style={{ marginBottom: "1.5rem" }}>
//                 <label>
//                   Price (₹) <span style={{ color: "#dc3545" }}>*</span>
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   placeholder="0.00"
//                   step="0.01"
//                   min="0"
//                   required
//                   style={inputStyle}
//                 />
//                 <div style={helpTextStyle}>Book purchase price in rupees</div>
//               </div>
//             </div>

//             <div style={{ marginBottom: "1.5rem" }}>
//               <label>Description (Optional)</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Brief description or summary of the book..."
//                 style={{ ...inputStyle, minHeight: "100px" }}
//               ></textarea>
//               <div style={helpTextStyle}>
//                 Optional book summary or description for library records
//               </div>
//             </div>
//           </div>

//           <div style={{ marginBottom: "2rem" }}>
//             <h2
//               style={{
//                 fontSize: "1.3rem",
//                 color: "#333",
//                 borderBottom: "2px solid #e9ecef",
//                 paddingBottom: "0.5rem",
//                 marginBottom: "1rem",
//               }}
//             >
//               Initial Copies
//             </h2>

//             <div
//               style={{
//                 background: "#f8f9fa",
//                 padding: "1.5rem",
//                 borderRadius: 8,
//                 border: "1px solid #e9ecef",
//               }}
//             >
//               <h3 style={{ color: "#333", marginBottom: "1rem" }}>
//                 How many copies would you like to add initially?
//               </h3>
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "2rem",
//                   marginBottom: "1rem",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <label style={radioGroupStyle}>
//                   <input
//                     type="radio"
//                     name="copyOption"
//                     value="later"
//                     checked={formData.copyOption === "later"}
//                     onChange={handleCopyOption}
//                   />
//                   Add copies later
//                 </label>
//                 <label style={radioGroupStyle}>
//                   <input
//                     type="radio"
//                     name="copyOption"
//                     value="now"
//                     checked={formData.copyOption === "now"}
//                     onChange={handleCopyOption}
//                   />
//                   Add copies now
//                 </label>
//               </div>

//               {formData.copyOption === "now" && (
//                 <div style={formRowStyle}>
//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label>Number of Copies</label>
//                     <input
//                       type="number"
//                       name="copyCount"
//                       min="1"
//                       max="20"
//                       value={formData.copyCount}
//                       onChange={handleChange}
//                       style={inputStyle}
//                     />
//                     <div style={helpTextStyle}>
//                       How many physical copies to add (1-20)
//                     </div>
//                   </div>
//                   <div style={{ marginBottom: "1.5rem" }}>
//                     <label>Default Rack Location</label>
//                     <select
//                       name="defaultRack"
//                       value={formData.defaultRack}
//                       onChange={handleChange}
//                       style={inputStyle}
//                     >
//                       <option value="">Select Rack</option>
//                       {[...Array(8)].map((_, i) => (
//                         <option key={i + 1} value={i + 1}>{`Rack ${
//                           i + 1
//                         }`}</option>
//                       ))}
//                     </select>
//                     <div style={helpTextStyle}>
//                       Rack where copies will be placed
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               gap: "1rem",
//               justifyContent: "center",
//               marginTop: "2rem",
//               borderTop: "1px solid #e9ecef",
//               paddingTop: "2rem",
//             }}
//           >
//             <button type="submit" style={btnStyle}>
//               Add Book to Library
//             </button>
//             <button
//               type="button"
//               style={{ ...btnStyle, ...btnSecondaryStyle }}
//               onClick={() => navigate("/books-catalog")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </Layout>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "0.75rem",
//   border: "2px solid #e9ecef",
//   borderRadius: "5px",
//   fontSize: "1rem",
//   fontFamily: "inherit",
// };

// const helpTextStyle = {
//   fontSize: "0.9rem",
//   color: "#666",
//   marginTop: "0.3rem",
// };

// const btnStyle = {
//   padding: "0.75rem 1.5rem",
//   border: "2px solid #333",
//   background: "#333",
//   color: "#fff",
//   fontWeight: 500,
//   borderRadius: "5px",
//   fontSize: "1rem",
//   cursor: "pointer",
// };

// const btnSecondaryStyle = {
//   background: "transparent",
//   color: "#333",
// };

// const formRowStyle = {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   gap: "1rem",
// };

// const radioGroupStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
// };

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AddBookForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    subject: "",
    isbn: "",
    price: "",
    description: "",
    copyOption: "later",
    copyCount: 1,
    defaultRack: "",
  });

  const [messages, setMessages] = useState({ error: "", success: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyOption = (e) => {
    setFormData((prev) => ({ ...prev, copyOption: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages({ error: "", success: "" });

    const {
      bookTitle,
      author,
      subject,
      isbn,
      price,
      copyOption,
      copyCount,
      defaultRack,
    } = formData;

    if (!bookTitle || !author || !subject || !isbn || !price) {
      setMessages({
        error: "Please fill in all required fields.",
        success: "",
      });
      return;
    }

    const isbnPattern = /^978-\d{10}$/;
    if (!isbnPattern.test(isbn)) {
      setMessages({
        error: "Please enter a valid ISBN in format: 978-XXXXXXXXX",
        success: "",
      });
      return;
    }

    if (parseFloat(price) <= 0) {
      setMessages({ error: "Price must be greater than 0.", success: "" });
      return;
    }

    if (copyOption === "now" && (!copyCount || !defaultRack)) {
      setMessages({
        error: "Please specify copy count and rack location.",
        success: "",
      });
      return;
    }

    console.log("Book data submitted:", formData);
    setMessages({
      error: "",
      success: `Book "${bookTitle}" has been successfully added to the library!`,
    });

    setTimeout(() => {
      if (
        window.confirm(
          "Book added successfully! Would you like to add another book?"
        )
      ) {
        setFormData({
          bookTitle: "",
          author: "",
          subject: "",
          isbn: "",
          price: "",
          description: "",
          copyOption: "later",
          copyCount: 1,
          defaultRack: "",
        });
      } else {
        navigate("/books-catalog");
      }
    }, 1500);
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
              padding: "3rem",
              borderRadius: "10px",
              border: "1px solid #e9ecef",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "2rem", color: "#333" }}>Add New Book</h1>
              <p style={{ color: "#666", fontSize: "1.1rem" }}>
                Register a new book title in the library system
              </p>
            </div>

            {messages.error && (
              <div
                style={{
                  background: "#f8d7da",
                  padding: "1rem",
                  borderRadius: 5,
                  color: "#721c24",
                  marginBottom: 16,
                }}
              >
                {messages.error}
              </div>
            )}
            {messages.success && (
              <div
                style={{
                  background: "#d4edda",
                  padding: "1rem",
                  borderRadius: 5,
                  color: "#155724",
                  marginBottom: 16,
                }}
              >
                {messages.success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "2rem" }}>
                <h2
                  style={{
                    fontSize: "1.3rem",
                    color: "#333",
                    borderBottom: "2px solid #e9ecef",
                    paddingBottom: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  Book Information
                </h2>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label>
                    Book Title <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="bookTitle"
                    value={formData.bookTitle}
                    onChange={handleChange}
                    placeholder="Enter the complete book title"
                    required
                    style={inputStyle}
                  />
                  <div style={helpTextStyle}>
                    Enter the full title as it appears on the book cover
                  </div>
                </div>

                <div style={formRowStyle}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label>
                      Author <span style={{ color: "#dc3545" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Author name(s)"
                      required
                      style={inputStyle}
                    />
                    <div style={helpTextStyle}>
                      For multiple authors, separate with commas
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <label>
                      Subject <span style={{ color: "#dc3545" }}>*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    >
                      <option value="">Select Subject</option>
                      <option value="programming">Programming</option>
                      <option value="science">Science</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="literature">Literature</option>
                      <option value="history">History</option>
                      <option value="philosophy">Philosophy</option>
                      <option value="business">Business</option>
                      <option value="arts">Arts</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={formRowStyle}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label>
                      ISBN <span style={{ color: "#dc3545" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleChange}
                      placeholder="978-XXXXXXXXX"
                      required
                      style={inputStyle}
                    />
                    <div style={helpTextStyle}>
                      13-digit ISBN number (including hyphens)
                    </div>
                  </div>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label>
                      Price (₹) <span style={{ color: "#dc3545" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                      style={inputStyle}
                    />
                    <div style={helpTextStyle}>
                      Book purchase price in rupees
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label>Description (Optional)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description or summary of the book..."
                    style={{ ...inputStyle, minHeight: "100px" }}
                  ></textarea>
                  <div style={helpTextStyle}>
                    Optional book summary or description for library records
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <h2
                  style={{
                    fontSize: "1.3rem",
                    color: "#333",
                    borderBottom: "2px solid #e9ecef",
                    paddingBottom: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  Initial Copies
                </h2>

                <div
                  style={{
                    background: "#f8f9fa",
                    padding: "1.5rem",
                    borderRadius: 8,
                    border: "1px solid #e9ecef",
                  }}
                >
                  <h3 style={{ color: "#333", marginBottom: "1rem" }}>
                    How many copies would you like to add initially?
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "2rem",
                      marginBottom: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <label style={radioGroupStyle}>
                      <input
                        type="radio"
                        name="copyOption"
                        value="later"
                        checked={formData.copyOption === "later"}
                        onChange={handleCopyOption}
                      />
                      Add copies later
                    </label>
                    <label style={radioGroupStyle}>
                      <input
                        type="radio"
                        name="copyOption"
                        value="now"
                        checked={formData.copyOption === "now"}
                        onChange={handleCopyOption}
                      />
                      Add copies now
                    </label>
                  </div>

                  {formData.copyOption === "now" && (
                    <div style={formRowStyle}>
                      <div style={{ marginBottom: "1.5rem" }}>
                        <label>Number of Copies</label>
                        <input
                          type="number"
                          name="copyCount"
                          min="1"
                          max="20"
                          value={formData.copyCount}
                          onChange={handleChange}
                          style={inputStyle}
                        />
                        <div style={helpTextStyle}>
                          How many physical copies to add (1-20)
                        </div>
                      </div>
                      <div style={{ marginBottom: "1.5rem" }}>
                        <label>Default Rack Location</label>
                        <select
                          name="defaultRack"
                          value={formData.defaultRack}
                          onChange={handleChange}
                          style={inputStyle}
                        >
                          <option value="">Select Rack</option>
                          {[...Array(8)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>{`Rack ${
                              i + 1
                            }`}</option>
                          ))}
                        </select>
                        <div style={helpTextStyle}>
                          Rack where copies will be placed
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  marginTop: "2rem",
                  borderTop: "1px solid #e9ecef",
                  paddingTop: "2rem",
                }}
              >
                <button type="submit" style={btnStyle}>
                  Add Book to Library
                </button>
                <button
                  type="button"
                  style={{ ...btnStyle, ...btnSecondaryStyle }}
                  onClick={() => navigate("/books-catalog")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: "2px solid #e9ecef",
  borderRadius: "5px",
  fontSize: "1rem",
  fontFamily: "inherit",
};

const helpTextStyle = {
  fontSize: "0.9rem",
  color: "#666",
  marginTop: "0.3rem",
};

const btnStyle = {
  padding: "0.75rem 1.5rem",
  border: "2px solid #333",
  background: "#333",
  color: "#fff",
  fontWeight: 500,
  borderRadius: "5px",
  fontSize: "1rem",
  cursor: "pointer",
};

const btnSecondaryStyle = {
  background: "transparent",
  color: "#333",
};

const formRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
};

const radioGroupStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
};

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const mockMembers = [
  {
    id: 1234,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    status: "active",
    payment: "paid",
  },
  {
    id: 1235,
    name: "Alice Smith",
    email: "alice.smith@email.com",
    phone: "+91 9876543211",
    status: "active",
    payment: "paid",
  },
  {
    id: 1025,
    name: "Robert Johnson",
    email: "robert.j@email.com",
    phone: "+91 9876543212",
    status: "active",
    payment: "due",
  },
];

const mockBooks = [
  {
    id: 1,
    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    subject: "Programming",
    available: 3,
  },
  {
    id: 2,
    name: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    subject: "Programming",
    available: 1,
  },
  {
    id: 3,
    name: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    subject: "Programming",
    available: 4,
  },
];

const IssueBook = () => {
  const [memberSearch, setMemberSearch] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [copySelect, setCopySelect] = useState("");
  const [memberResults, setMemberResults] = useState([]);
  const [bookResults, setBookResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [isIssueButtonDisabled, setIsIssueButtonDisabled] = useState(true);
  const memberResultsRef = useRef(null);
  const bookResultsRef = useRef(null);

  // Auto-hide success message after 2 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        if (window.confirm("Book issued successfully! Issue another book?")) {
          resetForm();
        } else {
          window.location.href = "librarian-dashboard.html";
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle clicks outside search results
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        memberResultsRef.current &&
        !memberResultsRef.current.contains(e.target)
      ) {
        setMemberResults([]);
      }
      if (
        bookResultsRef.current &&
        !bookResultsRef.current.contains(e.target)
      ) {
        setBookResults([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMemberSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setMemberSearch(e.target.value);

    if (query.length < 2) {
      setMemberResults([]);
      return;
    }

    const filtered = mockMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.id.toString().includes(query)
    );
    setMemberResults(filtered);
  };

  const handleBookSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setBookSearch(e.target.value);

    if (query.length < 2) {
      setBookResults([]);
      return;
    }

    const filtered = mockBooks.filter(
      (book) =>
        book.name.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
    setBookResults(filtered);
  };

  const selectMember = (member) => {
    setSelectedMember(member);
    setMemberSearch(`${member.name} (${member.id})`);
    setMemberResults([]);
    if (member.payment !== "paid") {
      setWarningMessage(
        "This member has unpaid fees. Please collect payment before issuing books."
      );
      setIsIssueButtonDisabled(true);
    } else {
      setWarningMessage("");
      setErrorMessage("");
      checkFormValidity();
    }
  };

  const selectBook = (book) => {
    setSelectedBook(book);
    setBookSearch(book.name);
    setBookResults([]);
    if (book.available === 0) {
      setErrorMessage("This book has no available copies for issue.");
      setIsIssueButtonDisabled(true);
    } else {
      setErrorMessage("");
      checkFormValidity();
    }
  };

  const handleCopySelect = (e) => {
    setCopySelect(e.target.value);
    checkFormValidity();
  };

  const checkFormValidity = () => {
    if (
      selectedMember &&
      selectedBook &&
      copySelect &&
      selectedMember.payment === "paid"
    ) {
      setIsIssueButtonDisabled(false);
    } else {
      setIsIssueButtonDisabled(true);
    }
  };

  const resetForm = () => {
    setSelectedMember(null);
    setSelectedBook(null);
    setMemberSearch("");
    setBookSearch("");
    setCopySelect("");
    setMemberResults([]);
    setBookResults([]);
    setErrorMessage("");
    setSuccessMessage("");
    setWarningMessage("");
    setIsIssueButtonDisabled(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMember && selectedBook && copySelect) {
      console.log("Issue book:", {
        member: selectedMember,
        book: selectedBook,
        copy: copySelect,
        issueDate: new Date(),
        returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      setSuccessMessage(
        `Book "${selectedBook.name}" (${copySelect}) issued successfully to ${selectedMember.name}!`
      );
    }
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
              Issue Book
            </h1>
            <p
              style={{
                color: "#666",
                fontSize: "1.1rem",
              }}
            >
              Issue books to registered library members
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              marginBottom: "2rem",
              "@media (max-width: 768px)": {
                gridTemplateColumns: "1fr",
              },
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
                  background: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  color: "#721c24",
                  padding: "0.75rem",
                  borderRadius: "5px",
                  marginBottom: "1rem",
                  display: errorMessage ? "block" : "none",
                }}
              >
                {errorMessage}
              </div>
              <div
                style={{
                  background: "#d4edda",
                  border: "1px solid #c3e6cb",
                  color: "#155724",
                  padding: "0.75rem",
                  borderRadius: "5px",
                  marginBottom: "1rem",
                  display: successMessage ? "block" : "none",
                }}
              >
                {successMessage}
              </div>
              <div
                style={{
                  background: "#fff3cd",
                  border: "1px solid #ffeaa7",
                  color: "#856404",
                  padding: "0.75rem",
                  borderRadius: "5px",
                  marginBottom: "1rem",
                  display: warningMessage ? "block" : "none",
                }}
              >
                {warningMessage}
              </div>
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    marginBottom: "1rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "2px solid #e9ecef",
                  }}
                >
                  <h2
                    style={{
                      color: "#333",
                    }}
                  >
                    Member Information
                  </h2>
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
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Search Member <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={memberSearch}
                    onChange={handleMemberSearch}
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
                    ref={memberResultsRef}
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      border: "1px solid #e9ecef",
                      borderRadius: "5px",
                      background: "#fff",
                      display: memberResults.length > 0 ? "block" : "none",
                    }}
                  >
                    {memberResults.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => selectMember(member)}
                        style={{
                          padding: "0.75rem",
                          borderBottom: "1px solid #e9ecef",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.background = "#f8f9fa")
                        }
                        onMouseOut={(e) => (e.target.style.background = "#fff")}
                      >
                        {member.name} ({member.id}) - {member.email}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    marginBottom: "1rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "2px solid #e9ecef",
                  }}
                >
                  <h2
                    style={{
                      color: "#333",
                    }}
                  >
                    Book Information
                  </h2>
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
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Search Book <span style={{ color: "#dc3545" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={bookSearch}
                    onChange={handleBookSearch}
                    placeholder="Enter book name, author, or ISBN..."
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
                    ref={bookResultsRef}
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      border: "1px solid #e9ecef",
                      borderRadius: "5px",
                      background: "#fff",
                      display: bookResults.length > 0 ? "block" : "none",
                    }}
                  >
                    {bookResults.map((book) => (
                      <div
                        key={book.id}
                        onClick={() => selectBook(book)}
                        style={{
                          padding: "0.75rem",
                          borderBottom: "1px solid #e9ecef",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.background = "#f8f9fa")
                        }
                        onMouseOut={(e) => (e.target.style.background = "#fff")}
                      >
                        {book.name} by {book.author} ({book.available}{" "}
                        available)
                      </div>
                    ))}
                  </div>
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
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Select Copy
                  </label>
                  <select
                    value={copySelect}
                    onChange={handleCopySelect}
                    disabled={!selectedBook || selectedBook.available === 0}
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
                    <option value="">Select a copy</option>
                    {selectedBook &&
                      selectedBook.available > 0 &&
                      Array.from({ length: selectedBook.available }, (_, i) => (
                        <option key={i} value={`copy${i + 1}`}>
                          Copy #00{i + 1} (Rack 2)
                        </option>
                      ))}
                    {selectedBook && selectedBook.available === 0 && (
                      <option value="">No copies available</option>
                    )}
                  </select>
                </div>
                <div
                  style={{
                    background: "#e9ecef",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                    display: selectedBook ? "block" : "none",
                  }}
                >
                  <h3
                    style={{
                      color: "#333",
                      marginBottom: "1rem",
                    }}
                  >
                    Issue Summary
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
                    <span>Issue Date:</span>
                    <span>August 3, 2025</span>
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
                    <span>Return Due Date:</span>
                    <span>August 10, 2025</span>
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
                    <span>Loan Period:</span>
                    <span>7 days</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    <span>Fine Rate (if late):</span>
                    <span>₹5 per day</span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="submit"
                    disabled={isIssueButtonDisabled}
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: isIssueButtonDisabled ? "#ccc" : "#333",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      fontWeight: 500,
                      cursor: isIssueButtonDisabled ? "not-allowed" : "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      if (!isIssueButtonDisabled)
                        e.target.style.background = "#555";
                    }}
                    onMouseOut={(e) => {
                      if (!isIssueButtonDisabled)
                        e.target.style.background = "#333";
                    }}
                  >
                    Issue Book
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: "transparent",
                      color: "#333",
                      border: "2px solid #333",
                      borderRadius: "5px",
                      fontSize: "1rem",
                      fontWeight: 500,
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
              <div
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
                    {selectedMember ? selectedMember.name : "John Doe"}
                  </div>
                  <div
                    style={{
                      padding: "0.3rem 0.8rem",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      background:
                        selectedMember?.status === "active"
                          ? "#d4edda"
                          : "#f8d7da",
                      color:
                        selectedMember?.status === "active"
                          ? "#155724"
                          : "#721c24",
                    }}
                  >
                    {selectedMember ? selectedMember.status : "Active"}
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                    "@media (max-width: 768px)": {
                      gridTemplateColumns: "1fr",
                    },
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
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      {selectedMember
                        ? `LIB00${selectedMember.id}`
                        : "LIB001234"}
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
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      {selectedMember
                        ? selectedMember.email
                        : "john.doe@email.com"}
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
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      {selectedMember ? selectedMember.phone : "+91 9876543210"}
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
                      Payment Status
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color:
                          selectedMember?.payment === "paid"
                            ? "#28a745"
                            : "#dc3545",
                      }}
                    >
                      {selectedMember
                        ? selectedMember.payment === "paid"
                          ? "Paid (Aug 30)"
                          : "Due"
                        : "Paid (Aug 30)"}
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
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      2 / 3
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
                      Outstanding Fines
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      ₹0
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  border: "1px solid #e9ecef",
                  marginBottom: "1.5rem",
                  display: selectedBook ? "block" : "none",
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
                    {selectedBook ? selectedBook.name : "Clean Code"}
                  </div>
                  <div
                    style={{
                      padding: "0.3rem 0.8rem",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      background:
                        selectedBook?.available > 0 ? "#d4edda" : "#f8d7da",
                      color:
                        selectedBook?.available > 0 ? "#155724" : "#721c24",
                    }}
                  >
                    {selectedBook
                      ? selectedBook.available > 0
                        ? "Available"
                        : "Unavailable"
                      : "Available"}
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                    "@media (max-width: 768px)": {
                      gridTemplateColumns: "1fr",
                    },
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
                      Author
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      {selectedBook ? selectedBook.author : "Robert C. Martin"}
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
                      Subject
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      {selectedBook ? selectedBook.subject : "Programming"}
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
                      ISBN
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      {selectedBook
                        ? `978-0${selectedBook.id}2350884`
                        : "978-0132350884"}
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
                      Total Copies
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      {selectedBook ? selectedBook.available + 2 : 5}
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
                      Available
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color:
                          selectedBook?.available > 0 ? "#28a745" : "#dc3545",
                      }}
                    >
                      {selectedBook ? selectedBook.available : 3}
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
                      Currently Issued
                    </span>
                    <span
                      style={{
                        fontWeight: 500,
                        color: "#333",
                      }}
                    >
                      {selectedBook ? 2 : 2}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IssueBook;

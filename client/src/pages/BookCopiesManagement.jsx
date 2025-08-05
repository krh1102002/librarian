import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { books, copies, libraryStats } from "../data/mockData";

const BookCopiesManagement = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    statusFilter: "all",
    rackFilter: "all",
  });

  const currentBook = books.find((book) => book.id === "1"); // Assuming bookId=1 from URL params
  const filteredCopies = copies.filter((copy) => {
    const matchesStatus =
      filters.statusFilter === "all" ||
      (filters.statusFilter === "available" && copy.status === "available") ||
      (filters.statusFilter === "issued" && copy.status === "issued");
    const matchesRack =
      filters.rackFilter === "all" ||
      copy.rackLocation === `Rack ${filters.rackFilter}`;
    return matchesStatus && matchesRack;
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApplyFilters = () => {
    console.log("Applying filters:", filters);
    alert(
      "Filters applied! Results would be updated.\n(Backend integration required)"
    );
  };

  const handleRelocateCopy = (copyId) => {
    const newRack = prompt(`Enter new rack location for Copy #${copyId}:`);
    if (newRack) {
      console.log("Relocate copy", copyId, "to rack", newRack);
      alert(
        `Copy #${copyId} relocated to Rack ${newRack}\n(Backend integration required)`
      );
    }
  };

  const handleEditCopy = (copyId) => {
    console.log("Edit copy:", copyId);
    alert(
      `Opening edit form for Copy #${copyId}\n(Backend integration required)`
    );
  };

  const handleIssueCopy = (copyId) => {
    const memberId = prompt(`Enter member ID to issue Copy #${copyId} to:`);
    if (memberId) {
      console.log("Issue copy", copyId, "to member", memberId);
      alert(
        `Copy #${copyId} issued to member ${memberId}\n(Backend integration required)`
      );
    }
  };

  return (
    <Layout showHeader={true} userRole="Librarian" userName="Sarah Johnson">
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
            maxWidth: "1200px",
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
              to="/books-catalog"
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
              ← Back to Catalog
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
            maxWidth: "1200px",
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
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "1.8rem",
                    color: "#333",
                    marginBottom: "0.3rem",
                  }}
                >
                  {currentBook?.title}
                </h1>
                <div
                  style={{
                    color: "#666",
                    fontStyle: "italic",
                    marginBottom: "0.5rem",
                  }}
                >
                  by {currentBook?.author}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  Book ID: #{currentBook?.id} | Subject: {currentBook?.subject}{" "}
                  | ISBN: {currentBook?.isbn}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <Link
                  to={`/add-book-copy?bookId=${currentBook?.id}`}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#555")}
                  onMouseOut={(e) => (e.target.style.background = "#333")}
                >
                  + Add New Copy
                </Link>
                <Link
                  to={`/edit-book?bookId=${currentBook?.id}`}
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
                    textDecoration: "none",
                    display: "inline-block",
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
                  Edit Book Info
                </Link>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #e9ecef",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "0.3rem",
                  }}
                >
                  {currentBook?.totalCopies}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                  }}
                >
                  Total Copies
                </div>
              </div>
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #e9ecef",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "0.3rem",
                    color: "#28a745",
                  }}
                >
                  {currentBook?.availableCopies}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                  }}
                >
                  Available
                </div>
              </div>
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #e9ecef",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "0.3rem",
                    color: "#dc3545",
                  }}
                >
                  {currentBook?.issuedCopies}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                  }}
                >
                  Currently Issued
                </div>
              </div>
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "5px",
                  border: "1px solid #e9ecef",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "0.3rem",
                  }}
                >
                  ₹{currentBook?.price.toLocaleString()}
                </div>
                <div
                  style={{
                    color: "#666",
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                  }}
                >
                  Book Price
                </div>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                  htmlFor="statusFilter"
                >
                  Filter by Status
                </label>
                <select
                  id="statusFilter"
                  name="statusFilter"
                  value={filters.statusFilter}
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
                  <option value="all">All Copies</option>
                  <option value="available">Available Only</option>
                  <option value="issued">Issued Only</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                  htmlFor="rackFilter"
                >
                  Filter by Rack
                </label>
                <select
                  id="rackFilter"
                  name="rackFilter"
                  value={filters.rackFilter}
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
                  <option value="all">All Racks</option>
                  <option value="1">Rack 1</option>
                  <option value="2">Rack 2</option>
                  <option value="3">Rack 3</option>
                  <option value="4">Rack 4</option>
                </select>
              </div>
              <div>
                <button
                  onClick={handleApplyFilters}
                  style={{
                    padding: "0.75rem 1.5rem",
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
                  Apply Filters
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
                }}
              >
                Individual Copies
              </h2>
              <span>{currentBook?.totalCopies} total copies</span>
            </div>

            <div
              style={{
                padding: "1.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filteredCopies.map((copy) => (
                <div
                  key={copy.id}
                  style={{
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    transition: "all 0.3s ease",
                    background:
                      copy.status === "available" ? "#f8fff8" : "#fff8f8",
                    borderColor:
                      copy.status === "available" ? "#28a745" : "#dc3545",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 15px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
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
                      Copy #{copy.id}
                    </div>
                    <div
                      style={{
                        padding: "0.3rem 0.8rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        background:
                          copy.status === "available" ? "#d4edda" : "#f8d7da",
                        color:
                          copy.status === "available" ? "#155724" : "#721c24",
                      }}
                    >
                      {copy.status.charAt(0).toUpperCase() +
                        copy.status.slice(1)}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      marginBottom: "1rem",
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
                        Rack Location
                      </span>
                      <span
                        style={{
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        {copy.rackLocation}
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
                        Condition
                      </span>
                      <span
                        style={{
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        {copy.condition}
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
                        Added Date
                      </span>
                      <span
                        style={{
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        {new Date(copy.addedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
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
                        Last Borrowed
                      </span>
                      <span
                        style={{
                          fontWeight: "500",
                          color: "#333",
                        }}
                      >
                        {copy.lastBorrowed === "Never"
                          ? "Never"
                          : new Date(copy.lastBorrowed).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                      </span>
                    </div>
                  </div>

                  {copy.status === "issued" && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "1rem",
                        marginBottom: "1rem",
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
                          Issued To
                        </span>
                        <span
                          style={{
                            fontWeight: "500",
                            color: "#333",
                          }}
                        >
                          {copy.issuedTo}
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
                          Issue Date
                        </span>
                        <span
                          style={{
                            fontWeight: "500",
                            color: "#333",
                          }}
                        >
                          {new Date(copy.issueDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
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
                          Due Date
                        </span>
                        <span
                          style={{
                            fontWeight: "500",
                            color: "#333",
                          }}
                        >
                          {new Date(copy.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
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
                          Days Remaining
                        </span>
                        <span
                          style={{
                            fontWeight: "500",
                            color: copy.daysRemaining <= 2 ? "#ffc107" : "#333",
                          }}
                        >
                          {copy.daysRemaining} days
                        </span>
                      </div>
                    </div>
                  )}

                  {copy.status === "issued" && (
                    <div
                      style={{
                        background: "#f8f9fa",
                        padding: "1rem",
                        borderRadius: "5px",
                        marginBottom: "1rem",
                        fontSize: "0.9rem",
                        color: "#666",
                      }}
                    >
                      {copy.daysRemaining <= 2
                        ? "Due soon! Consider sending reminder to member."
                        : "Currently issued to member. Return processing available from Issue History page."}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => handleRelocateCopy(copy.id)}
                      style={{
                        padding: "0.4rem 0.8rem",
                        background: "transparent",
                        color: "#333",
                        border: "2px solid #333",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        borderRadius: "3px",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
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
                      Relocate
                    </button>
                    <button
                      onClick={() => handleEditCopy(copy.id)}
                      style={{
                        padding: "0.4rem 0.8rem",
                        background: "transparent",
                        color: "#333",
                        border: "2px solid #333",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        borderRadius: "3px",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
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
                      Edit
                    </button>
                    {copy.status === "available" && (
                      <button
                        onClick={() => handleIssueCopy(copy.id)}
                        style={{
                          padding: "0.4rem 0.8rem",
                          background: "transparent",
                          color: "#333",
                          border: "2px solid #333",
                          fontSize: "0.8rem",
                          fontWeight: "500",
                          borderRadius: "3px",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
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
                        Issue
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default BookCopiesManagement;

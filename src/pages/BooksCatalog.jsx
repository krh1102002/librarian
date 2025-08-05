import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import StatCard from "../components/Common/StatCard";
import StatusBadge from "../components/Common/StatusBadge";
import { books, libraryStats } from "../data/mockData";
import Header from "../components/Layout/Header";

const BooksCatalog = () => {
  const [filters, setFilters] = useState({
    search: "",
    subject: "all",
    availability: "all",
    rack: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      book.author.toLowerCase().includes(filters.search.toLowerCase()) ||
      book.isbn.includes(filters.search);
    const matchesSubject =
      filters.subject === "all" ||
      book.subject.toLowerCase() === filters.subject;
    const matchesAvailability =
      filters.availability === "all" ||
      (filters.availability === "available" && book.availableCopies > 0) ||
      (filters.availability === "out-of-stock" && book.availableCopies === 0);

    return matchesSearch && matchesSubject && matchesAvailability;
  });

  const handleViewBook = (bookId) => {
    console.log("View book:", bookId);
    alert(
      `Opening book details for ID: ${bookId}\n(Backend integration required)`
    );
  };

  const handleEditBook = (bookId) => {
    console.log("Edit book:", bookId);
    alert(
      `Opening edit form for book ID: ${bookId}\n(Backend integration required)`
    );
  };

  const handleManageCopies = (bookId) => {
    console.log("Manage copies for book:", bookId);
    alert(
      `Opening copy management for book ID: ${bookId}\n(Backend integration required)`
    );
  };

  return (
    <Layout showHeader={true} userRole="admin" userName="John Doe">
      {/* Page Header */}
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          border: "1px solid #e9ecef",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <h1
            style={{ fontSize: "2rem", color: "#333", marginBottom: "0.5rem" }}
          >
            Books Catalog
          </h1>
          <p style={{ color: "#666", fontSize: "1.1rem" }}>
            Complete library inventory with copy management
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <Link
            to="/add-book"
            style={{
              padding: "0.75rem 1.5rem",
              border: "2px solid #333",
              background: "#333",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "500",
              borderRadius: "5px",
              transition: "all 0.3s ease",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#555";
              e.target.style.borderColor = "#555";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#333";
              e.target.style.borderColor = "#333";
            }}
          >
            + Add New Book
          </Link>
          <Link
            to="/add-book-copy"
            style={{
              padding: "0.75rem 1.5rem",
              border: "2px solid #333",
              background: "transparent",
              color: "#333",
              textDecoration: "none",
              fontWeight: "500",
              borderRadius: "5px",
              transition: "all 0.3s ease",
              cursor: "pointer",
              fontSize: "1rem",
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
            + Add Copy
          </Link>
        </div>
      </div>

      {/* Inventory Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <StatCard title="Total Books" value={libraryStats.totalBooks} />
        <StatCard title="Total Copies" value={libraryStats.totalCopies} />
        <StatCard
          title="Available"
          value={libraryStats.availableCopies}
          color="green"
        />
        <StatCard
          title="Currently Issued"
          value={libraryStats.currentlyIssued}
          color="blue"
        />
        <StatCard title="Rack Locations" value={libraryStats.rackLocations} />
      </div>

      {/* Filters */}
      <div
        style={{
          background: "#fff",
          padding: "1.5rem",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#333",
              }}
            >
              Search Books
            </label>
            <input
              type="text"
              placeholder="Title, author, or ISBN..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e9ecef",
                borderRadius: "5px",
                fontSize: "1rem",
                transition: "border-color 0.3s ease",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#333")}
              onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#333",
              }}
            >
              Subject
            </label>
            <select
              value={filters.subject}
              onChange={(e) => handleFilterChange("subject", e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e9ecef",
                borderRadius: "5px",
                fontSize: "1rem",
                transition: "border-color 0.3s ease",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#333")}
              onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
            >
              <option value="all">All Subjects</option>
              <option value="programming">Programming</option>
              <option value="science">Science</option>
              <option value="literature">Literature</option>
              <option value="history">History</option>
              <option value="mathematics">Mathematics</option>
            </select>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#333",
              }}
            >
              Availability
            </label>
            <select
              value={filters.availability}
              onChange={(e) =>
                handleFilterChange("availability", e.target.value)
              }
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e9ecef",
                borderRadius: "5px",
                fontSize: "1rem",
                transition: "border-color 0.3s ease",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#333")}
              onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
            >
              <option value="all">All Books</option>
              <option value="available">Available</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
                color: "#333",
              }}
            >
              Rack Location
            </label>
            <select
              value={filters.rack}
              onChange={(e) => handleFilterChange("rack", e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e9ecef",
                borderRadius: "5px",
                fontSize: "1rem",
                transition: "border-color 0.3s ease",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#333")}
              onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
            >
              <option value="all">All Racks</option>
              <option value="1">Rack 1</option>
              <option value="2">Rack 2</option>
              <option value="3">Rack 3</option>
            </select>
          </div>
          <div>
            <button
              style={{
                width: "100%",
                padding: "0.75rem 1.5rem",
                border: "2px solid #333",
                background: "#333",
                color: "#fff",
                fontWeight: "500",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#555";
                e.target.style.borderColor = "#555";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#333";
                e.target.style.borderColor = "#333";
              }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          border: "1px solid #e9ecef",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
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
          <h2 style={{ fontSize: "1.3rem", color: "#333" }}>Library Catalog</h2>
          <span style={{ color: "#666", fontSize: "0.9rem" }}>
            Showing {filteredBooks.length} books
          </span>
        </div>

        <div
          style={{
            padding: "1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              style={{
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                padding: "1.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#333";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#e9ecef";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Book Header */}
              <div style={{ marginBottom: "1rem" }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "0.2rem",
                  }}
                >
                  {book.title}
                </h3>
                <p
                  style={{
                    color: "#666",
                    fontStyle: "italic",
                    marginBottom: "0.5rem",
                  }}
                >
                  by {book.author}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.3rem 0.75rem",
                    background: "#f8f9fa",
                    border: "1px solid #e9ecef",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    color: "#333",
                  }}
                >
                  {book.subject}
                </span>
              </div>

              {/* Book Details */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                      textTransform: "uppercase",
                      marginBottom: "0.2rem",
                    }}
                  >
                    ISBN
                  </div>
                  <div style={{ fontWeight: "500", color: "#333" }}>
                    {book.isbn}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                      textTransform: "uppercase",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Price
                  </div>
                  <div style={{ fontWeight: "500", color: "#333" }}>
                    ₹{book.price.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Copies Info */}
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #e9ecef",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      {book.totalCopies}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        textTransform: "uppercase",
                      }}
                    >
                      Total
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#28a745",
                      }}
                    >
                      {book.availableCopies}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        textTransform: "uppercase",
                      }}
                    >
                      Available
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#dc3545",
                      }}
                    >
                      {book.issuedCopies}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#666",
                        textTransform: "uppercase",
                      }}
                    >
                      Issued
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                }}
              >
                <button
                  onClick={() => handleViewBook(book.id)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "2px solid #333",
                    background: "transparent",
                    color: "#333",
                    fontWeight: "500",
                    borderRadius: "5px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    fontSize: "0.9rem",
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
                  View
                </button>
                <button
                  onClick={() => handleEditBook(book.id)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "2px solid #333",
                    background: "transparent",
                    color: "#333",
                    fontWeight: "500",
                    borderRadius: "5px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    fontSize: "0.9rem",
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
                {book.availableCopies === 0 ? (
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      border: "2px solid #333",
                      background: "#333",
                      color: "#fff",
                      fontWeight: "500",
                      borderRadius: "5px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = "#555";
                      e.target.style.borderColor = "#555";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "#333";
                      e.target.style.borderColor = "#333";
                    }}
                  >
                    Add Copy
                  </button>
                ) : (
                  <button
                    onClick={() => handleManageCopies(book.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      border: "2px solid #333",
                      background: "transparent",
                      color: "#333",
                      fontWeight: "500",
                      borderRadius: "5px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      fontSize: "0.9rem",
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
                    Copies
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid #e9ecef",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#666", fontSize: "0.9rem" }}>
            Showing 1-{filteredBooks.length} of {books.length} books
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              style={{
                padding: "0.5rem 1rem",
                border: "2px solid #333",
                background: "transparent",
                color: "#333",
                fontWeight: "500",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                fontSize: "0.9rem",
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
              Previous
            </button>
            <button
              style={{
                padding: "0.5rem 1rem",
                border: "2px solid #333",
                background: "#333",
                color: "#fff",
                fontWeight: "500",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#555";
                e.target.style.borderColor = "#555";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#333";
                e.target.style.borderColor = "#333";
              }}
            >
              1
            </button>
            <button
              style={{
                padding: "0.5rem 1rem",
                border: "2px solid #333",
                background: "transparent",
                color: "#333",
                fontWeight: "500",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                fontSize: "0.9rem",
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
              2
            </button>
            <button
              style={{
                padding: "0.5rem 1rem",
                border: "2px solid #333",
                background: "transparent",
                color: "#333",
                fontWeight: "500",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                fontSize: "0.9rem",
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
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BooksCatalog;

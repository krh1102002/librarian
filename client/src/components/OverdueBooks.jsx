import React, { useState } from "react";
import "../styles/overduebooks.css";

const overdueBooksData = [
  {
    id: 1,
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
    memberName: "Alice Johnson",
    memberId: "M123",
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
    overdueDays: 3,
    priority: "medium",
    fineAmount: 7.5,
  },
];

const priorityLabels = {
  critical: { label: "Critical", className: "overdue-critical priority-critical" },
  high: { label: "High", className: "overdue-high priority-high" },
  medium: { label: "Medium", className: "overdue-medium" },
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
      book.memberName.toLowerCase().includes(filters.memberName.toLowerCase()) &&
      book.bookTitle.toLowerCase().includes(filters.bookTitle.toLowerCase()) &&
      (filters.priority === "" || book.priority === filters.priority)
    );
  });

  return (
    <>
    <style>
        {`
        .overdue-critical {
  background-color: #fee2e2;
}

.priority-critical {
  background-color: #fee2e2;
}

.overdue-high {
  background-color: #fef3c7;
}

.priority-high {
  background-color: #fef3c7;
}

.overdue-medium {
  background-color: #d1fae5;
}

.overdue-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.book-info, .member-info {
  min-width: 200px;
}

.book-title, .member-name {
  font-weight: 500;
}

.book-author, .member-id {
  font-size: 0.875rem;
  color: #4b5563;
}

.fine-amount, .actions-cell {
  min-width: 100px;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.btn-small {
  padding: 0.25rem 0.5rem;
}

.btn-collect {
  background-color: #059669;
  color: white;
}

.btn-collect:hover {
  background-color: #047857;
}`}
    </style>
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <div className="header-content flex justify-between items-center">
          <div className="logo text-2xl font-bold">Library Admin</div>
          <a href="#" className="back-link text-blue-600 hover:underline">← Back to Dashboard</a>
        </div>
      </header>

      <main className="main-content">
        <section className="page-header mb-6">
          <div className="header-content-page">
            <div className="page-title-section">
              <h1 className="text-3xl font-bold">Overdue Books</h1>
              <p className="text-gray-600">Manage and collect fines for overdue books.</p>
            </div>
          </div>
        </section>

        <div className="alert-urgent flex items-center p-4 mb-6 bg-yellow-100 border border-yellow-400 rounded">
          <span className="alert-icon mr-2">⚠️</span>
          <p>Some books are critically overdue! Take immediate action.</p>
        </div>

        <div className="summary-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="summary-card p-4 bg-white shadow rounded">
            <div className="summary-number text-2xl font-bold">{overdueBooksData.length}</div>
            <div className="summary-label text-gray-600">Total Overdue</div>
          </div>
          <div className="summary-card p-4 bg-white shadow rounded">
            <div className="summary-number critical text-2xl font-bold text-red-600">
              {overdueBooksData.filter((b) => b.priority === "critical").length}
            </div>
            <div className="summary-label text-gray-600">Critical</div>
          </div>
          <div className="summary-card p-4 bg-white shadow rounded">
            <div className="summary-number warning text-2xl font-bold text-yellow-600">
              {overdueBooksData.filter((b) => b.priority === "high").length}
            </div>
            <div className="summary-label text-gray-600">High Priority</div>
          </div>
          <div className="summary-card p-4 bg-white shadow rounded">
            <div className="summary-number text-2xl font-bold">
              {overdueBooksData.filter((b) => b.priority === "medium").length}
            </div>
            <div className="summary-label text-gray-600">Medium Priority</div>
          </div>
        </div>

        <section className="filters-section mb-6">
          <div className="filters-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="filter-group">
              <label htmlFor="memberName" className="block text-sm font-medium text-gray-700">Member Name</label>
              <input
                type="text"
                id="memberName"
                name="memberName"
                value={filters.memberName}
                onChange={handleFilterChange}
                placeholder="Search by member name"
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700">Book Title</label>
              <input
                type="text"
                id="bookTitle"
                name="bookTitle"
                value={filters.bookTitle}
                onChange={handleFilterChange}
                placeholder="Search by book title"
                className="mt-1 p-2 border rounded w-full"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                id="priority"
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="mt-1 p-2 border rounded w-full"
              >
                <option value="">All</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
              </select>
            </div>

            <div className="filter-group">
              <button
                className="btn mt-6 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                type="button"
                onClick={() => setFilters({ memberName: "", bookTitle: "", priority: "" })}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        <section className="overdue-section">
          <div className="section-header flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Overdue Books List</h2>
            <div className="results-info text-gray-600">
              Showing {filteredBooks.length} of {overdueBooksData.length} overdue books
            </div>
          </div>

          <table className="overdue-table w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Book Info</th>
                <th className="p-3 text-left">Member Info</th>
                <th className="p-3 text-left">Overdue Days</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Fine</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-600">
                    No overdue books match your filters.
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className={
                      book.priority === "critical"
                        ? "priority-critical"
                        : book.priority === "high"
                        ? "priority-high"
                        : ""
                    }
                  >
                    <td className="book-info p-3">
                      <div className="book-title font-medium">{book.bookTitle}</div>
                      <div className="book-author text-gray-600">{book.bookAuthor}</div>
                    </td>
                    <td className="member-info p-3">
                      <div className="member-name font-medium">{book.memberName}</div>
                      <div className="member-id text-gray-600">{book.memberId}</div>
                    </td>
                    <td className="p-3">{book.overdueDays}</td>
                    <td className="p-3">
                      <span className={`overdue-badge ${priorityLabels[book.priority].className}`}>
                        {priorityLabels[book.priority].label}
                      </span>
                    </td>
                    <td className="fine-amount p-3">${book.fineAmount.toFixed(2)}</td>
                    <td className="actions-cell p-3">
                      <button
                        className="btn btn-small btn-collect p-2 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => alert(`Collected fine from ${book.memberName}`)}
                      >
                        Collect Fine
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
    </>
  );
}
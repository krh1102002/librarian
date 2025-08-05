import React, { useState } from "react";

const mockSummary = {
  totalMembers: 45,
  activeMembers: 38,
  paymentDue: 5,
  newThisMonth: 2,
};

const mockUsers = [
  {
    id: "LIB001234",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    joinDate: "Jan 15, 2023",
    paymentStatus: { type: "current", text: "Current (Aug 30)" },
    booksIssued: 3,
    status: "active",
  },
  {
    id: "LIB001235",
    name: "Alice Smith",
    email: "alice.smith@email.com",
    phone: "+91 9876543211",
    joinDate: "Jul 28, 2025",
    paymentStatus: { type: "current", text: "Current (Aug 28)" },
    booksIssued: 1,
    status: "new",
  },
  {
    id: "LIB001025",
    name: "Robert Johnson",
    email: "robert.j@email.com",
    phone: "+91 9876543212",
    joinDate: "Mar 10, 2024",
    paymentStatus: { type: "due", text: "Due Aug 3" },
    booksIssued: 2,
    status: "active",
  },
  {
    id: "LIB001087",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+91 9876543213",
    joinDate: "Feb 20, 2024",
    paymentStatus: { type: "overdue", text: "Overdue (Jul 20)" },
    booksIssued: 1,
    status: "overdue",
  },
  {
    id: "LIB001156",
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+91 9876543214",
    joinDate: "Jun 15, 2024",
    paymentStatus: { type: "current", text: "Current (Aug 15)" },
    booksIssued: 0,
    status: "active",
  },
  {
    id: "LIB001298",
    name: "Sarah Brown",
    email: "sarah.brown@email.com",
    phone: "+91 9876543215",
    joinDate: "Aug 1, 2025",
    paymentStatus: { type: "current", text: "Current (Sep 1)" },
    booksIssued: 4,
    status: "new",
  },
];

const UserManagement = () => {
  // Form state for filters
  const [filters, setFilters] = useState({
    userId: "",
    paymentStatus: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    searchTerm: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // reset to first page on filter change
  };

  // Filtering logic
  const filteredUsers = mockUsers.filter((user) => {
    const matchesUserId = filters.userId
      ? user.id.toLowerCase().includes(filters.userId.toLowerCase())
      : true;
    const matchesPaymentStatus = filters.paymentStatus
      ? user.paymentStatus.type === filters.paymentStatus
      : true;
    const matchesStatus = filters.status
      ? user.status === filters.status
      : true;
    const matchesSearchTerm = filters.searchTerm
      ? user.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.searchTerm.toLowerCase())
      : true;
    const joinDate = new Date(user.joinDate);
    const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

    const matchesDateFrom = fromDate ? joinDate >= fromDate : true;
    const matchesDateTo = toDate ? joinDate <= toDate : true;

    return (
      matchesUserId &&
      matchesPaymentStatus &&
      matchesStatus &&
      matchesSearchTerm &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  // Pagination calculations
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Pagination handlers
  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  return (
    <>
      <style>
        {`
    /* UserManagement.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background: #fff;
  border-bottom: 2px solid #e9ecef;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.back-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.back-link:hover {
  border-color: #333;
}

.main-content {
  padding: 2rem 0;
}

.page-header {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title-section h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.page-title-section p {
  color: #666;
  font-size: 1.1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn:hover {
  background: #555;
}

.btn-secondary {
  background: transparent;
  color: #333;
  border: 2px solid #333;
}

.btn-secondary:hover {
  background: #333;
  color: #fff;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.summary-number {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.summary-label {
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.filters-section {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.filter-group input,
.filter-group select {
  padding: 0.6rem;
  border: 2px solid #e9ecef;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #333;
}

.users-section {
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.section-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h2 {
  color: #333;
}

.results-info {
  color: #666;
  font-size: 0.9rem;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.users-table tr:hover {
  background: #f8f9fa;
}

.users-table tr:last-child td {
  border-bottom: none;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.2rem;
}

.user-email {
  font-size: 0.9rem;
  color: #666;
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-active {
  background: #d4edda;
  color: #155724;
}

.status-overdue {
  background: #f8d7da;
  color: #721c24;
}

.status-new {
  background: #cce5ff;
  color: #004085;
}

.payment-status {
  font-weight: 500;
}

.payment-current {
  color: #28a745;
}

.payment-due {
  color: #ffc107;
}

.payment-overdue {
  color: #dc3545;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.btn-small {
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 3px;
}

.pagination {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e9ecef;
}

.pagination-info {
  color: #666;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  gap: 0.5rem;
}

.page-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid #e9ecef;
  background: #fff;
  color: #333;
  text-decoration: none;
  border-radius: 3px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.page-btn:hover {
  border-color: #333;
  background: #f8f9fa;
}

.page-btn.active {
  background: #333;
  color: #fff;
  border-color: #333;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .users-table {
    font-size: 0.9rem;
  }

  .users-table th,
  .users-table td {
    padding: 0.75rem 0.5rem;
  }

  .filters-grid {
    grid-template-columns: 1fr;
  }

  .actions-cell {
    flex-direction: column;
  }
}
`}
      </style>
      <header>
        <div className="container header-content">
          <a href="/" className="logo">
            Library Management System
          </a>
          <a href="/" className="back-link" aria-label="Back to home">
            Back to Home
          </a>
        </div>
      </header>

      <main className="container main-content" role="main">
        <section className="page-header" aria-label="Page header">
          <div className="page-title-section">
            <h1>User Management</h1>
            <p>Keep track of all users & their subscriptions</p>
          </div>
          <a href="/users/new" className="btn" aria-label="Add New User">
            + Add New User
          </a>
        </section>

        <section
          className="summary-cards"
          aria-label="Summary statistics of users"
          role="region"
        >
          <div className="summary-card" aria-live="polite">
            <div className="summary-number">{mockSummary.totalMembers}</div>
            <div className="summary-label">Total Members</div>
          </div>
          <div className="summary-card" aria-live="polite">
            <div className="summary-number">{mockSummary.activeMembers}</div>
            <div className="summary-label">Active Members</div>
          </div>
          <div className="summary-card" aria-live="polite">
            <div className="summary-number">{mockSummary.paymentDue}</div>
            <div className="summary-label">Payment Due</div>
          </div>
          <div className="summary-card" aria-live="polite">
            <div className="summary-number">{mockSummary.newThisMonth}</div>
            <div className="summary-label">New This Month</div>
          </div>
        </section>

        <section
          className="filters-section"
          aria-label="Filter users"
          role="region"
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            aria-describedby="filter-desc"
            noValidate
          >
            <p id="filter-desc" className="visually-hidden">
              Use filters to narrow down users
            </p>
            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="userId">User ID</label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  value={filters.userId}
                  onChange={handleFilterChange}
                  placeholder="Enter User ID"
                />
              </div>

              <div className="filter-group">
                <label htmlFor="paymentStatus">Payment Status</label>
                <select
                  id="paymentStatus"
                  name="paymentStatus"
                  value={filters.paymentStatus}
                  onChange={handleFilterChange}
                >
                  <option value="">-- Select --</option>
                  <option value="current">Current</option>
                  <option value="due">Due</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">-- Select --</option>
                  <option value="active">Active</option>
                  <option value="new">New</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="dateFrom">Date From</label>
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label htmlFor="dateTo">Date To</label>
                <input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label htmlFor="searchTerm">Search</label>
                <input
                  type="text"
                  id="searchTerm"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  placeholder="Search by name or email"
                />
              </div>
            </div>
          </form>
        </section>

        <section
          className="users-section"
          aria-label="User list and actions"
          role="region"
        >
          <div className="section-header">
            <h2>Users</h2>
            <div className="results-info" aria-live="polite" aria-atomic="true">
              Showing {indexOfFirstUser + 1} -{" "}
              {Math.min(indexOfLastUser, totalUsers)} of {totalUsers} results
            </div>
          </div>

          <table
            className="users-table"
            role="table"
            aria-describedby="table-desc"
          >
            <caption id="table-desc" className="visually-hidden">
              List of users with their details and actions
            </caption>
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Name & Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Join Date</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Books Issued</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <div className="user-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.joinDate}</td>
                    <td>
                      <span
                        className={`payment-status payment-${user.paymentStatus.type}`}
                        aria-label={`Payment status: ${user.paymentStatus.text}`}
                      >
                        {user.paymentStatus.text}
                      </span>
                    </td>
                    <td>{user.booksIssued}</td>
                    <td>
                      <span
                        className={`status-badge status-${user.status}`}
                        aria-label={`User status: ${user.status}`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="btn btn-small btn-secondary"
                        aria-label={`View details of ${user.name}`}
                        onClick={() => alert(`Viewing user ${user.id}`)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="btn btn-small btn-secondary"
                        aria-label={`Send notification to ${user.name}`}
                        onClick={() =>
                          alert(`Notification sent to ${user.name}`)
                        }
                      >
                        Notify
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="pagination" aria-label="User list pagination">
            <div
              className="pagination-info"
              aria-live="polite"
              aria-atomic="true"
            >
              Page {currentPage} of {totalPages}
            </div>
            <div className="pagination-controls">
              <button
                className="page-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                &lt; Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={`page-btn ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                  onClick={() => goToPage(i + 1)}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="page-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                Next &gt;
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserManagement;

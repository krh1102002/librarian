import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockStats = {
  totalTransactions: 342,
  currentlyIssued: 89,
  returned: 245,
  overdue: 8,
  finesCollected: 485,
};

const mockTransactions = [
  {
    id: '1',
    book: {
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
    },
    member: {
      name: 'John Doe',
      id: 'LIB001234',
    },
    copyId: '#004',
    issueDate: 'Aug 3, 2025',
    dueDate: 'Aug 10, 2025',
    returnDate: '-',
    status: 'Current',
    fine: '₹0',
    fineStatus: 'none',
  },
  {
    id: '2',
    book: {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt & David Thomas',
    },
    member: {
      name: 'Alice Smith',
      id: 'LIB001235',
    },
    copyId: '#003',
    issueDate: 'Aug 1, 2025',
    dueDate: 'Aug 8, 2025',
    returnDate: '-',
    status: 'Current',
    fine: '₹0',
    fineStatus: 'none',
  },
  {
    id: '3',
    book: {
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Gang of Four',
    },
    member: {
      name: 'Robert Johnson',
      id: 'LIB001025',
    },
    copyId: '#007',
    issueDate: 'Jul 15, 2025',
    dueDate: 'Jul 22, 2025',
    returnDate: 'Aug 1, 2025',
    status: 'Late Return',
    fine: '₹50 (Paid)',
    fineStatus: 'paid',
  },
  {
    id: '4',
    book: {
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
    },
    member: {
      name: 'Maria Garcia',
      id: 'LIB001087',
    },
    copyId: '#002',
    issueDate: 'Jul 20, 2025',
    dueDate: 'Jul 27, 2025',
    returnDate: 'Jul 26, 2025',
    status: 'Returned',
    fine: '₹0',
    fineStatus: 'none',
  },
  {
    id: '5',
    book: {
      title: 'Refactoring: Improving the Design of Existing Code',
      author: 'Martin Fowler',
    },
    member: {
      name: 'David Wilson',
      id: 'LIB001156',
    },
    copyId: '#001',
    issueDate: 'Jul 15, 2025',
    dueDate: 'Jul 22, 2025',
    returnDate: 'Jul 20, 2025',
    status: 'Returned',
    fine: '₹0',
    fineStatus: 'none',
  },
  {
    id: '6',
    book: {
      title: 'Code Complete',
      author: 'Steve McConnell',
    },
    member: {
      name: 'Sarah Brown',
      id: 'LIB001298',
    },
    copyId: '#005',
    issueDate: 'Jul 10, 2025',
    dueDate: 'Jul 17, 2025',
    returnDate: 'Jul 25, 2025',
    status: 'Late Return',
    fine: '₹40 (Paid)',
    fineStatus: 'paid',
  },
  {
    id: '7',
    book: {
      title: 'You Don\'t Know JS: Scope & Closures',
      author: 'Kyle Simpson',
    },
    member: {
      name: 'Michael Davis',
      id: 'LIB001345',
    },
    copyId: '#008',
    issueDate: 'Jul 8, 2025',
    dueDate: 'Jul 15, 2025',
    returnDate: 'Jul 14, 2025',
    status: 'Returned',
    fine: '₹0',
    fineStatus: 'none',
  },
];

const IssueHistory = () => {
  const [dateFrom, setDateFrom] = useState('2025-07-01');
  const [dateTo, setDateTo] = useState('2025-08-03');
  const [statusFilter, setStatusFilter] = useState('all');
  const [memberFilter, setMemberFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 7;

  const applyFilters = () => {
    console.log('Applying filters:', {
      dateFrom,
      dateTo,
      statusFilter,
      memberFilter,
    });
    alert('Filters applied! Results would be updated.\n(Backend integration required)');
  };

  const viewDetails = (transactionId) => {
    console.log('View transaction details:', transactionId);
    alert(`Opening detailed view for transaction ${transactionId}\n(Backend integration required)`);
  };

  const processReturn = (transactionId) => {
    console.log('Process return for transaction:', transactionId);
    if (window.confirm(`Process return for transaction ${transactionId}?`)) {
      window.location.href = `return-book.html?transaction=${transactionId}`;
    }
  };

  const printReceipt = (transactionId) => {
    console.log('Print receipt for transaction:', transactionId);
    alert(`Generating receipt for transaction ${transactionId}\n(Backend integration required)`);
  };

  // Pagination logic
  const totalPages = Math.ceil(mockTransactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const displayedTransactions = mockTransactions.slice(startIndex, startIndex + transactionsPerPage);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#333',
      lineHeight: 1.6,
    }}>
      <header style={{
        background: '#fff',
        borderBottom: '2px solid #e9ecef',
        padding: '1rem 0',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
            }}>
              Library Management System
            </div>
            <Link
             to={"/librarian-dashboard"}
              style={{
                color: '#333',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                border: '1px solid #e9ecef',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.borderColor = '#333')}
              onMouseOut={(e) => (e.target.style.borderColor = '#e9ecef')}
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main style={{
        padding: '2rem 0',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <div style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '10px',
            border: '1px solid #e9ecef',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem',
          }}>
            <div style={{
              marginBottom: '0.5rem',
            }}>
              <h1 style={{
                fontSize: '2rem',
                color: '#333',
              }}>
                Issue History
              </h1>
              <p style={{
                color: '#666',
                fontSize: '1.1rem',
              }}>
                Complete transaction history of all book issues and returns
              </p>
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              textAlign: 'center',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '0.5rem',
              }}>
                {mockStats.totalTransactions}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Total Transactions
              </div>
            </div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              textAlign: 'center',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#007bff',
                marginBottom: '0.5rem',
              }}>
                {mockStats.currentlyIssued}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Currently Issued
              </div>
            </div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              textAlign: 'center',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#28a745',
                marginBottom: '0.5rem',
              }}>
                {mockStats.returned}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Returned
              </div>
            </div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              textAlign: 'center',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#dc3545',
                marginBottom: '0.5rem',
              }}>
                {mockStats.overdue}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Overdue
              </div>
            </div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              textAlign: 'center',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '0.5rem',
              }}>
                ₹{mockStats.finesCollected}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Fines Collected
              </div>
            </div>
          </div>
          <div style={{
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '10px',
            border: '1px solid #e9ecef',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              alignItems: 'end',
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
              },
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <label style={{
                  marginBottom: '0.5rem',
                  fontWeight: 500,
                  color: '#333',
                }}>
                  From Date
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  style={{
                    padding: '0.6rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#333')}
                  onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                />
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <label style={{
                  marginBottom: '0.5rem',
                  fontWeight: 500,
                  color: '#333',
                }}>
                  To Date
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  style={{
                    padding: '0.6rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#333')}
                  onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                />
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <label style={{
                  marginBottom: '0.5rem',
                  fontWeight: 500,
                  color: '#333',
                }}>
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '0.6rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#333')}
                  onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                >
                  <option value="all">All Transactions</option>
                  <option value="current">Currently Issued</option>
                  <option value="returned">Returned</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <label style={{
                  marginBottom: '0.5rem',
                  fontWeight: 500,
                  color: '#333',
                }}>
                  Member
                </label>
                <input
                  type="text"
                  value={memberFilter}
                  onChange={(e) => setMemberFilter(e.target.value)}
                  placeholder="Search member..."
                  style={{
                    padding: '0.6rem',
                    border: '2px solid #e9ecef',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#333')}
                  onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                />
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <button
                  onClick={applyFilters}
                  style={{
                    padding: '0.6rem 1.2rem',
                    background: '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseOver={(e) => (e.target.style.background = '#555')}
                  onMouseOut={(e) => (e.target.style.background = '#333')}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          <div style={{
            background: '#fff',
            borderRadius: '10px',
            border: '1px solid #e9ecef',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #e9ecef',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{
                color: '#333',
              }}>
                Transaction History
              </h2>
              <span style={{
                color: '#666',
                fontSize: '0.9rem',
              }}>
                Showing {startIndex + 1}-{Math.min(startIndex + transactionsPerPage, mockTransactions.length)} of {mockTransactions.length} transactions
              </span>
            </div>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem',
              '@media (max-width: 768px)': {
                fontSize: '0.9rem',
              },
            }}>
              <thead>
                <tr>
                  {['Book Details', 'Member', 'Copy ID', 'Issue Date', 'Due Date', 'Return Date', 'Status', 'Fine', 'Actions'].map((header, index) => (
                    <th key={index} style={{
                      padding: '1rem',
                      textAlign: 'left',
                      background: '#f8f9fa',
                      fontWeight: 600,
                      color: '#333',
                      fontSize: '0.9rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedTransactions.map((transaction, index) => (
                  <tr key={transaction.id} style={{
                    borderBottom: index === displayedTransactions.length - 1 ? 'none' : '1px solid #e9ecef',
                    ':hover': {
                      background: '#f8f9fa',
                    },
                  }}>
                    <td style={{
                      padding: '1rem',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                        <div style={{
                          fontWeight: 500,
                          color: '#333',
                          marginBottom: '0.2rem',
                        }}>
                          {transaction.book.title}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#666',
                          fontStyle: 'italic',
                        }}>
                          by {transaction.book.author}
                        </div>
                      </div>
                    </td>
                    <td style={{
                      padding: '1rem',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                        <div style={{
                          fontWeight: 500,
                          color: '#333',
                          marginBottom: '0.2rem',
                        }}>
                          {transaction.member.name}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#666',
                        }}>
                          {transaction.member.id}
                        </div>
                      </div>
                    </td>
                    <td style={{
                      padding: '1rem',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      <strong>{transaction.copyId}</strong>
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.9rem',
                      color: '#666',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      {transaction.issueDate}
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.9rem',
                      color: '#666',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      {transaction.dueDate}
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.9rem',
                      color: '#666',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      {transaction.returnDate}
                    </td>
                    <td style={{
                      padding: '1rem',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      <span style={{
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        background: transaction.status === 'Current' ? '#cce5ff' : transaction.status === 'Returned' ? '#d4edda' : '#f8d7da',
                        color: transaction.status === 'Current' ? '#004085' : transaction.status === 'Returned' ? '#155724' : '#721c24',
                      }}>
                        {transaction.status}
                      </span>
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontWeight: 500,
                      color: transaction.fineStatus === 'paid' ? '#28a745' : '#666',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      {transaction.fine}
                    </td>
                    <td style={{
                      padding: '1rem',
                      display: 'flex',
                      gap: '0.5rem',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                        flexDirection: 'column',
                      },
                    }}>
                      <button
                        onClick={() => viewDetails(transaction.id)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          fontSize: '0.8rem',
                          background: 'transparent',
                          color: '#333',
                          border: '2px solid #333',
                          borderRadius: '3px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = '#333';
                          e.target.style.color = '#fff';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#333';
                        }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => transaction.status === 'Current' ? processReturn(transaction.id) : printReceipt(transaction.id)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          fontSize: '0.8rem',
                          background: 'transparent',
                          color: '#333',
                          border: '2px solid #333',
                          borderRadius: '3px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = '#333';
                          e.target.style.color = '#fff';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = '#333';
                        }}
                      >
                        {transaction.status === 'Current' ? 'Return' : 'Receipt'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #e9ecef',
            }}>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
              }}>
                Showing {startIndex + 1}-{Math.min(startIndex + transactionsPerPage, mockTransactions.length)} of {mockTransactions.length} transactions
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
              }}>
                <a
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  style={{
                    padding: '0.4rem 0.8rem',
                    border: '1px solid #e9ecef',
                    background: '#fff',
                    color: '#333',
                    textDecoration: 'none',
                    borderRadius: '3px',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.background = '#f8f9fa';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.background = '#fff';
                  }}
                >
                  Previous
                </a>
                {[1, 2, 3].map((page) => (
                  <a
                    key={page}
                    href="#"
                    onClick={() => setCurrentPage(page)}
                    style={{
                      padding: '0.4rem 0.8rem',
                      border: '1px solid #e9ecef',
                      background: currentPage === page ? '#333' : '#fff',
                      color: currentPage === page ? '#fff' : '#333',
                      textDecoration: 'none',
                      borderRadius: '3px',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      if (currentPage !== page) {
                        e.target.style.borderColor = '#333';
                        e.target.style.background = '#f8f9fa';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (currentPage !== page) {
                        e.target.style.borderColor = '#e9ecef';
                        e.target.style.background = '#fff';
                      }
                    }}
                  >
                    {page}
                  </a>
                ))}
                <a
                  href="#"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  style={{
                    padding: '0.4rem 0.8rem',
                    border: '1px solid #e9ecef',
                    background: '#fff',
                    color: '#333',
                    textDecoration: 'none',
                    borderRadius: '3px',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.borderColor = '#333';
                    e.target.style.background = '#f8f9fa';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.background = '#fff';
                  }}
                >
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IssueHistory;

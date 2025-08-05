import React, { useState, useEffect } from 'react';

const mockStatusOverview = {
  totalMembers: 45,
  paymentCurrent: 32,
  paymentDueSoon: 8,
  paymentOverdue: 5,
  outstandingAmount: 2500,
};

const mockMembers = [
  {
    id: '1025',
    name: 'Robert Johnson',
    email: 'robert.j@email.com',
    memberId: 'LIB001025',
    lastPayment: 'Jun 3, 2025',
    nextDueDate: 'Jul 3, 2025 (Overdue)',
    status: 'Overdue',
    amountDue: '₹500',
    outstandingFines: '₹140',
    priority: 'overdue',
  },
  {
    id: '1087',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    memberId: 'LIB001087',
    lastPayment: 'Jun 20, 2025',
    nextDueDate: 'Jul 20, 2025 (Overdue)',
    status: 'Overdue',
    amountDue: '₹500',
    outstandingFines: '₹80',
    priority: 'overdue',
  },
  {
    id: '1156',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    memberId: 'LIB001156',
    lastPayment: 'Jul 15, 2025',
    nextDueDate: 'Aug 15, 2025',
    status: 'Due Soon',
    amountDue: '₹500',
    outstandingFines: '₹0',
    priority: 'due',
  },
  {
    id: '1298',
    name: 'Sarah Brown',
    email: 'sarah.brown@email.com',
    memberId: 'LIB001298',
    lastPayment: 'Jul 28, 2025',
    nextDueDate: 'Aug 28, 2025',
    status: 'Due Soon',
    amountDue: '₹500',
    outstandingFines: '₹0',
    priority: 'due',
  },
  {
    id: '1234',
    name: 'John Doe',
    email: 'john.doe@email.com',
    memberId: 'LIB001234',
    lastPayment: 'Jul 30, 2025',
    nextDueDate: 'Aug 30, 2025',
    status: 'Current',
    amountDue: '₹0',
    outstandingFines: '₹0',
    priority: 'none',
  },
  {
    id: '1235',
    name: 'Alice Smith',
    email: 'alice.smith@email.com',
    memberId: 'LIB001235',
    lastPayment: 'Jul 28, 2025',
    nextDueDate: 'Aug 28, 2025',
    status: 'Current',
    amountDue: '₹0',
    outstandingFines: '₹0',
    priority: 'none',
  },
  {
    id: '1345',
    name: 'Michael Davis',
    email: 'michael.davis@email.com',
    memberId: 'LIB001345',
    lastPayment: 'Jul 5, 2025',
    nextDueDate: 'Aug 5, 2025',
    status: 'Due Soon',
    amountDue: '₹500',
    outstandingFines: '₹0',
    priority: 'due',
  },
];

const MemberPaymentStatus = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [memberSearch, setMemberSearch] = useState('');
  const [joinDateFilter, setJoinDateFilter] = useState('all');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [bulkAction, setBulkAction] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Refreshing member payment status...');
      // Simulate data refresh (backend integration required)
    }, 600000); // 10 minutes
    return () => clearInterval(interval);
  }, []);

  const applyFilters = () => {
    console.log('Applying filters:', {
      statusFilter,
      memberSearch,
      joinDateFilter,
    });
    alert('Filters applied! Results would be updated.\n(Backend integration required)');
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedMembers(!selectAll ? mockMembers.map((member) => member.id) : []);
  };

  const toggleMemberSelection = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
    setSelectAll(false); // Uncheck select all if individual selection changes
  };

  const executeBulkAction = () => {
    if (!bulkAction) {
      alert('Please select an action');
      return;
    }
    if (selectedMembers.length === 0) {
      alert('Please select at least one member');
      return;
    }
    console.log('Bulk action:', bulkAction, 'for members:', selectedMembers);
    switch (bulkAction) {
      case 'sendReminder':
        alert(`Sending payment reminders to ${selectedMembers.length} members\n(Backend integration required)`);
        break;
      case 'markPaid':
        alert(`Marking ${selectedMembers.length} members as paid\n(Backend integration required)`);
        break;
      case 'exportList':
        alert(`Exporting ${selectedMembers.length} member records\n(Backend integration required)`);
        break;
      default:
        break;
    }
  };

  const collectPayment = (memberId) => {
    console.log('Collect payment for member:', memberId);
    if (window.confirm(`Open payment collection for member ${memberId}?`)) {
      window.location.href = `collect-payment.html?member=${memberId}`;
    }
  };

  const sendReminder = (memberId) => {
    console.log('Send reminder to member:', memberId);
    if (window.confirm(`Send payment reminder to member ${memberId}?`)) {
      alert(`Payment reminder sent to member ${memberId}\n(Backend integration required)`);
    }
  };

  const viewHistory = (memberId) => {
    console.log('View payment history for member:', memberId);
    alert(`Opening payment history for member ${memberId}\n(Backend integration required)`);
  };

  const viewProfile = (memberId) => {
    console.log('View profile for member:', memberId);
    alert(`Opening profile for member ${memberId}\n(Backend integration required)`);
  };

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
          maxWidth: '1200px',
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
            <a
              href="librarian-dashboard.html"
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
            </a>
          </div>
        </div>
      </header>
      <main style={{
        padding: '2rem 0',
      }}>
        <div style={{
          maxWidth: '1200px',
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
                Member Payment Status
              </h1>
              <p style={{
                color: '#666',
                fontSize: '1.1rem',
              }}>
                Monitor and manage payment status of all library members
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
                {mockStatusOverview.totalMembers}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Total Members
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
                {mockStatusOverview.paymentCurrent}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Payment Current
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
                color: '#ffc107',
                marginBottom: '0.5rem',
              }}>
                {mockStatusOverview.paymentDueSoon}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Payment Due Soon
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
                {mockStatusOverview.paymentOverdue}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Payment Overdue
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
                ₹{mockStatusOverview.outstandingAmount}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Outstanding Amount
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
                  Payment Status
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
                  <option value="all">All Members</option>
                  <option value="current">Payment Current</option>
                  <option value="due">Due Soon (within 7 days)</option>
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
                  Search Member
                </label>
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="Name, email, or ID..."
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
                  Member Since
                </label>
                <select
                  value={joinDateFilter}
                  onChange={(e) => setJoinDateFilter(e.target.value)}
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
                  <option value="all">All Time</option>
                  <option value="thisyear">This Year</option>
                  <option value="lastmonth">Last Month</option>
                  <option value="thismonth">This Month</option>
                </select>
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
                Member Payment Status
              </h2>
              <span style={{
                color: '#666',
                fontSize: '0.9rem',
              }}>
                {mockMembers.length} total members
              </span>
            </div>
            <div style={{
              padding: '1rem 1.5rem',
              borderBottom: '1px solid #e9ecef',
              background: '#f8f9fa',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                style={{
                  marginRight: '0.5rem',
                }}
              />
              <label style={{
                marginRight: '0.5rem',
              }}>
                Select All
              </label>
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                style={{
                  padding: '0.4rem',
                  border: '1px solid #e9ecef',
                  borderRadius: '3px',
                  marginRight: '0.5rem',
                }}
              >
                <option value="">Bulk Actions</option>
                <option value="sendReminder">Send Payment Reminder</option>
                <option value="markPaid">Mark as Paid</option>
                <option value="exportList">Export Selected</option>
              </select>
              <button
                onClick={executeBulkAction}
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
                Execute
              </button>
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
                  {['Select', 'Member Details', 'Member ID', 'Last Payment', 'Next Due Date', 'Status', 'Amount Due', 'Outstanding Fines', 'Actions'].map((header, index) => (
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
                {mockMembers.map((member, index) => (
                  <tr
                    key={member.id}
                    style={{
                      borderBottom: index === mockMembers.length - 1 ? 'none' : '1px solid #e9ecef',
                      background: member.priority === 'overdue' ? '#fff5f5' : member.priority === 'due' ? '#fffbf0' : 'transparent',
                      borderLeft: member.priority === 'overdue' ? '4px solid #dc3545' : member.priority === 'due' ? '4px solid #ffc107' : 'none',
                      ':hover': {
                        background: '#f8f9fa',
                      },
                    }}
                  >
                    <td style={{
                      padding: '1rem',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => toggleMemberSelection(member.id)}
                      />
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
                          {member.name}
                        </div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#666',
                        }}>
                          {member.email}
                        </div>
                      </div>
                    </td>
                    <td style={{
                      padding: '1rem',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      <strong>{member.memberId}</strong>
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.9rem',
                      color: '#666',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      {member.lastPayment}
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.9rem',
                      color: member.status === 'Overdue' ? '#dc3545' : member.status === 'Due Soon' ? '#ffc107' : '#28a745',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      {member.nextDueDate}
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
                        background: member.status === 'Current' ? '#d4edda' : member.status === 'Due Soon' ? '#fff3cd' : '#f8d7da',
                        color: member.status === 'Current' ? '#155724' : member.status === 'Due Soon' ? '#856404' : '#721c24',
                      }}>
                        {member.status}
                      </span>
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontWeight: 500,
                      textAlign: 'right',
                      color: member.amountDue === '₹0' ? '#333' : '#dc3545',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      {member.amountDue}
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontWeight: 500,
                      textAlign: 'right',
                      color: member.outstandingFines === '₹0' ? '#333' : '#dc3545',
                      '@media (max-width: 768px)': {
                        padding: '0.75rem 0.5rem',
                      },
                    }}>
                      {member.outstandingFines}
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
                        onClick={() => member.status !== 'Current' ? collectPayment(member.id) : viewHistory(member.id)}
                        style={{
                          padding: '0.3rem 0.6rem',
                          fontSize: '0.8rem',
                          background: member.status !== 'Current' ? '#dc3545' : 'transparent',
                          color: member.status !== 'Current' ? '#fff' : '#333',
                          border: member.status !== 'Current' ? 'none' : '2px solid #333',
                          borderRadius: '3px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                          if (member.status !== 'Current') {
                            e.target.style.background = '#c82333';
                          } else {
                            e.target.style.background = '#333';
                            e.target.style.color = '#fff';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (member.status !== 'Current') {
                            e.target.style.background = '#dc3545';
                          } else {
                            e.target.style.background = 'transparent';
                            e.target.style.color = '#333';
                          }
                        }}
                      >
                        {member.status !== 'Current' ? 'Collect' : 'History'}
                      </button>
                      <button
                        onClick={() => member.status === 'Current' ? viewProfile(member.id) : sendReminder(member.id)}
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
                        {member.status === 'Current' ? 'Profile' : 'Remind'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemberPaymentStatus;

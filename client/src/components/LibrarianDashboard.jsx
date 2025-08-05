
import React from 'react';
import { Link } from 'react-router-dom';

const mockData = {
  user: {
    name: 'Sarah Johnson',
    role: 'Librarian',
  },
  alerts: [
    {
      type: 'danger',
      icon: '🚨',
      message: 'Urgent: 3 books are overdue and need immediate attention for fine collection.',
    },
    {
      type: 'warning',
      icon: '⚠️',
      message: 'Notice: 5 members have unpaid monthly fees due today.',
    },
  ],
  stats: [
    { number: 247, label: 'Total Books in Library', trend: '+12 added this month', color: '#333' },
    { number: 89, label: 'Currently Issued', trend: '15 due this week', color: '#333' },
    { number: 158, label: 'Available Copies', trend: 'Ready for issue', color: '#333' },
    { number: 3, label: 'Overdue Books', trend: 'Need immediate action', color: '#dc3545' },
    { number: 45, label: 'Active Members', trend: '2 new this week', color: '#333' },
    { number: '₹2,850', label: 'Today\'s Collections', trend: 'Fees + Fines', color: '#333' },
  ],
  quickActions: [
    { title: 'Issue Book', description: 'Issue book to member', link: '/issue-book' },
    { title: 'Return Book', description: 'Process book return', link: '/return-book' },
    { title: 'Collect Payment', description: 'Monthly fees & fines', link: '/collect-payment' },
    { title: 'Add New Book', description: 'Register new title', link: '/add-book' },
    { title: 'Add Member', description: 'Register new user', link: '/add-member' },
    { title: 'Overdue Books', description: 'View late returns', link: '/overdue-books' },
  ],
  recentActivity: [
    { time: '10:45 AM', text: 'Collected ₹500 monthly fee from John Doe (ID: 1234)' },
    { time: '10:30 AM', text: 'Issued "Clean Code" to Member #1087' },
    { time: '10:15 AM', text: 'Processed return: "JavaScript: The Good Parts" with ₹10 fine' },
    { time: '09:45 AM', text: 'Added new book: "Design Patterns" (5 copies)' },
    { time: '09:30 AM', text: 'Registered new member: Alice Smith' },
  ],
  pendingTasks: [
    { title: 'Collect overdue fines', meta: '3 books, ₹85 total', priority: 'High', priorityColor: '#f8d7da', textColor: '#721c24' },
    { title: 'Follow up on unpaid fees', meta: '5 members', priority: 'Medium', priorityColor: '#fff3cd', textColor: '#856404' },
    { title: 'Organize Rack 3', meta: 'Programming section', priority: 'Low', priorityColor: '#d4edda', textColor: '#155724' },
    { title: 'Update book catalog', meta: '12 new additions', priority: 'Low', priorityColor: '#d4edda', textColor: '#155724' },
  ],
  quickStats: [
    { label: 'Books Due Today', value: '7', color: '#333' },
    { label: 'Payment Due', value: '5 members', color: '#ffc107' },
    { label: 'Total Fines', value: '₹85', color: '#dc3545' },
    { label: 'Available Books', value: '158', color: '#28a745' },
  ],
};

const LibrarianDashboard = () => {
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
        position: 'sticky',
        top: 0,
        zIndex: 100,
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
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              gap: '1rem',
            },
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
            }}>
              Library Management System
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <span style={{
                background: '#333',
                color: '#fff',
                padding: '0.3rem 0.8rem',
                borderRadius: '15px',
                fontSize: '0.8rem',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}>
                {mockData.user.role}
              </span>
              <span>{mockData.user.name}</span>
              <Link
                to="/profile"
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #333',
                  background: 'transparent',
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: 500,
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'inline-block',
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
                Profile
              </Link>
              <Link
                to="/login"
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #333',
                  background: 'transparent',
                  color: '#333',
                  textDecoration: 'none',
                  fontWeight: 500,
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'inline-block',
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
                Sign Out
              </Link>
            </div>
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
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            marginBottom: '2rem',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
          }}>
            <h1 style={{
              fontSize: '2rem',
              marginBottom: '0.5rem',
              color: '#333',
            }}>
              Welcome Back, {mockData.user.name}!
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
            }}>
              Here's your library overview for today, August 3rd, 2025
            </p>
          </div>
          <div style={{
            marginBottom: '2rem',
          }}>
            {mockData.alerts.map((alert, index) => (
              <div
                key={index}
                style={{
                  padding: '1rem',
                  borderRadius: '5px',
                  marginBottom: '1rem',
                  border: '1px solid',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  background: alert.type === 'danger' ? '#f8d7da' : '#fff3cd',
                  borderColor: alert.type === 'danger' ? '#f5c6cb' : '#ffeaa7',
                  color: alert.type === 'danger' ? '#721c24' : '#856404',
                }}
              >
                <div style={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}>
                  {alert.icon}
                </div>
                <div>
                  <strong>{alert.type === 'danger' ? 'Urgent' : 'Notice'}:</strong> {alert.message}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
          }}>
            {mockData.stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  textAlign: 'center',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
              >
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: stat.color,
                  marginBottom: '0.5rem',
                }}>
                  {stat.number}
                </div>
                <div style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '0.5rem',
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: stat.label === 'Overdue Books' ? '#dc3545' : '#666',
                }}>
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem',
            marginBottom: '2rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
            },
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}>
              <div style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              }}>
                <h2 style={{
                  color: '#333',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e9ecef',
                }}>
                  Quick Actions
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem',
                  '@media (max-width: 768px)': {
                    gridTemplateColumns: '1fr',
                  },
                }}>
                  {mockData.quickActions.map((action, index) => (
                    <Link
                      key={index}
                      to={action.link}
                      style={{
                        padding: '1rem',
                        border: '2px solid #e9ecef',
                        borderRadius: '8px',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: '#333',
                      }}
                      onMouseOver={(e) => {
                        e.target.style.borderColor = '#333';
                        e.target.style.background = '#f8f9fa';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.borderColor = '#e9ecef';
                        e.target.style.background = 'transparent';
                      }}
                    >
                      <h3 style={{
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontSize: '1rem',
                      }}>
                        {action.title}
                      </h3>
                      <p style={{
                        color: '#666',
                        fontSize: '0.8rem',
                      }}>
                        {action.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
              <div style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              }}>
                <h2 style={{
                  color: '#333',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e9ecef',
                }}>
                  Recent Activity
                </h2>
                <ul style={{
                  listStyle: 'none',
                }}>
                  {mockData.recentActivity.map((activity, index) => (
                    <li
                      key={index}
                      style={{
                        padding: '0.75rem',
                        borderBottom: index === mockData.recentActivity.length - 1 ? 'none' : '1px solid #e9ecef',
                        display: 'flex',
                        gap: '0.75rem',
                      }}
                    >
                      <div style={{
                        color: '#666',
                        fontSize: '0.8rem',
                        minWidth: '60px',
                      }}>
                        {activity.time}
                      </div>
                      <div style={{
                        color: '#333',
                        fontSize: '0.9rem',
                      }}>
                        {activity.text}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}>
              <div style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              }}>
                <h2 style={{
                  color: '#333',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e9ecef',
                }}>
                  Pending Tasks
                </h2>
                <ul style={{
                  listStyle: 'none',
                }}>
                  {mockData.pendingTasks.map((task, index) => (
                    <li
                      key={index}
                      style={{
                        padding: '0.75rem',
                        borderBottom: index === mockData.pendingTasks.length - 1 ? 'none' : '1px solid #e9ecef',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{
                        flex: 1,
                      }}>
                        <div style={{
                          fontWeight: 500,
                          color: '#333',
                          marginBottom: '0.2rem',
                        }}>
                          {task.title}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#666',
                        }}>
                          {task.meta}
                        </div>
                      </div>
                      <div style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        background: task.priorityColor,
                        color: task.textColor,
                      }}>
                        {task.priority}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{
                background: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e9ecef',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              }}>
                <h2 style={{
                  color: '#333',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #e9ecef',
                }}>
                  Quick Stats
                </h2>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}>
                  {mockData.quickStats.map((stat, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                        borderBottom: index === mockData.quickStats.length - 1 ? 'none' : '1px solid #e9ecef',
                      }}
                    >
                      <span>{stat.label}:</span>
                      <strong style={{
                        color: stat.color,
                      }}>
                        {stat.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LibrarianDashboard;

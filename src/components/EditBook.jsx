import React, { useState, useEffect } from 'react';

const mockBookData = {
  id: '#001',
  title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
  author: 'Robert C. Martin',
  subject: 'programming',
  isbn: '978-0132350884',
  price: 2499.00,
  description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. This book presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship.',
  copies: {
    total: 5,
    available: 3,
    issued: 2,
  },
};

const EditBook = () => {
  const [formData, setFormData] = useState(mockBookData);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleISBNChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length >= 3) {
      value = `978-${value.substring(3)}`;
    }
    setFormData((prev) => ({ ...prev, isbn: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (
      !formData.title ||
      !formData.author ||
      !formData.subject ||
      !formData.isbn ||
      !formData.price
    ) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // ISBN validation
    const isbnPattern = /^978-\d{10}$/;
    if (!isbnPattern.test(formData.isbn)) {
      setErrorMessage('Please enter a valid ISBN in format: 978-XXXXXXXXXX');
      return;
    }

    // Price validation
    if (parseFloat(formData.price) <= 0) {
      setErrorMessage('Price must be greater than 0.');
      return;
    }

    // Success simulation
    console.log('Book update data:', formData);
    setSuccessMessage(`Book "${formData.title}" has been successfully updated!`);
  };

  const confirmDelete = () => {
    if (
      window.confirm(
        'Are you sure you want to delete this book?\n\nWarning: This will also delete all copies and issue history. This action cannot be undone.'
      )
    ) {
      if (
        window.confirm(
          'This book has 2 copies currently issued. Deleting will affect active borrowers. Continue?'
        )
      ) {
        console.log('Delete book confirmed');
        alert('Book deletion functionality requires backend integration.');
      }
    }
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
          maxWidth: '900px',
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
              href="books-catalog.html"
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
              ← Back to Catalog
            </a>
          </div>
        </div>
      </header>
      <main style={{
        padding: '2rem 0',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <div style={{
            background: '#fff',
            padding: '3rem',
            borderRadius: '10px',
            border: '1px solid #e9ecef',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
            }}>
              <h1 style={{
                fontSize: '2rem',
                color: '#333',
                marginBottom: '0.5rem',
              }}>
                Edit Book
              </h1>
              <p style={{
                color: '#666',
                fontSize: '1.1rem',
              }}>
                Modify existing book information
              </p>
            </div>
            <div style={{
              background: '#f8f9fa',
              padding: '1rem',
              borderRadius: '5px',
              border: '1px solid #e9ecef',
              marginBottom: '2rem',
              textAlign: 'center',
            }}>
              <strong style={{
                color: '#333',
                fontSize: '1.1rem',
              }}>
                Book ID: {formData.id}
              </strong> | Currently has {formData.copies.total} copies (
              {formData.copies.available} available, {formData.copies.issued} issued)
            </div>
            <div style={{
              background: '#f8d7da',
              border: '1px solid #f5c6cb',
              color: '#721c24',
              padding: '0.75rem',
              borderRadius: '5px',
              marginBottom: '1rem',
              display: errorMessage ? 'block' : 'none',
            }}>
              {errorMessage}
            </div>
            <div style={{
              background: '#d4edda',
              border: '1px solid #c3e6cb',
              color: '#155724',
              padding: '0.75rem',
              borderRadius: '5px',
              marginBottom: '1rem',
              display: successMessage ? 'block' : 'none',
            }}>
              {successMessage}
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{
                marginBottom: '2rem',
              }}>
                <h2 style={{
                  fontSize: '1.3rem',
                  color: '#333',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '2px solid #e9ecef',
                }}>
                  Book Information
                </h2>
                <div style={{
                  marginBottom: '1.5rem',
                }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                    color: '#333',
                  }}>
                    Book Title <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '5px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#333')}
                    onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                  />
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    marginTop: '0.3rem',
                  }}>
                    Enter the complete book title
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  '@media (max-width: 768px)': {
                    gridTemplateColumns: '1fr',
                  },
                }}>
                  <div style={{
                    marginBottom: '1.5rem',
                  }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#333',
                    }}>
                      Author <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e9ecef',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#333')}
                      onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                    />
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginTop: '0.3rem',
                    }}>
                      For multiple authors, separate with commas
                    </div>
                  </div>
                  <div style={{
                    marginBottom: '1.5rem',
                  }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#333',
                    }}>
                      Subject <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e9ecef',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#333')}
                      onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
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
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  '@media (max-width: 768px)': {
                    gridTemplateColumns: '1fr',
                  },
                }}>
                  <div style={{
                    marginBottom: '1.5rem',
                  }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#333',
                    }}>
                      ISBN <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleISBNChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e9ecef',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#333')}
                      onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                    />
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginTop: '0.3rem',
                    }}>
                      13-digit ISBN number (including hyphens)
                    </div>
                  </div>
                  <div style={{
                    marginBottom: '1.5rem',
                  }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#333',
                    }}>
                      Price (₹) <span style={{ color: '#dc3545' }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e9ecef',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.3s ease',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#333')}
                      onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                    />
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginTop: '0.3rem',
                    }}>
                      Book purchase price in rupees
                    </div>
                  </div>
                </div>
                <div style={{
                  marginBottom: '1.5rem',
                }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 500,
                    color: '#333',
                  }}>
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '5px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      minHeight: '100px',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#333')}
                    onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                  />
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    marginTop: '0.3rem',
                  }}>
                    Optional book summary or description
                  </div>
                </div>
              </div>
              <div style={{
                marginBottom: '2rem',
              }}>
                <h2 style={{
                  fontSize: '1.3rem',
                  color: '#333',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '2px solid #e9ecef',
                }}>
                  Copy Information
                </h2>
                <div style={{
                  background: '#f8f9fa',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  marginTop: '1rem',
                }}>
                  <h3 style={{
                    color: '#333',
                    marginBottom: '1rem',
                  }}>
                    Current Copy Status
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '0.2rem',
                        color: '#333',
                      }}>
                        {formData.copies.total}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#666',
                        textTransform: 'uppercase',
                      }}>
                        Total Copies
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '0.2rem',
                        color: '#28a745',
                      }}>
                        {formData.copies.available}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#666',
                        textTransform: 'uppercase',
                      }}>
                        Available
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '0.2rem',
                        color: '#dc3545',
                      }}>
                        {formData.copies.issued}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#666',
                        textTransform: 'uppercase',
                      }}>
                        Currently Issued
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginTop: '2rem',
                paddingTop: '2rem',
                borderTop: '1px solid #e9ecef',
                '@media (max-width: 768px)': {
                  flexDirection: 'column',
                },
              }}>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: '2px solid #333',
                    background: '#333',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#555';
                    e.target.style.borderColor = '#555';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#333';
                    e.target.style.borderColor = '#333';
                  }}
                >
                  Update Book Information
                </button>
                <a
                  href="book-copies-management.html"
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: '2px solid #333',
                    background: 'transparent',
                    color: '#333',
                    textDecoration: 'none',
                    fontWeight: 500,
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
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
                  Manage Copies
                </a>
                <a
                  href="books-catalog.html"
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: '2px solid #333',
                    background: 'transparent',
                    color: '#333',
                    textDecoration: 'none',
                    fontWeight: 500,
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
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
                  Cancel
                </a>
                <button
                  type="button"
                  onClick={confirmDelete}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: '2px solid #dc3545',
                    background: '#dc3545',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#c82333';
                    e.target.style.borderColor = '#bd2130';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#dc3545';
                    e.target.style.borderColor = '#dc3545';
                  }}
                >
                  Delete Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditBook;
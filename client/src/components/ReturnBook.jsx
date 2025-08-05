import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const mockIssuedBooks = [
  {
    id: 1,
    member: { id: 1234, name: "John Doe" },
    book: { name: "Clean Code", author: "Robert C. Martin", copyId: "004" },
    issueDate: "2025-07-25",
    dueDate: "2025-08-01",
    status: "overdue",
  },
  {
    id: 2,
    member: { id: 1235, name: "Alice Smith" },
    book: { name: "The Pragmatic Programmer", author: "Andrew Hunt", copyId: "003" },
    issueDate: "2025-08-01",
    dueDate: "2025-08-08",
    status: "ontime",
  },
];

const ReturnBook = () => {
  const [searchMethod, setSearchMethod] = useState('member');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [returnDetails, setReturnDetails] = useState({
    returnDate: '',
    daysBorrowed: 0,
    returnStatus: '',
    fineAmount: 0,
  });
  const searchResultsRef = useRef(null);

  // Handle clicks outside search results
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(e.target.value);
    setShowResults(query.length >= 2);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const filteredBooks = mockIssuedBooks.filter((issue) => {
    switch (searchMethod) {
      case 'member':
        return (
          issue.member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.member.id.toString().includes(searchQuery)
        );
      case 'book':
        return (
          issue.book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case 'copy':
        return issue.book.copyId.includes(searchQuery);
      default:
        return false;
    }
  });

  const selectIssue = (issueId) => {
    const issue = mockIssuedBooks.find((issue) => issue.id === issueId);
    setSelectedIssue(issue);
    setSearchQuery(`${issue.book.name} - ${issue.member.name} (Copy #${issue.book.copyId})`);
    setShowResults(false);

    // Calculate return details
    const issueDate = new Date(issue.issueDate);
    const dueDate = new Date(issue.dueDate);
    const returnDate = new Date();
    const daysBorrowed = Math.ceil((returnDate - issueDate) / (1000 * 60 * 60 * 24));
    const daysOverdue = Math.max(0, Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24)));
    const fineAmount = daysOverdue * 5;

    setReturnDetails({
      returnDate: returnDate.toLocaleDateString('en-GB'),
      daysBorrowed,
      returnStatus: daysOverdue > 0 ? `${daysOverdue} days overdue` : 'On Time',
      fineAmount,
    });

    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetForm = () => {
    setSelectedIssue(null);
    setSearchQuery('');
    setSearchMethod('member');
    setShowResults(false);
    setErrorMessage('');
    setSuccessMessage('');
    setReturnDetails({ returnDate: '', daysBorrowed: 0, returnStatus: '', fineAmount: 0 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedIssue) {
      setErrorMessage('Please select an issued book to return.');
      setSuccessMessage('');
      return;
    }

    console.log('Process return:', {
      issue: selectedIssue,
      returnDate: new Date(),
      fineAmount: returnDetails.fineAmount,
    });

    let message = `Book "${selectedIssue.book.name}" returned successfully!`;
    if (returnDetails.fineAmount > 0) {
      message += ` Fine collected: ₹${returnDetails.fineAmount}`;
    }

    setSuccessMessage(message);
    setErrorMessage('');

    setTimeout(() => {
      if (window.confirm('Book returned successfully! Process another return?')) {
        resetForm();
      } else {
        window.location.href = '/dashboard';
      }
    }, 2000);
  };

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: 'border-box', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f8f9fa', color: '#333', lineHeight: 1.6 }}>
      <header style={{ background: '#fff', borderBottom: '2px solid #e9ecef', padding: '1rem 0', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              Library Management System
            </div>
            <Link
              to="/dashboard"
              style={{ color: '#333', textDecoration: 'none', padding: '0.5rem 1rem', border: '1px solid #e9ecef', borderRadius: '5px', transition: 'all 0.3s ease' }}
              onMouseOver={(e) => (e.target.style.borderColor = '#333')}
              onMouseOut={(e) => (e.target.style.borderColor = '#e9ecef')}
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>
      <main style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', border: '1px solid #e9ecef', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', marginBottom: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: '0.5rem' }}>Return Book</h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Process book returns and calculate fines</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', border: '1px solid #e9ecef', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ background: errorMessage ? '#f8d7da' : 'transparent', border: errorMessage ? '1px solid #f5c6cb' : 'none', color: errorMessage ? '#721c24' : 'transparent', padding: errorMessage ? '0.75rem' : 0, borderRadius: errorMessage ? '5px' : 0, marginBottom: '1rem', display: errorMessage ? 'block' : 'none' }}>
                {errorMessage}
              </div>
              <div style={{ background: successMessage ? '#d4edda' : 'transparent', border: successMessage ? '1px solid #c3e6cb' : 'none', color: successMessage ? '#155724' : 'transparent', padding: successMessage ? '0.75rem' : 0, borderRadius: successMessage ? '5px' : 0, marginBottom: '1rem', display: successMessage ? 'block' : 'none' }}>
                {successMessage}
              </div>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e9ecef' }}>
                  <h2 style={{ color: '#333' }}>Find Issued Book</h2>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#333' }} htmlFor="searchMethod">
                    Search Method
                  </label>
                  <select
                    id="searchMethod"
                    value={searchMethod}
                    onChange={(e) => setSearchMethod(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e9ecef', borderRadius: '5px', fontSize: '1rem', transition: 'border-color 0.3s ease' }}
                    onFocus={(e) => (e.target.style.borderColor = '#333')}
                    onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                  >
                    <option value="member">By Member</option>
                    <option value="book">By Book Title</option>
                    <option value="copy">By Copy ID</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1.5rem' }} ref={searchResultsRef}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#333' }} htmlFor="searchQuery">
                    Search <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Enter member name, book title, or copy ID..."
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '2px solid #e9ecef', borderRadius: '5px', fontSize: '1rem', transition: 'border-color 0.3s ease' }}
                    onFocus={(e) => (e.target.style.borderColor = '#333')}
                    onBlur={(e) => (e.target.style.borderColor = '#e9ecef')}
                  />
                  <div style={{ maxHeight: '200px', overflowY: 'auto', border: showResults ? '1px solid #e9ecef' : 'none', borderRadius: '5px', background: '#fff', display: showResults ? 'block' : 'none' }}>
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((issue) => (
                        <div
                          key={issue.id}
                          onClick={() => selectIssue(issue.id)}
                          style={{ padding: '0.75rem', borderBottom: issue === filteredBooks[filteredBooks.length - 1] ? 'none' : '1px solid #e9ecef', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                          onMouseOver={(e) => (e.target.style.background = '#f8f9fa')}
                          onMouseOut={(e) => (e.target.style.background = '#fff')}
                        >
                          {issue.book.name} - {issue.member.name} (Copy #{issue.book.copyId})<br />
                          <small>Issued: {issue.issueDate} | Due: {issue.dueDate}</small>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '0.75rem', borderBottom: 'none' }}>
                        No issued books found
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ background: '#e9ecef', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', display: selectedIssue ? 'block' : 'none' }}>
                  <h3 style={{ color: '#333', marginBottom: '1rem' }}>Return Summary</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #dee2e6' }}>
                    <span>Return Date:</span>
                    <span>{returnDetails.returnDate}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #dee2e6' }}>
                    <span>Days Borrowed:</span>
                    <span>{returnDetails.daysBorrowed} days</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #dee2e6' }}>
                    <span>Status:</span>
                    <span style={{ color: returnDetails.fineAmount > 0 ? '#dc3545' : '#28a745' }}>{returnDetails.returnStatus}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: 'none', fontWeight: 'bold' }}>
                    <span>Fine Amount:</span>
                    <span>₹{returnDetails.fineAmount}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    type="submit"
                    disabled={!selectedIssue}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: selectedIssue ? '#333' : '#ccc',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      fontSize: '1rem',
                      fontWeight: 500,
                      cursor: selectedIssue ? 'pointer' : 'not-allowed',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => selectedIssue && (e.target.style.background = '#555')}
                    onMouseOut={(e) => selectedIssue && (e.target.style.background = '#333')}
                  >
                    Process Return
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'transparent',
                      color: '#333',
                      border: '2px solid #333',
                      borderRadius: '5px',
                      fontSize: '1rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => { e.target.style.background = '#333'; e.target.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#333'; }}
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '10px', border: '1px solid #e9ecef', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ color: '#333', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e9ecef' }}>Issue Details</h2>
              <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '1.5rem', display: selectedIssue ? 'block' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>{selectedIssue?.book.name}</div>
                  <div style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    background: selectedIssue?.status === 'ontime' ? '#d4edda' : selectedIssue?.status === 'due' ? '#fff3cd' : '#f8d7da',
                    color: selectedIssue?.status === 'ontime' ? '#155724' : selectedIssue?.status === 'due' ? '#856404' : '#721c24',
                  }}>
                    {returnDetails.returnStatus}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Member</span>
                    <span style={{ fontWeight: 500, color: '#333' }}>{selectedIssue ? `${selectedIssue.member.name} (LIB${selectedIssue.member.id})` : ''}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Author</span>
                    <span style={{ fontWeight: 500, color: '#333' }}>{selectedIssue?.book.author}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Copy ID</span>
                    <span style={{ fontWeight: 500, color: '#333' }}>{selectedIssue?.book.copyId}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Issue Date</span>
                    <span style={{ fontWeight: 500, color: '#333' }}>{selectedIssue?.issueDate}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Due Date</span>
                    <span style={{ fontWeight: 500, color: '#333' }}>{selectedIssue?.dueDate}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Rack Location</span>
                    <span style={{ fontWeight: 500, color: '#333' }}>Rack 2</span>
                  </div>
                </div>
              </div>
              <div style={{ background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', display: returnDetails.fineAmount > 0 ? 'block' : 'none' }}>
                <h3 style={{ color: '#856404', marginBottom: '1rem' }}>Fine Calculation</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f0e68c' }}>
                  <span>Due Date:</span>
                  <span>{selectedIssue?.dueDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f0e68c' }}>
                  <span>Return Date:</span>
                  <span>{returnDetails.returnDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f0e68c' }}>
                  <span>Days Overdue:</span>
                  <span>{returnDetails.fineAmount / 5} days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f0e68c' }}>
                  <span>Fine Rate:</span>
                  <span>₹5 per day</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #856404', fontWeight: 'bold' }}>
                  <span>Total Fine:</span>
                  <span style={{ color: '#dc3545' }}>₹{returnDetails.fineAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReturnBook;
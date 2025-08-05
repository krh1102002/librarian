import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/Common/StatCard';
import StatusBadge from '../components/Common/StatusBadge';
import { books, libraryStats } from '../data/mockData';

const BooksCatalog = () => {
  const [filters, setFilters] = useState({
    search: '',
    subject: 'all',
    availability: 'all',
    rack: 'all'
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         book.author.toLowerCase().includes(filters.search.toLowerCase()) ||
                         book.isbn.includes(filters.search);
    const matchesSubject = filters.subject === 'all' || book.subject.toLowerCase() === filters.subject;
    const matchesAvailability = filters.availability === 'all' || 
                               (filters.availability === 'available' && book.availableCopies > 0) ||
                               (filters.availability === 'out-of-stock' && book.availableCopies === 0);
    
    return matchesSearch && matchesSubject && matchesAvailability;
  });

  const handleViewBook = (bookId) => {
    console.log('View book:', bookId);
    alert(`Opening book details for ID: ${bookId}\n(Backend integration required)`);
  };

  const handleEditBook = (bookId) => {
    console.log('Edit book:', bookId);
    alert(`Opening edit form for book ID: ${bookId}\n(Backend integration required)`);
  };

  const handleManageCopies = (bookId) => {
    console.log('Manage copies for book:', bookId);
    alert(`Opening copy management for book ID: ${bookId}\n(Backend integration required)`);
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="card p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Books Catalog</h1>
          <p className="text-xl text-gray-600">Complete library inventory with copy management</p>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link to="/add-book" className="btn btn-primary">
            + Add New Book
          </Link>
          <Link to="/add-book-copy" className="btn btn-secondary">
            + Add Copy
          </Link>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Books" value={libraryStats.totalBooks} />
        <StatCard title="Total Copies" value={libraryStats.totalCopies} />
        <StatCard title="Available" value={libraryStats.availableCopies} color="green" />
        <StatCard title="Currently Issued" value={libraryStats.currentlyIssued} color="blue" />
        <StatCard title="Rack Locations" value={libraryStats.rackLocations} />
      </div>

      {/* Filters */}
      <div className="card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="form-label">Search Books</label>
            <input
              type="text"
              placeholder="Title, author, or ISBN..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Subject</label>
            <select
              value={filters.subject}
              onChange={(e) => handleFilterChange('subject', e.target.value)}
              className="form-input"
            >
              <option value="all">All Subjects</option>
              <option value="programming">Programming</option>
              <option value="science">Science</option>
              <option value="literature">Literature</option>
              <option value="history">History</option>
              <option value="mathematics">Mathematics</option>
            </select>
          </div>
          <div>
            <label className="form-label">Availability</label>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value)}
              className="form-input"
            >
              <option value="all">All Books</option>
              <option value="available">Available</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
          <div>
            <label className="form-label">Rack Location</label>
            <select
              value={filters.rack}
              onChange={(e) => handleFilterChange('rack', e.target.value)}
              className="form-input"
            >
              <option value="all">All Racks</option>
              <option value="1">Rack 1</option>
              <option value="2">Rack 2</option>
              <option value="3">Rack 3</option>
            </select>
          </div>
          <div>
            <button className="btn btn-primary w-full">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Library Catalog</h2>
          <span className="text-gray-600 text-sm">Showing {filteredBooks.length} books</span>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-800 hover:shadow-lg transition-all">
              {/* Book Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h3>
                <p className="text-gray-600 italic mb-2">by {book.author}</p>
                <span className="inline-block px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-800">
                  {book.subject}
                </span>
              </div>

              {/* Book Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">ISBN</div>
                  <div className="font-medium text-gray-800">{book.isbn}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Price</div>
                  <div className="font-medium text-gray-800">₹{book.price.toLocaleString()}</div>
                </div>
              </div>

              {/* Copies Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-gray-800">{book.totalCopies}</div>
                    <div className="text-xs text-gray-500 uppercase">Total</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">{book.availableCopies}</div>
                    <div className="text-xs text-gray-500 uppercase">Available</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-600">{book.issuedCopies}</div>
                    <div className="text-xs text-gray-500 uppercase">Issued</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleViewBook(book.id)}
                  className="btn btn-secondary btn-small"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditBook(book.id)}
                  className="btn btn-secondary btn-small"
                >
                  Edit
                </button>
                {book.availableCopies === 0 ? (
                  <button className="btn btn-primary btn-small">
                    Add Copy
                  </button>
                ) : (
                  <button
                    onClick={() => handleManageCopies(book.id)}
                    className="btn btn-secondary btn-small"
                  >
                    Copies
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <div className="text-gray-600 text-sm">Showing 1-{filteredBooks.length} of {books.length} books</div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-200 bg-white text-gray-600 rounded text-sm hover:border-gray-800 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-gray-800 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-200 bg-white text-gray-600 rounded text-sm hover:border-gray-800 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-200 bg-white text-gray-600 rounded text-sm hover:border-gray-800 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BooksCatalog;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { subjects } from '../data/mockData';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    subject: '',
    isbn: '',
    price: '',
    description: '',
    copyOption: 'later',
    copyCount: 1,
    defaultRack: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleISBNChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length >= 3) {
      value = '978-' + value.substring(3);
    }
    setFormData(prev => ({ ...prev, isbn: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Book title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.isbn.trim()) newErrors.isbn = 'ISBN is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';

    // ISBN validation
    const isbnPattern = /^978-\d{10}$/;
    if (formData.isbn && !isbnPattern.test(formData.isbn)) {
      newErrors.isbn = 'Please enter a valid ISBN in format: 978-XXXXXXXXX';
    }

    // Copy validation if adding now
    if (formData.copyOption === 'now') {
      if (!formData.copyCount || formData.copyCount < 1) {
        newErrors.copyCount = 'Copy count must be at least 1';
      }
      if (!formData.defaultRack) {
        newErrors.defaultRack = 'Please select a rack location';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Success simulation
    console.log('Book data to be submitted:', formData);
    setSuccess(`Book "${formData.title}" has been successfully added to the library!`);
    
    setTimeout(() => {
      if (confirm('Book added successfully! Would you like to add another book?')) {
        setFormData({
          title: '',
          author: '',
          subject: '',
          isbn: '',
          price: '',
          description: '',
          copyOption: 'later',
          copyCount: 1,
          defaultRack: ''
        });
        setSuccess('');
      } else {
        navigate('/books-catalog');
      }
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Book</h1>
            <p className="text-xl text-gray-600">Register a new book title in the library system</p>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {errors.general}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Book Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                Book Information
              </h2>

              <div className="mb-6">
                <label htmlFor="title" className="form-label">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter the complete book title"
                  className={`form-input ${errors.title ? 'border-red-500' : ''}`}
                  required
                />
                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                <div className="text-gray-500 text-sm mt-1">
                  Enter the full title as it appears on the book cover
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="author" className="form-label">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name(s)"
                    className={`form-input ${errors.author ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.author && <div className="text-red-500 text-sm mt-1">{errors.author}</div>}
                  <div className="text-gray-500 text-sm mt-1">
                    For multiple authors, separate with commas
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject.toLowerCase()}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.subject && <div className="text-red-500 text-sm mt-1">{errors.subject}</div>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="isbn" className="form-label">
                    ISBN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleISBNChange}
                    placeholder="978-XXXXXXXXX"
                    className={`form-input ${errors.isbn ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.isbn && <div className="text-red-500 text-sm mt-1">{errors.isbn}</div>}
                  <div className="text-gray-500 text-sm mt-1">
                    13-digit ISBN number (including hyphens)
                  </div>
                </div>
                <div>
                  <label htmlFor="price" className="form-label">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`form-input ${errors.price ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                  <div className="text-gray-500 text-sm mt-1">Book purchase price in rupees</div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="form-label">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description or summary of the book..."
                  className="form-input min-h-24 resize-vertical"
                />
                <div className="text-gray-500 text-sm mt-1">
                  Optional book summary or description for library records
                </div>
              </div>
            </div>

            {/* Initial Copies */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
                Initial Copies
              </h2>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  How many copies would you like to add initially?
                </h3>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="copyOption"
                      value="later"
                      checked={formData.copyOption === 'later'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span>Add copies later</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="copyOption"
                      value="now"
                      checked={formData.copyOption === 'now'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span>Add copies now</span>
                  </label>
                </div>

                {formData.copyOption === 'now' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="copyCount" className="form-label">Number of Copies</label>
                      <input
                        type="number"
                        id="copyCount"
                        name="copyCount"
                        value={formData.copyCount}
                        onChange={handleChange}
                        min="1"
                        max="20"
                        className={`form-input ${errors.copyCount ? 'border-red-500' : ''}`}
                      />
                      {errors.copyCount && <div className="text-red-500 text-sm mt-1">{errors.copyCount}</div>}
                      <div className="text-gray-500 text-sm mt-1">
                        How many physical copies to add (1-20)
                      </div>
                    </div>
                    <div>
                      <label htmlFor="defaultRack" className="form-label">Default Rack Location</label>
                      <select
                        id="defaultRack"
                        name="defaultRack"
                        value={formData.defaultRack}
                        onChange={handleChange}
                        className={`form-input ${errors.defaultRack ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select Rack</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(rack => (
                          <option key={rack} value={rack}>Rack {rack}</option>
                        ))}
                      </select>
                      {errors.defaultRack && <div className="text-red-500 text-sm mt-1">{errors.defaultRack}</div>}
                      <div className="text-gray-500 text-sm mt-1">
                        Rack where copies will be placed
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 pt-8 border-t border-gray-200">
              <button type="submit" className="btn btn-primary">
                Add Book to Library
              </button>
              <Link to="/books-catalog" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddBook;
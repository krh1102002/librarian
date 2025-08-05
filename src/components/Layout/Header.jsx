import { Link, useNavigate } from 'react-router-dom';

const Header = ({ userRole = "Librarian", userName = "Sarah Johnson" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  return (
    <header className="bg-white border-b-2 border-gray-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Library Management System
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium uppercase">
              {userRole}
            </span>
            <span className="text-gray-700">{userName}</span>
            <Link to="/profile" className="btn btn-secondary btn-small">
              Profile
            </Link>
            <button onClick={handleLogout} className="btn btn-secondary btn-small">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.email && formData.password) {
      // Mock login logic - redirect to dashboard
      console.log('Login attempt:', formData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="absolute top-8 left-8">
        <Link to="/" className="btn btn-secondary btn-small">
          ← Back to Home
        </Link>
      </div>

      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h1>
          <p className="text-gray-600">Access your library account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mb-6">
            Sign In
          </button>
        </form>

        <div className="text-center">
          <Link to="/forgot-password" className="text-gray-600 hover:text-gray-800 text-sm">
            Forgot your password?
          </Link>

          <div className="my-4 text-gray-600 text-sm">Don't have an account?</div>

          <Link to="/register" className="text-gray-800 font-medium hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-200 shadow-md py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold">Library Management System</div>
          <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary">
              Join Library
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white text-center py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Welcome to Our Library
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            A comprehensive digital solution for managing library operations,
            book circulation, and member services with ease and efficiency.
          </p>
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-semibold mb-8">
            System Features
          </h2>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="card p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">For Members</h3>
              <p className="text-gray-600">
                Search and discover books, check availability, manage borrowed
                items, and track your reading history.
              </p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">For Librarians</h3>
              <p className="text-gray-600">
                Complete library operations including book management, member
                services, payment collection, and circulation control.
              </p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">For Owners</h3>
              <p className="text-gray-600">
                Business oversight with financial reports, asset tracking, and
                comprehensive analytics for informed decision making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">
            Join our library community and experience seamless book management
          </p>
          <Link to="/register" className="btn btn-secondary">
            Create Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t text-center py-6 text-gray-600">
        <div className="container mx-auto px-4">
          &copy; 2025 Library Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

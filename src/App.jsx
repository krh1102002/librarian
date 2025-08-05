import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BooksCatalog from "./pages/BooksCatalog";
import AddBook from "./pages/AddBook";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books-catalog" element={<BooksCatalog />} />
          <Route path="/add-book" element={<AddBook />} />

          {/* Placeholder routes for other pages */}
          <Route
            path="/add-member"
            element={<div>Add Member Page (Coming Soon)</div>}
          />
          <Route
            path="/issue-book"
            element={<div>Issue Book Page (Coming Soon)</div>}
          />
          <Route
            path="/return-book"
            element={<div>Return Book Page (Coming Soon)</div>}
          />
          <Route
            path="/collect-payment"
            element={<div>Collect Payment Page (Coming Soon)</div>}
          />
          <Route
            path="/overdue-books"
            element={<div>Overdue Books Page (Coming Soon)</div>}
          />
          <Route
            path="/add-book-copy"
            element={<div>Add Book Copy Page (Coming Soon)</div>}
          />
          <Route
            path="/user-management"
            element={<div>User Management Page (Coming Soon)</div>}
          />
          <Route
            path="/payment-reports"
            element={<div>Payment Reports Page (Coming Soon)</div>}
          />
          <Route
            path="/issue-history"
            element={<div>Issue History Page (Coming Soon)</div>}
          />
          <Route
            path="/rack-management"
            element={<div>Rack Management Page (Coming Soon)</div>}
          />
          <Route
            path="/member-payment-status"
            element={<div>Member Payment Status Page (Coming Soon)</div>}
          />
          <Route
            path="/profile"
            element={<div>Profile Page (Coming Soon)</div>}
          />
          <Route
            path="/forgot-password"
            element={<div>Forgot Password Page (Coming Soon)</div>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

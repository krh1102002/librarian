import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BooksCatalog from "./pages/BooksCatalog";
import AddBook from "./pages/AddBook";
import "./index.css";
import AddBookCopy from "./pages/AddBookCopy";
import UserManagement from "./components/UserManagement";
import IssueHistory from "./components/IssueHistory";
import MemberPaymentStatus from "./components/MemberPaymentStatus";
import IssueBook from "./components/IssueBook";
import EditBook from "./components/EditBook";
import OverdueBooksPage from "./components/OverdueBooks";
import ReturnBook from "./components/ReturnBook";
import LibrarianDashboard from "./components/LibrarianDashboard";
import AddMember from "./pages/AddMember";

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
          <Route path="/edit-book" element={<EditBook />} />

          {/* Placeholder routes for other pages */}
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/issue-book" element={<IssueBook />} />
          <Route path="/return-book" element={<ReturnBook />} />
          <Route
            path="/collect-payment"
            element={<div>Collect Payment Page (Coming Soon)</div>}
          />
          <Route
            path="/librarian-dashboard"
            element={<LibrarianDashboard />}
          ></Route>
          <Route path="/overdue-books" element={<OverdueBooksPage />} />
          <Route path="/add-book-copy" element={<AddBookCopy />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route
            path="/payment-reports"
            element={<div>Payment Reports Page (Coming Soon)</div>}
          />
          <Route path="/issue-history" element={<IssueHistory />} />

          <Route
            path="/member-payment-status"
            element={<MemberPaymentStatus />}
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

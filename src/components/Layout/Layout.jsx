import Header from './Header';

const Layout = ({ children, showHeader = true, userRole, userName }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <Header userRole={userRole} userName={userName} />}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
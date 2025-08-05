import Header from "./Header";

const Layout = ({ children, showHeader = true, userRole, userName }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {showHeader && <Header userRole={userRole} userName={userName} />}
      <main
        style={{
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1410px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

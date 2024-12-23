const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">To do List - Vau Vittio</h1>
      {children}
    </div>
  );
};

export default Layout;

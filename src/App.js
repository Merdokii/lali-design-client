import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Cosmic background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDuration: `${Math.random() * 5 + 3}s`
            }}
          />
        ))}
        
        {/* Nebula effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-900/20 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-900/20 filter blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
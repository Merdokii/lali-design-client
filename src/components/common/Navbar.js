import { Link, useNavigate, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from './Button';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useNavigate();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Updated link styles with cosmic effects
  const linkStyle = "relative text-gray-300 font-medium px-1 transition-all duration-300 hover:text-white";
  const activeLinkStyle = "relative text-white font-bold";
  
  // Cosmic underline effect
  const cosmicUnderline = "absolute left-0 bottom-[-4px] h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 rounded-full";

  return (
    <header className="bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Lali Design
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/products" 
            className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
          >
            Buy
            {({ isActive }) => isActive && <span className={cosmicUnderline} style={{ width: '100%' }} />}
          </NavLink>
          
          <NavLink 
            to="/rentals" 
            className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
          >
            Rent
            {({ isActive }) => isActive && <span className={cosmicUnderline} style={{ width: '100%' }} />}
          </NavLink>
          
          <NavLink 
            to="/tailoring" 
            className={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
          >
            Tailoring
            {({ isActive }) => isActive && <span className={cosmicUnderline} style={{ width: '100%' }} />}
          </NavLink>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className="font-medium text-gray-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Button 
                onClick={handleLogout} 
                variant="secondary" 
                className="!px-4 !py-2 !text-sm bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-gray-700"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button 
                variant="primary" 
                className="!px-4 !py-2 !text-sm bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-purple-500/20"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
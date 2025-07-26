const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const baseStyles = 'px-6 py-3 rounded-md font-semibold focus:outline-none focus:ring-4 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg';
  
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-opacity-90 focus:ring-brand-primary/50',
    secondary: 'bg-brand-secondary text-white hover:bg-opacity-90 focus:ring-brand-secondary/50',
    light: 'bg-white text-brand-text hover:bg-gray-100 focus:ring-gray-300'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
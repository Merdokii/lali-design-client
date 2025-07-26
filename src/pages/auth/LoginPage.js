import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
  
  // Clear the success message after a few seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      // Clear history state so message doesn't reappear on back navigation
      window.history.replaceState({}, document.title)
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  
  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setApiError(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{successMessage}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input 
            id="email" 
            label="Email"
            type="email"
            defaultValue="user@lali.com"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.email.message}</p>}
          
          <Input 
            id="password" 
            label="Password"
            type="password"
            defaultValue="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.password.message}</p>}

          {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}
          <Button type="submit" className="w-full">Login</Button>
        </form>
         <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-md border">
            <p className='font-semibold'>Demo Accounts:</p>
            <p>Owner: owner@lali.com</p>
            <p>Employee: employee@lali.com</p>
            <p>User: user@lali.com</p>
            <p>Password (for all): password</p>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { registerUser } from '../../api/mockApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const password = watch('password');

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      await registerUser(data);
      navigate('/login', { state: { message: "Registration successful! Please log in." } });
    } catch (err) {
      setApiError(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            label="Full Name"
            {...register('name', { required: 'Full name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.name.message}</p>}

          <Input
            id="email"
            label="Email Address"
            type="email"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
          />
          {errors.email && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.email.message}</p>}

          <Input
            id="password"
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          />
          {errors.password && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.password.message}</p>}
          
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', { required: 'Please confirm your password', validate: value => value === password || "Passwords do not match" })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.confirmPassword.message}</p>}

          {apiError && <p className="text-red-500 text-center mb-4">{apiError}</p>}
          <Button type="submit" className="w-full">Register</Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;